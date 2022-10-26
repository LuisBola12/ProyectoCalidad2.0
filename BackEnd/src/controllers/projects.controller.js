import { getConnection, sql } from '../database';
import { projectQueries } from '../database/queries/projectQueries';
import { eliminateTimeFromDate, isInDateRange } from '../utils/dateManager';
import { payrollQueries } from './../database/queries/payrollQueries';
import { executeAPayrroll } from './payrollController';
import { calculateFullTimeWorkedHours } from '../utils/dateManager';
import { emailTerminateContract } from '../FormatEmailMessages/EmailTerminateContract';
import { sendEmail } from '../services/Mailer';

export const getProjectsByEmail = async ( req, res ) => {
  const { Email, Rol } = req.params;
  try {
    const pool = await getConnection();
    let query;
    Rol === 'admin'
      ? ( query = projectQueries.getProjectsByEmail )
      : ( query = projectQueries.getEmployeeProjectsByEmail );
    const result = await pool.request().input( 'Email', Email ).query( query );
    res.json( result.recordset );
  } catch ( e ) {
    console.log( e );
  }
};

export const createProject = async ( req, res ) => {
  const { projectName, paymentPeriod, email, description, maxBenefitsMoneyAmount, maxBenefitsQuantity } = req.body;
  if ( projectName == null || paymentPeriod == null || email == null ) {
    const message = 'Bad Request. Please Fill All Fields.';
    return res.status( 400 ).json( { msg: message } );
  }
  console.log( description );
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input( 'projectName', projectName )
      .input( 'paymentPeriod', sql.VarChar, paymentPeriod )
      .input( 'email', sql.VarChar, email )
      .input( 'description', sql.VarChar, description )
      .input( 'maxBenefitsMoneyAmount', maxBenefitsMoneyAmount )
      .input( 'maxBenefitsQuantity', maxBenefitsQuantity )
      .query( projectQueries.createProject );
    console.log( result );
    res.json( `Project: ${projectName} created successfully`  );
  } catch ( e ) {
    console.log( `Error: ${e}` );
    res.status( 500 ).send( e.message );
  }
};


export const getEmployeesWorkingData = async ( projectName ) => {
  try {
    let projectWorkedHoursInfo;
    const pool = await getConnection();
    const result = await pool.request()
      .input( 'projectName', projectName )
      .query( projectQueries.getEmployeeWorkingInformation );
    projectWorkedHoursInfo = result.recordset;
    return projectWorkedHoursInfo;
  } catch ( e ) {
    console.log( e );
  }
};
export const getHourlyEmployeeWorkedHours = async ( employeeID, projectName ) => {
  try {
    let employeeWorkedHours;
    const pool = await getConnection();
    const result = await pool.request()
      .input( 'employeeID', employeeID )
      .input( 'projectName', projectName )
      .query( projectQueries.getHourlyEmployeeWorkedHours );
    employeeWorkedHours = result.recordset;
    return employeeWorkedHours;
  } catch ( e ) {
    console.log( e );
  }
};// 

export const getHourlyEmployeeRegisteredWork = async ( employeeID, projectName, paymentPeriod ) => {

  const preProcessedWorkedHours = await getHourlyEmployeeWorkedHours( employeeID, projectName );
  const today = eliminateTimeFromDate( new Date() );
  let dayOneOfPayment = eliminateTimeFromDate( new Date() );
  let entrysInsidePeriod = [];
  if ( preProcessedWorkedHours ) {
    for ( let index = 0; index < preProcessedWorkedHours.length; index++ ) {
      const { Fecha:workDate  } = preProcessedWorkedHours[index];

      switch ( paymentPeriod ) {
      case 'Quincenal':
        dayOneOfPayment.setDate( today.getDate() - 15 );
        break;
      case 'Semanal':
        dayOneOfPayment.setDate( today.getDate() - 7 );
        break;
      case 'Mensual':
        dayOneOfPayment.setDate( today.getDate() - 30 );
        break;
      default:
        return Error;
      }
    
      if ( isInDateRange( dayOneOfPayment, today, workDate )   ){
        entrysInsidePeriod.push( preProcessedWorkedHours[index] );
      }
    }} 

  return entrysInsidePeriod;
};

const calculateHourlyEmployeeWorkedHours = async ( paymentPeriod, employeeID, projectName ) => {
  const entrysInsidePeriod = await getHourlyEmployeeRegisteredWork( employeeID, projectName, paymentPeriod );
  let hoursToPay = 0;

  entrysInsidePeriod.forEach( hoursEntry => {
    const { Cantidad:hoursWorked } = hoursEntry;
    hoursToPay = hoursToPay + hoursWorked;
  } );

  return  hoursToPay;


};
const hasWorkedLongEnough = ( contractStartDate, paymentPeriod ) =>{
  contractStartDate = eliminateTimeFromDate( contractStartDate );
  const today = eliminateTimeFromDate( new Date() );
  let dayOneOfPayment = today;

  switch ( paymentPeriod ) {
  case 'Quincenal':
    dayOneOfPayment.setDate( today.getDate() - 15 );
    break;
  case 'Semanal':
    dayOneOfPayment.setDate( today.getDate() - 7 );
    break;
  case 'Mensual':
    dayOneOfPayment.setDate( today.getDate() - 30 );
    break;
  default:
    return Error;
  }  
  if ( contractStartDate  <= dayOneOfPayment ) {
    return true;
  }
  return false;
};

const isAvaliableForPayment = ( contractStartDate, contractEndDate, paymentPeriod ) => {
  const today = new Date();
  const isActive = isInDateRange( contractStartDate, contractEndDate, today );


  const hasMiniumDaysWorking = hasWorkedLongEnough( contractStartDate, paymentPeriod );
  if ( isActive &&  hasMiniumDaysWorking ){
    return true;
  }
  else { 
    return false;
  }

};

const calculatePaidServicesGrossSalary = ( endOfContractDate, costOfService ) => {
  const today = eliminateTimeFromDate( new Date() );
  endOfContractDate = eliminateTimeFromDate( endOfContractDate );
  let grossSalary = null;

  if ( today.getTime() === endOfContractDate.getTime() ){
    grossSalary = costOfService;
  }
  return grossSalary;
};



export const calculateGrossSalaryForAllEmployes =  async ( projectName ) => {
  let projectWorkedHoursInfo;
  let grossSalary;
  let hoursWorked;
  let grossSalaries = [];

  try {
    projectWorkedHoursInfo = await getEmployeesWorkingData( projectName );
    for ( let index = 0; index < projectWorkedHoursInfo.length; index++ ) {
        
      const {  CedulaEmpleado:employeeID, TipoContrato: contractType, TipoPeriodo: paymentPeriod } = projectWorkedHoursInfo[index];
      const { ValorDeServicio: costOfService, FechaInicio:contractStartDate,  SalarioPorHoras:salaryPerHour, FechaFin:contractEndDate } = projectWorkedHoursInfo[index];
      

      if ( isAvaliableForPayment( contractStartDate, contractEndDate, paymentPeriod ) ){
        switch ( contractType ) {
        //Intencionalmente se dejan estos cases seguidos pues se espera el mismo comportamiento
        case 'Tiempo Completo' :
        case  'Medio Tiempo':
          hoursWorked = calculateFullTimeWorkedHours( paymentPeriod , contractType );
          grossSalary = salaryPerHour * hoursWorked;
          break;
        case 'Servicios Profesionales': {
          const endOfContractDate = eliminateTimeFromDate( contractEndDate );
          hoursWorked = null;
          grossSalary = calculatePaidServicesGrossSalary( endOfContractDate, costOfService );
        }
          break;
        
        case 'Por Horas': {
          hoursWorked =   await calculateHourlyEmployeeWorkedHours( paymentPeriod, employeeID, projectName ); 
          grossSalary = salaryPerHour * hoursWorked;
          break;
       
        }
        default:
          break;
        }
        const obj = { employeeID: employeeID, grossSalary: grossSalary, contractType:contractType, paymentPeriod:paymentPeriod,
          salaryPerHour: salaryPerHour, contractStartDate:contractStartDate, contractEndDate: contractEndDate , hoursWorked:hoursWorked };

        grossSalaries.push( obj );
      }        }     
  } catch ( e ) {
    console.log( e );
    return  e;
  }
  return  grossSalaries;
}; 

export const getPeriodOfAProjectToReport = async( req, res ) =>{
  const { nombreProyecto } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input( 'Nombre', nombreProyecto )
      .query( payrollQueries.getPeriodForAEspecificProject );
    res.status( 200 ).json( result.recordset );
  } catch ( error ) {
    console.log( `Error: ${error}` );
    res.status( 500 ).send( error.message );
  }
};

const getPeriodOfAPorject = async( nombreProyecto ) =>{
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input( 'Nombre', nombreProyecto )
      .query( payrollQueries.getPeriodForAEspecificProject );
    return result.recordset[0].TipoPeriodo;
  } catch ( error ) {
    console.log( `Error: ${error}` );
    return error;
  }
};
const insertPayrrollOnDB = async ( cedula,nombreProyecto,fechaInicio,fechaFin ) => {
  try {
    console.log( cedula,nombreProyecto,fechaInicio,fechaFin );
    const pool = await getConnection();
    const result = await pool
      .request()
      .input( 'CedulaEmpleador', cedula )
      .input( 'FechaInicio', fechaInicio )
      .input( 'FechaFin', fechaFin )
      .input( 'NombreProyecto', nombreProyecto )
      .query( projectQueries.createNewPayroll );
    return true;
  } catch ( error ) {
    console.log( 'ESACA' );
    console.log( error );
    return false;
  }
};
const getConsecutiveNumber = async( nombreProyecto,fechaInicio ) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input( 'NombreProyecto', nombreProyecto )
      .input( 'FechaInicio',sql.Date, fechaInicio )
      .query( payrollQueries.getPayrrollConsecutive );
    return result.recordset[0].Consectivo;
  } catch ( error ) {
    console.log( error );
    return error;
  }
};

export const createPayrroll = async ( req, res ) => {
  const { Cedula,NombreProyecto } = req.body;
  try {
    console.log( Cedula,NombreProyecto );
    const periodoProyecto =  await getPeriodOfAPorject( NombreProyecto );
    const fechaFinPago = new Date();
    let fechaInicioPago;
    switch ( periodoProyecto ) {
    case 'Semanal':
      fechaInicioPago = sumDays( -7 );
      break;
    case 'Quincenal':
      fechaInicioPago = sumDays( -15 );
      break;
    case 'Mensual':
      fechaInicioPago = sumDays( -30 );
      break;
    }
    const result = await insertPayrrollOnDB( Cedula,NombreProyecto,fechaInicioPago,fechaFinPago );
    if ( result === true ){
      const consecutiveNumber = await getConsecutiveNumber( NombreProyecto,fechaInicioPago );
      await executeAPayrroll( consecutiveNumber,NombreProyecto,Cedula );
    } else {
      console.log( 'Error on create a new payrroll' );
      res.status( 500 ).send();
    }
    res.status( 200 ).send();
  } catch ( e ) {
    console.log( `Error: ${e}` );
    res.status( 500 ).send( e.message );
  }
};


export const sumDays = ( dias ) =>{
  let newDate = new Date();
  newDate.setDate( newDate.getDate() + dias );
  newDate = eliminateTimeFromDate( newDate );
  return newDate;
};


export const getProjectsByEmailAndName = async ( req, res ) => {
  const { Email, ProjectName } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input( 'email', Email )
      .input( 'projectName', ProjectName )
      .query( projectQueries.getProjectsByEmailAndName );
    res.json( result.recordset );
  } catch ( e ) {
    console.log( e );
    res.error( e );
  }
};

export const getProjectInfoByName = async ( req, res ) => {
  const { projectName } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool.request().input( 'projectName', projectName ).query( projectQueries.getProjectByName );
    res.json( result.recordset );
    console.log( result.recordset );
  } catch ( e ) {
    console.log( e );
  }
};

export const updateProject = async ( req, res ) => {
  const { projectName, paymentPeriod, oldProjectName, employerID } = req.body;
  console.log( projectName, paymentPeriod, oldProjectName );
  
  console.log( 'Estoy entrando en el backend' );
  if ( projectName == null || paymentPeriod == null || oldProjectName == null || employerID == null ) {
    const message = 'Bad Request. Please Fill All Fields.';
    return res.status( 400 ).json( { msg: message } );
  }
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input( 'projectName', sql.VarChar, projectName )
      .input( 'paymentPeriod', sql.VarChar, paymentPeriod )
      .input( 'oldProjectName', sql.VarChar, oldProjectName )
      .input( 'employerID', sql.VarChar, employerID )
      .query( projectQueries.updateProject );
    res.json( result );
    console.log ( result );
  } catch ( e ) {
    console.log( `Error: ${e}` );
    res.status( 500 ).send( e.message );
  }
};

const deleteAllEmployees = async( projectName, employerID ) =>{
  const pool = await getConnection();
  await pool
    .request()
    .input( 'projectName', projectName )
    .input( 'employerID', employerID )
    .execute( 'DeleteAllEmployees' );
};

const employeesFromProjectInfo = async ( projectName, employerID ) => {
  const pool = await getConnection();
  const employeesInfo = await pool
    .request()
    .input( 'projectName', projectName )
    .input( 'employerID', employerID )
    .query( projectQueries.getAllEmployeesContactInfo );
  return employeesInfo;
};

const setProjectAsInactive = async ( projectName, employerID ) => {
  const pool = await getConnection();
  await pool
    .request()
    .input( 'projectName', projectName )
    .input( 'employerID', employerID )
    .query( projectQueries.logicalEraseProject );
};

export const deleteProject = async ( req, res ) => {
  const { projectName, employerID } = req.body;

  if ( projectName === null || employerID === null ) {
    const message = 'Bad Request Invalid Project Name';
    return res.status( 400 ).json( { msg: message } );
  }

  try {
    await setProjectAsInactive( projectName,employerID );
    const employeesInfo = await employeesFromProjectInfo( projectName, employerID );

    let mailFormat = {
      from: process.env.EMAIL_USER,
      to:null,
      subject: 'Terminacion de Contrato',
      html: ( emailTerminateContract( `Se ha eliminado el proyecto de la plataforma por lo que se procede a un despido temprano del proyecto: ${projectName}` ) ),
    };

    for ( let employeeIndex = 0; employeeIndex < employeesInfo.recordset.length; employeeIndex++ ) {
      mailFormat.to = employeesInfo.recordset[employeeIndex].Email;
      await sendEmail( mailFormat );
    }

    await deleteAllEmployees( projectName, employerID );

  } catch ( error ) {
    res.status( 500 );
    res.send( error.message );
    console.log( error );
  }
};

export const getCountEmployeesContractType = async( req,res ) => {
  const {  employerID, projectName } = req.params;
  console.log(  employerID, projectName );
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input( 'employerID', employerID )
      .input( 'projectName', projectName )
      .query( projectQueries.getCountEmployeesByType );
    res.json( result.recordset );
    console.log( result.recordset );
  } catch ( e ) {
    console.log( e );
  }

};

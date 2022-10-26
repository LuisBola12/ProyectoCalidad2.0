import { getConnection, sql } from '../database';
import { obligatoryDeductionsQueries } from '../database/queries/obligatoryDeductionsQueries';
import { calculateGrossSalaryForAllEmployes } from './projects.controller';
import { payrollQueries } from './../database/queries/payrollQueries';
import { insertCostTotalBenefits } from './benefits.controller';
import { insertCostTotalVoluntaryDeductions } from './voluntaryDeductions.controller';
import { calculateNetSalary,calculateAmount,estimateIncomeTax } from '../utils/estimateCalculator';
import { filterPaymentsByProjectName, filterPaymentsByDate, filterPaymentByEmployeeID, filterPaymentsByContractType } from '../utils/employeePaymentsFilters';

const calculateAmountRentTaxes = ( Salary, TipoJornada ) => {
  const salaryI = parseFloat( Salary );
  if ( salaryI === null || salaryI === undefined || salaryI <= 0 ){
    return 0;
  } else {
    if ( TipoJornada === 'Mensual' ){
      const salary = estimateIncomeTax( salaryI, 1 );
      return salary;
    } else {
      if ( TipoJornada === 'Quincenal' ){
        const salary = estimateIncomeTax( salaryI, 2 );
        return salary;
      } else {
        if ( TipoJornada === 'Semanal' ){
          const salary = estimateIncomeTax( salaryI, 4 );
          return salary;
        }
      }
    }
  }
};

const getObligatoryDeductions = async ( CedulaEmpleado, NombreProyecto ) => {
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input( 'CedulaEmpleado', CedulaEmpleado )
      .input( 'Proyecto', NombreProyecto )
      .execute( 'ObtenerDeduccionesObligatorias' );
    console.log( result.recordset );
    return result.recordset;
  } catch ( error ) {
    console.log( `Error al conseguir deducciones obligatorias: ${error}` );
    return undefined;
  }
};

const insertObligatoryDeductionsPayroll = async ( InfoDeduccionObligatoria ) => {
  const   {   
    ConsecutivoPlanilla, 
    CedulaEmpleador, 
    ConsecutivoPago,
    NombreDeduccionObligatoria,
    NombreProyecto,
    MontoEmpleador,
    MontoEmpleado } = InfoDeduccionObligatoria;

  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input( 'ConsecutivoPlanilla', ConsecutivoPlanilla )
      .input( 'CedulaEmpleador', CedulaEmpleador )
      .input( 'ConsecutivoPago', ConsecutivoPago )
      .input( 'NombreDeduccionObligatoria', NombreDeduccionObligatoria )
      .input( 'NombreProyecto', NombreProyecto )
      .input( 'MontoEmpleador', sql.Float, MontoEmpleador )
      .input( 'MontoEmpleado', sql.Float, MontoEmpleado )
      .query( obligatoryDeductionsQueries.insertObligatoryDeductions );
    return true;
  } catch ( error ) {
    console.log( `Error al insertar una deduccionObligatoria: ${error} NumPago: ${ConsecutivoPago}` );
    return undefined;
  }
};

export const obligatoryDeductionsPayRoll = async( cedEmpleado,cedEmpleador,proyName,grossSalary,contractType,consecutivePlanilla,consecutivePayslip ) => {
  const obligatoryDeductions = await getObligatoryDeductions( cedEmpleado, proyName );
  let montoEmpleado = 0.0;
  let montoEmpleador = 0.0;
  let nombreDeduccionObligatoria = '';
  console.log( obligatoryDeductions );
  for ( let index = 0; index < obligatoryDeductions.length; index++ ){
    if ( obligatoryDeductions[index].Nombre === 'Impuesto sobre la renta' ){
      montoEmpleado = calculateAmountRentTaxes( grossSalary, contractType );
      montoEmpleador = 0;
    } else {
      montoEmpleado = calculateAmount( grossSalary,  obligatoryDeductions[index].PorcentajeEmpleado );
      montoEmpleador = calculateAmount( grossSalary,  obligatoryDeductions[index].PorcentajeEmpleador ); 
    }
    nombreDeduccionObligatoria = obligatoryDeductions[index].Nombre;

    const data = {
      'ConsecutivoPlanilla': consecutivePlanilla, 
      'CedulaEmpleador': cedEmpleador, 
      'ConsecutivoPago': consecutivePayslip,
      'NombreDeduccionObligatoria': nombreDeduccionObligatoria,
      'NombreProyecto': proyName,
      'MontoEmpleador': montoEmpleador,
      'MontoEmpleado': montoEmpleado
    };
    const result = await insertObligatoryDeductionsPayroll( data );
    if ( result === true ){
      insertOblDeductionsOnPayslip( cedEmpleado,consecutivePlanilla,consecutivePayslip );
    }
  }
  return true;
};
const insertAPaySlip = async(
  consecutivoPlanilla,
  cedulaEmpleador,
  cedulaEmpleado,
  salarioBruto ) =>{
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input( 'ConsecutivoPlanilla', consecutivoPlanilla )
      .input( 'CedulaEmpleador', cedulaEmpleador )
      .input( 'CedulaEmpleado', cedulaEmpleado )
      .input( 'SalarioBruto', salarioBruto )
      .query( payrollQueries.insertAPayslip );
    return true;
  } catch ( error ) {
    console.log( `Error al insertar una nomina: ${error}` );
    return false;
  }
};
export const getConsecutivePayNumber = async( consecutivePlanilla,cedulaEmpleado )=>{
  try { 
    const pool = await getConnection();
    const result = await pool.request()
      .input( 'Cedula', cedulaEmpleado )
      .input( 'ConsecPlanilla', consecutivePlanilla )
      .query( payrollQueries.getPaysilipOfAnEmployee );
    return result.recordset[0].ConsecutivoPago;
  } catch ( error ) {
    console.log( `Error al conseguir el numero de nomina: ${error}` );
    return error;
  }
};

const getTotalCostBenefits = async( consecutivePayroll,cedEmpleado ) =>{
  const consecutivePayslip = await getConsecutivePayNumber( consecutivePayroll,cedEmpleado );
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input( 'Cedula', cedEmpleado )
      .input( 'ConsecPlanilla', consecutivePayroll )
      .input( 'ConsecPago', consecutivePayslip )
      .query( payrollQueries.getTotalCostOfBenefits );
    return result.recordset[0].MontoTotalBeneficios;
  } catch ( error ) {
    console.log( `Error al conseguir el costo de beneficios: ${error}` );
    return undefined;
  }
};
export const getPayrrollsOfAProject = async( req,res ) =>{
  try {
    const { Proyecto } = req.params;
    const pool = await getConnection();
    const result = await pool
      .request()
      .input( 'Proyecto', Proyecto )
      .query( payrollQueries.getPayrrollsOfAproject );
    res.json( result.recordset );
  } catch ( e ) {
    res.status( 500 );
    res.send( e.message );
  }
};
export const getAllPayslipsOfAProject = async( req,res ) =>{
  try {
    const { Proyecto,ConsecutivoPlanilla } = req.body;
    const pool = await getConnection();
    const result = await pool
      .request()
      .input( 'NombreProyecto', Proyecto )
      .input( 'NumeroPagoPlanilla', ConsecutivoPlanilla )
      .execute( 'conseguirNominaEmpleados' );
    res.json( result.recordset );
  } catch ( e ) {
    res.status( 500 );
    res.send( e.message );
  }
};
const getTotalCostVolDeductions = async( consecutivePayroll,cedEmpleado ) =>{
  const consecutivePayslip = await getConsecutivePayNumber( consecutivePayroll,cedEmpleado );
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input( 'Cedula', cedEmpleado )
      .input( 'ConsecPlanilla', consecutivePayroll )
      .input( 'ConsecPago', consecutivePayslip )
      .query( payrollQueries.getTotalCostOfVolDeductions );
    return result.recordset[0].MontoTotalDeduccionesVoluntarias;
  } catch ( e ) {
    console.log( e );
    return undefined;
  }
};
const getTotalOblDeductions = async( consecutivePayroll,cedEmpleado ) =>{
  const consecutivePayslip = await getConsecutivePayNumber( consecutivePayroll,cedEmpleado );
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input( 'Cedula', cedEmpleado )
      .input( 'ConsecPlanilla', consecutivePayroll )
      .input( 'ConsecPago', consecutivePayslip )
      .query( payrollQueries.getTotalCostOfOblDeductions );
    return result.recordset[0].MontoTotalDeduccionesObligatoriasEmpleado;
  } catch ( error ) {
    console.log( `Error al conseguir el costo de deduc obl: ${error}` );
    return undefined;
  }
};
const insertNetSalary = async( consecutivePayrroll,cedEmpleado,netSalary ) =>{
  const consecutivePayslip = await getConsecutivePayNumber( consecutivePayrroll,cedEmpleado );
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input( 'SalarioNetoEmpleado', netSalary )
      .input( 'Cedula', cedEmpleado )
      .input( 'ConsecPlanilla', consecutivePayrroll )
      .input( 'ConsecPago', consecutivePayslip )
      .query( payrollQueries.insertNetSalaryOfAPayslip );
  } catch ( error ) {
    console.log( `Error al insertar el salario neto: ${error}` );
    return undefined;
  }
};
const insertOblDeductionsOnPayslip = async( cedEmpleado,consecutivePayrroll,consecutivePayslip ) =>{
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input( 'CedulaEmpleado', cedEmpleado )
      .input( 'ConsecutivoPlanilla', consecutivePayrroll )
      .input( 'ConsecutivoPago', consecutivePayslip )
      .execute( 'insertarDeduccionesObligatoriasPago' );
  } catch ( error ) {
    console.log( `Error al insertar las deducciones obligatorias en pago: ${error}` );
    return undefined;
  }
};
const insertTotalOblgatoryDeductions = async( cedEmpleado,cedEmpleador,proyName,grossSalary,contractType,consecutivePlanilla ) =>{
  const consecutivePayslip = await getConsecutivePayNumber( consecutivePlanilla,cedEmpleado );
  const result = await obligatoryDeductionsPayRoll( cedEmpleado,cedEmpleador,proyName,grossSalary,contractType,consecutivePlanilla,consecutivePayslip );
  if ( result === true ){
    return true;
  }
};
const calculateNetSalaryOfAnEmployee = async( cedEmpleado,proyName,consecutivePayrroll,grossSalary ) => {
  const handleBenefits = await insertCostTotalBenefits( cedEmpleado,proyName,consecutivePayrroll );
  const handleVolDeductions = await insertCostTotalVoluntaryDeductions( cedEmpleado,proyName,consecutivePayrroll );
  if ( handleBenefits === true && handleVolDeductions === true ){
    aplicateDeductionsAndBenefitsToSalary( cedEmpleado,consecutivePayrroll,grossSalary );
  }
};
const aplicateDeductionsAndBenefitsToSalary = async( cedEmpleado,consecutivePayrroll,grossSalary ) =>{
  const totalCostBenefits = await getTotalCostBenefits( consecutivePayrroll,cedEmpleado );
  const totalCostVolDeductions = await getTotalCostVolDeductions( consecutivePayrroll,cedEmpleado );
  const totalCostOblDeductions = await getTotalOblDeductions( consecutivePayrroll,cedEmpleado );
  if ( totalCostBenefits !== undefined && totalCostVolDeductions !== undefined && totalCostOblDeductions !== undefined ){
    const netSalary = calculateNetSalary( grossSalary,totalCostVolDeductions,totalCostOblDeductions );
    insertNetSalary( consecutivePayrroll,cedEmpleado,netSalary );
  } 
};
const individualPayslipInsert = async( element,nombreProyecto,consecutivePlanilla,cedulaEmpleador ) =>{
  if ( element.contractType === 'Servicios Profesionales' ){
    console.log( 'Esto se va a areglar' );
  } else {
    const errorHand = await insertAPaySlip( consecutivePlanilla,cedulaEmpleador,element.employeeID,element.grossSalary );
    if ( errorHand === true ){
      const result = await insertTotalOblgatoryDeductions( element.employeeID,cedulaEmpleador,nombreProyecto,element.grossSalary,element.paymentPeriod,consecutivePlanilla );
      if ( result === true ){
        calculateNetSalaryOfAnEmployee( element.employeeID,nombreProyecto,consecutivePlanilla,element.grossSalary );
      }
    }
  }
};
export const executeAPayrroll = async( consecutivePlanilla,nombreProyecto,cedulaEmpleador ) =>{
  const payslips = await calculateGrossSalaryForAllEmployes( nombreProyecto );
  payslips.forEach( element=>{
    individualPayslipInsert( element,nombreProyecto,consecutivePlanilla,cedulaEmpleador );
  } );
  return true;
};

export const getPaymentsMadeByEmployer = async ( req, res ) => {
  try {
    const { employerID, projectNameFilter, initialDateFilter, endDateFilter, idFilter, contractTypeFilter } = req.params;
    const pool = await getConnection();
    const result = await pool.request()
      .input( 'employerID', employerID )
      .query( payrollQueries.getPaymentsMadeByEmployer );
    if ( projectNameFilter != 'Any' ) {
      result.recordset = filterPaymentsByProjectName( result.recordset, projectNameFilter );
    }
    if ( idFilter != 'Any' ) {
      result.recordset = filterPaymentByEmployeeID( result.recordset, idFilter );
    }
    if ( contractTypeFilter != 'Any' ) {
      result.recordset = filterPaymentsByContractType( result.recordset, contractTypeFilter );
    }
    result.recordset = filterPaymentsByDate( result.recordset, initialDateFilter, endDateFilter );
    res.status( 200 ).json( result.recordset );
    console.log( result.recordset );
  } catch ( error ) {
    console.log( `Error al traer los pagos: ${error}` );
  }
};

export const getTotalSalaryCost = async( req, res ) =>{
  const { consecutivoPlanilla, NombreProyecto } = req.params;

  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input( 'ConsecutivoPlanilla', consecutivoPlanilla )
      .input( 'NombreProyecto', NombreProyecto )
      .query( payrollQueries.getTotalSalaryCost );
    console.log( result.recordset );
    res.status( 200 ).json( result.recordset );
  } catch ( error ){
    console.log( error );
    res.status( 500 ).send( error.message );
  }
};

export const getTotalCostObligatoryDeductionsEmployer = async( req, res ) =>{
  const { consecutivoPlanilla } = req.params;

  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input( 'ConsecutivoPlanilla', consecutivoPlanilla )
      .query( payrollQueries.getTotalCostObligatoryDeductionsEmployer );
    console.log( result.recordset );
    res.status( 200 ).json( result.recordset );
  } catch ( error ){
    console.log( error );
    res.status( 500 ).send( error.message );
  }
};

export const getTotalCostBenefitsEmployer = async( req, res ) =>{
  const { consecutivoPlanilla } = req.params;

  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input( 'ConsecutivoPlanilla', consecutivoPlanilla )
      .query( payrollQueries.getTotalCostBenefitsEmployer );
    console.log( result.recordset );
    res.status( 200 ).json( result.recordset );
  } catch ( error ){
    console.log( error );
    res.status( 500 ).send( error.message );
  }
};

export const getSeparateOblDeductions = async( req,res )=>{
  const { consecutivoPago } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input( 'consecutivoPago', consecutivoPago )
      .query( payrollQueries.getItemizedOblDeductionsOfPayment );
    console.log( result.recordset );
    res.status( 200 ).json( result.recordset );
  } catch ( error ){
    console.log( error );
    res.status( 500 ).send( error.message );
  }
};
export const getSeparateVolDeductions = async( req,res )=>{
  const { consecutivoPago } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input( 'consecutivoPago', consecutivoPago )
      .query( payrollQueries.getItemizedVolDeductionsOfPayment );
    console.log( result.recordset );
    res.status( 200 ).json( result.recordset );
  } catch ( error ){
    console.log( error );
    res.status( 500 ).send( error.message );
  }
};

export const getPayrollTotalCosts = async ( req, res ) => {
  const { employerID, projectNameFilter, initialDateFilter, endDateFilter } = req.params;
  if ( employerID == '' ) {
    const message = 'Bad Request. Please Fill All Fields.';
    return res.status( 400 ).json( { msg: message } );
  }
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input( 'employerID', employerID )
      .query( payrollQueries.getPayrollTotalCosts );
      
    if ( projectNameFilter != 'Any' ) {
      result.recordset = filterPaymentsByProjectName( result.recordset, projectNameFilter );
    }
    result.recordset = filterPaymentsByDate( result.recordset, initialDateFilter, endDateFilter );
    
    res.status( 200 ).json( result.recordset );
  } catch ( e ) {
    res.status( 404 );
    res.send( e.message );
  }
};

export const getPayrrollStatistics = async( req,res ) =>{
  const { CedulaEmpleador, NombreProyecto } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input( 'Cedula', sql.VarChar, CedulaEmpleador )
      .input( 'NombreProyecto', sql.VarChar, NombreProyecto )
      .query( payrollQueries.getPayrollStatistics );
    res.status( 200 ).json( result.recordset );
  } catch ( e ) {
    console.log( `Error: ${e}` );
    res.status( 500 ).send( e.message );
  }
};

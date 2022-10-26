import { getConnection, sql } from '../database';
import { benefitsQueries } from '../database/queries/benefitsQueries';
import { getConsecutivePayNumber } from './payrollController';
import { notifyEmployeesForDeletedBenefit } from '../utils/notifyEmployeesForDeletedBenefit';

export const getBenefits = async ( req, res ) => {
  const { Proyecto, CedulaEmpleador } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input( 'Proyecto', Proyecto )
      .input( 'CedulaEmpleador', CedulaEmpleador )
      .query( benefitsQueries.getBenefits );
    res.json( result.recordset );
  } catch ( e ) {
    res.status( 500 );
    res.send( e.message );
  }
};

export const getBenefitsByName = async ( req, res ) => {
  const { Proyecto, CedulaEmpleador, Nombre } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input( 'Nombre', Nombre )
      .input( 'Proyecto', Proyecto )
      .input( 'CedulaEmpleador', CedulaEmpleador )
      .query( benefitsQueries.getBenefitsByName );
    res.json( result.recordset );
    console.log( result.recordset );
  } catch ( e ) {
    res.status( 500 );
    res.send( e.message );
  }
};

export const getEmployeeBenefitsByEmail = async ( req, res ) => {
  const { Proyecto, Email } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input( 'Email', Email )
      .input( 'Proyecto', Proyecto )
      .execute( 'getEmployeeBenefits' );
    res.json( result.recordset );
    console.log( result.recordset );
  } catch ( e ) {
    res.status( 500 );
    res.send( e.message );
  }
};


export const getOfferedBenefits = async ( req, res ) => {
  const { Proyecto, Email } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input( 'Email', Email )
      .input( 'Proyecto', Proyecto )
      .execute( 'getOfferedBenefits' );
    res.json( result.recordset );
    console.log( result.recordset );
  } catch ( e ) {
    res.status( 500 );
    res.send( e.message );
  }
};


export const linkEmployeeToBenefit = async ( req, res ) => {
  const { Email, NombreBeneficio, NombreProyecto } = req.body;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input( 'Email', sql.VarChar, Email )
      .input( 'NombreProyecto', sql.VarChar, NombreProyecto )
      .input( 'NombreBeneficio', sql.VarChar, NombreBeneficio )
      .execute( 'vincularBeneficioEmpleado' );
    console.log( result );
    res.json( { NombreProyecto, NombreBeneficio } );
  } catch ( e ) {
    console.log( `Error: ${e}` );
    res.status( 500 ).send( e.message );
  }
};

export const unlinkEmployeeToBenefit = async ( req, res ) => {
  const { Email, Proyecto, NombreBeneficio } = req.body;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input( 'Email', sql.VarChar, Email )
      .input( 'Proyecto', sql.VarChar, Proyecto )
      .input( 'NombreBeneficio', sql.VarChar, NombreBeneficio )
      .execute( 'desvincularBeneficioDeEmpleado' );
    console.log( result );
  } catch ( e ) {
    console.log( `Error: ${e}` );
    res.status( 500 ).send( e.message );
  }
};


export const createBenefit = async ( req, res ) => {
  const { Nombre, NombreProyecto, CedulaEmpleador, CostoActual, Descripción } = req.body;
  if ( Nombre == null || CostoActual == null || NombreProyecto == null ) {
    const message = 'Bad Request. Please Fill All Fields.';
    return res.status( 400 ).json( { msg: message } );
  }
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input( 'Nombre', sql.VarChar, Nombre )
      .input( 'NombreProyecto', sql.VarChar, NombreProyecto )
      .input( 'CedulaEmpleador', sql.VarChar, CedulaEmpleador )
      .input( 'CostoActual', sql.Int, CostoActual )
      .input( 'Descripción', sql.VarChar, Descripción )
      .query( benefitsQueries.createBenefit );
    console.log( result );
    res.json( { Nombre, CostoActual } );
  } catch ( e ) {
    console.log( `Error: ${e}` );
    res.status( 500 ).send( e.message );
  }
};

export const updateBenefit = async ( req, res ) => {
  const { Nombre, NombreProyecto, CedulaEmpleador, CostoActual, Descripción } = req.body;
  const { NombreAntiguo } = req.params;
  if ( Nombre == null || CostoActual == null || NombreProyecto == null ) {
    const message = 'Bad Request. Please Fill All Fields.';
    return res.status( 400 ).json( { msg: message } );
  }
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input( 'Nombre', sql.VarChar, Nombre )
      .input( 'NombreAntiguo', sql.VarChar, NombreAntiguo )
      .input( 'NombreProyecto', sql.VarChar, NombreProyecto )
      .input( 'CedulaEmpleador', sql.VarChar, CedulaEmpleador )
      .input( 'CostoActual', sql.Int, CostoActual )
      .input( 'Descripción', sql.VarChar, Descripción )
      .query( benefitsQueries.editBenefit );
    res.json( { Nombre, NombreProyecto, CostoActual, Descripción } );
  } catch ( e ) {
    console.log( `Error: ${e}` );
    res.status( 500 ).send( e.message );
  }
};

export const insertCostTotalBenefits = async ( cedEmpleado, proyName, consecutivePayroll ) => {
  const consecutivePayslip = await getConsecutivePayNumber( consecutivePayroll, cedEmpleado );
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input( 'CedulaEmpleado', cedEmpleado )
      .input( 'Proyecto', proyName )
      .input( 'ConsecutivoPlanilla', consecutivePayroll )
      .input( 'ConsecutivoPago', consecutivePayslip )
      .execute( 'insertarBeneficiosEnPago' );
    return true;
  } catch ( e ) {
    console.log( e );
    return undefined;
  }
};
export const deactivateBenefit = async ( req, res ) => {
  const { Nombre, NombreProyecto, CedulaEmpleador } = req.body;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input( 'NombreBeneficio', sql.VarChar, Nombre )
      .input( 'Proyecto', sql.VarChar, NombreProyecto )
      .input( 'CedulaEmpleador', sql.VarChar, CedulaEmpleador )
      .execute( 'eliminarBeneficio' );
    await notifyEmployeesForDeletedBenefit( result.recordset, Nombre, NombreProyecto );
  } catch ( e ) {
    console.log( `Error: ${e}` );
    res.status( 500 ).send( e.message );
  }
};

export const reactivateBenefit = async ( req, res ) => {
  console.log( 'entro a la funcion del controller' );
  const { Nombre, NombreProyecto, CedulaEmpleador } = req.body;
  const { NombreAntiguo } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input( 'Nombre', sql.VarChar, Nombre )
      .input( 'NombreAntiguo',sql.VarChar, NombreAntiguo )
      .input( 'NombreProyecto', sql.VarChar, NombreProyecto )
      .input( 'CedulaEmpleador', sql.VarChar, CedulaEmpleador )
      .query( benefitsQueries.reactivateBenefit );
  } catch ( e ) {
    console.log( `Error: ${e}` );
    res.status( 500 ).send( e.message );
  }
};

export const CostTotalBenefits = async ( infoBenefits ) => {
  const { Email, Proyecto, ConsecutivoPlanilla, ConsecutivoPago } = infoBenefits.body;
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input( 'Email', Email )
      .input( 'Proyecto', Proyecto )
      .input( 'ConsecutivoPlanilla', ConsecutivoPlanilla )
      .input( 'ConsecutivoPago', ConsecutivoPago )
      .execute( 'calcularTotalBeneficiosDeEmpleado' );
    console.log( result.recordset );
    return result.recordset;
  } catch ( e ) {
    console.log( e );
    return undefined;
  }
};

export const validateBenefitSuscription = async ( req, res ) => {
  const { projectName, employeeEmail, benefitToValidate } = req.params;


  let validation = {
    isValid: true,
    exceedsMoneyAmountLimit: false,
    exceedsBenefitsQtyLimit: false,
    maxBenefitsQtyAllowed: 0,
    maxMoneyAmountAllowed: 0
  };
  try {


    const pool = await getConnection();
    const benefitToValidateInfo = await pool.request()
      .input( 'benefitName', benefitToValidate )
      .input( 'projectName', projectName )
      .query( benefitsQueries.getBenefitInfo );

    const benefitsUsedInfo = await pool.request()
      .input( 'employeeEmail', employeeEmail )
      .input( 'projectName', projectName )
      .query( benefitsQueries.benefitUsedInfo );

    const benefitsLimits = await pool.request()
      .input( 'projectName', projectName )
      .query( benefitsQueries.benefitsLimits );
    let employeeBenefitsQty = 0;
    let moneyAmountUsedByEmployee = 0;

    if ( await benefitsUsedInfo.recordset.length > 0 ) {
      const { employeeBenefitsQty: extractedQty, moneyAmountUsedByEmployee: extractedMoney } = await benefitsUsedInfo.recordset[0];
      employeeBenefitsQty = extractedQty;
      moneyAmountUsedByEmployee = extractedMoney;
    }

    const { maxBenefitsQtyAllowed, maxMoneyAmountAllowed } = await benefitsLimits.recordset[0];
    const { CostoActual: benefitToValidateCost } = await benefitToValidateInfo.recordset[0];

    validation.maxBenefitsQtyAllowed = maxBenefitsQtyAllowed;
    validation.maxMoneyAmountAllowed = maxMoneyAmountAllowed;
    if ( employeeBenefitsQty + 1 > maxBenefitsQtyAllowed ) {
      validation.isValid = false;
      validation.exceedsBenefitsQtyLimit = true;
    }
    if ( moneyAmountUsedByEmployee + benefitToValidateCost > maxMoneyAmountAllowed ) {
      validation.isValid = false;
      validation.exceedsMoneyAmountLimit = true;
    }

    res.json( validation );

    console.log( validation );
  }
  catch ( error ) {
    res.status( 500 ).send( 'Database Conection Error:' + error.message );
    console.log( error );
  }
};

export const getBenefitsStatistics = async ( req, res ) => {
  const { CedulaEmpleador, NombreProyecto } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input( 'CedulaEmpleador', sql.VarChar, CedulaEmpleador )
      .input( 'NombreProyecto', sql.VarChar, NombreProyecto )
      .query( benefitsQueries.getBenefitsStatistics );
      res.status(200).json(result.recordset);
  } catch ( e ) {
    console.log( `Error: ${e}` );
    res.status( 500 ).send( e.message );
  }
};
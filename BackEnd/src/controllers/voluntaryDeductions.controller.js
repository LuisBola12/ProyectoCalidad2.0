import { getConnection,sql } from '../database';
import { voluntaryDeductionsQueries } from '../database/queries/voluntaryDeductionsQueries';
import {getConsecutivePayNumber} from './payrollController'
import { notifyEmployeesForDeletedVoluntaryDeduction } from '../utils/notifyEmployeesForDeletedVoluntaryDeduction';

export const getVoluntaryDeductions = async ( req, res ) => {
  const { NombreProyecto, CedulaEmpleador } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input( 'NombreProyecto', NombreProyecto )
      .input('CedulaEmpleador', CedulaEmpleador)
      .query( voluntaryDeductionsQueries.getVoluntaryDeductions );
    res.json( result.recordset );
  } catch ( e ) {
    res.status( 500 );
    res.send( e.message );
  }
};

export const getVoluntaryDeductionsByName = async ( req, res ) => {
  const { NombreProyecto, CedulaEmpleador, Nombre } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input( 'Nombre', Nombre )
      .input( 'NombreProyecto', NombreProyecto )
      .input('CedulaEmpleador', CedulaEmpleador)
      .query( voluntaryDeductionsQueries.getVoluntaryDeductionsByName );
    res.json( result.recordset );
  } catch ( e ) {
    res.status( 500 );
    res.send( e.message );
  }
};

export const getEmployeeVoluntaryDeductionsByEmail = async ( req, res ) => {
  const { Proyecto, Email } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input( 'Email', Email )
      .input( 'Proyecto', Proyecto )
      .execute( 'getEmployeeVoluntaryDeductions' );
    res.json( result.recordset );
    console.log( result.recordset );
  } catch ( e ) {
    res.status( 500 );
    res.send( e.message );
  }
};

export const createNewVoluntaryDeduction = async ( req, res ) => {
  const { Nombre, NombreProyecto, CedulaEmpleador, Costo, Descripcion } = req.body;
  if ( Nombre == null || NombreProyecto == null || Costo == null ) {
    const message = 'Bad Request. Please Fill All Fields.';
    return res.status( 400 ).json( { msg: message } );
  }
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input( 'Nombre', sql.VarChar, Nombre )
      .input( 'NombreProyecto', sql.VarChar, NombreProyecto )
      .input('CedulaEmpleador', sql.VarChar, CedulaEmpleador)
      .input( 'Costo', sql.Int, Costo )
      .input( 'Descripcion', sql.VarChar, Descripcion )
      .query( voluntaryDeductionsQueries.createNewVoluntaryDeduction );
    console.log( result );
    res.json( { Nombre, Costo, Descripcion } );
  } catch ( e ) {
    console.log( `Error: ${e}` );
    res.status( 500 ).send( e.message );
  }
};

export const updateVoluntaryDeduction = async ( req, res ) => {
  const { Nombre, NombreProyecto, CedulaEmpleador, Costo, Descripcion } = req.body;
  const { NombreAntiguo } = req.params;
  if ( Nombre == null || Costo == null || NombreProyecto == null ) {
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
      .input('CedulaEmpleador', sql.VarChar, CedulaEmpleador)
      .input( 'Costo', sql.Int, Costo )
      .input( 'Descripcion', sql.VarChar, Descripcion )
      .query( voluntaryDeductionsQueries.editVoluntaryDeduction );
    res.json( { Nombre, NombreProyecto, Costo, Descripcion } );
  } catch ( e ) {
    console.log( `Error: ${e}` );
    res.status( 500 ).send( e.message );
  }
};

export const getOfferedVoluntaryDeductions = async ( req, res ) => {
  const { Proyecto, Email } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input( 'Email', Email )
      .input( 'Proyecto', Proyecto )
      .execute( 'getOfferedVoluntaryDeductions' );
    res.json( result.recordset );
    console.log( result.recordset );
  } catch ( e ) {
    res.status( 500 );
    res.send( e.message );
  }
};

export const insertCostTotalVoluntaryDeductions = async ( cedEmpleado, proyName, consecutivePayroll ) => {
  const consecutivePayslip = await getConsecutivePayNumber(consecutivePayroll,cedEmpleado);
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input( 'CedulaEmpleado', cedEmpleado )
      .input( 'Proyecto', proyName )
      .input( 'ConsecutivoPlanilla', consecutivePayroll )
      .input( 'ConsecutivoPago', consecutivePayslip )
      .execute( 'insertarDeduccionesVoluntariasEnPago' );
      return true;
  } catch ( e ) {
    console.log( e );
    return undefined;
  }
};

export const linkEmployeeToVoluntaryDeduction = async (req, res) => {
  const { Email, NombreDeduccionVoluntaria, NombreProyecto } = req.body;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input('Email', sql.VarChar, Email)
      .input('NombreProyecto', sql.VarChar, NombreProyecto)
      .input('NombreDeduccionVoluntaria', sql.VarChar, NombreDeduccionVoluntaria)
      .execute('vincularDeduccionVoluntariaEmpleado');
    res.json({ NombreProyecto, NombreDeduccionVoluntaria });
  } catch (e) {
    console.log(`Error: ${e}`);
    res.status(500).send(e.message);
  }
};

export const unlinkEmployeeToVoluntaryDeduction = async (req, res) => {
  const { Email, Proyecto, NombreDeduccionVoluntaria } = req.body;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input('Email', sql.VarChar, Email)
      .input('Proyecto', sql.VarChar, Proyecto)
      .input('NombreDeduccionVoluntaria', sql.VarChar, NombreDeduccionVoluntaria)
      .execute('desvincularDeduccionVoluntariaDeEmpleado');
    console.log(result);
  } catch (e) {
    console.log(`Error: ${e}`);
    res.status(500).send(e.message);
  }
};

export const deactivateVoluntaryDeduction = async (req, res) => {
  const { Nombre, NombreProyecto, CedulaEmpleador } = req.body;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input('NombreDeduccionVoluntaria', sql.VarChar, Nombre)
      .input('Proyecto', sql.VarChar, NombreProyecto)
      .input( 'CedulaEmpleador', sql.VarChar, CedulaEmpleador )
      .execute('eliminarDeduccionVoluntaria');
      await notifyEmployeesForDeletedVoluntaryDeduction(result.recordset, Nombre, NombreProyecto);
  } catch (e) {
    console.log(`Error: ${e}`);
    res.status(500).send(e.message);
  }
};

export const reactivateVoluntaryDeduction = async ( req, res ) => {
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
      .query( voluntaryDeductionsQueries.reactivateVoluntaryDeduction );
  } catch ( e ) {
    console.log( `Error: ${e}` );
    res.status( 500 ).send( e.message );
  }
};

export const getVoluntaryDeductionsStatistics = async ( req, res ) => {
  const { CedulaEmpleador, NombreProyecto } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input( 'NombreProyecto', sql.VarChar, NombreProyecto )
      .input( 'CedulaEmpleador', sql.VarChar, CedulaEmpleador )
      .query( voluntaryDeductionsQueries.getVoluntaryDeductionsStatistics );
      res.status(200).json(result.recordset);
  } catch ( e ) {
    console.log( `Error: ${e}` );
    res.status( 500 ).send( e.message );
  }
};
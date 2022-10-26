import { getConnection, sql } from '../database';
import { employeesQueries } from '../database/queries/employeesQueries';
import { userQueries } from '../database/queries/userQueries';
import { sendEmail } from '../services/Mailer';
import { emailNewUserEmployer } from '../FormatEmailMessages/EmailNewUserEmployer';
import { employerQueries } from '../database/queries/employerQueries';
import { emailNewUserVerification } from '../FormatEmailMessages/EmailNewUserVerificationCode';

export const getUsers = async ( req, res ) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query( userQueries.getAllUSers );
    res.json( result.recordset );
  } catch ( e ) {
    res.status( 500 );
    res.send( e.message );
  }
};

export const createNewUser = async ( req, res ) => {
  const { Email, Contrasenia } = req.body;

  if ( Email == null || Contrasenia == null ) {

    const message = 'Bad Request. Please Fill All Fields.';
    return res.status( 400 ).json( { msg: message } );
  }

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input( 'Email', sql.VarChar, Email )
      .input( 'Contrasenia', sql.VarChar, Contrasenia )
      .query( userQueries.createNewUser );
    console.log( result );
    res.json( { Email, Contrasenia } );
  } catch ( e ) {
    console.log( `Error: ${e}` );
    res.status( 500 ).send( e.message );
  }
};

export const verifyCredentials = async ( req, res ) => {
  const { Email, Contrasenia } = req.body;
  console.log( 'Email' );
  console.log( Email );
  console.log( Contrasenia );

  if ( Email == null || Contrasenia == null ) {
    const message = 'Please Fill All Fields.';
    return res.status( 400 ).send( { errorMsg: message } );
  }

  if ( Email == '' || Contrasenia == '' ) {
    const message = 'Please Fill All Fields.';
    return res.status( 400 ).send( { errorMsg: message } );
  }

  try {
    const message = 'Wrong UserName or Password.';
    const pool = await getConnection();
    const result = await pool
      .request()
      .input( 'Email', sql.VarChar, Email )
      .input( 'Contrasenia', sql.VarChar, Contrasenia )
      .execute( 'obtenerDatosUsuario' );
    console.log( result );
    if ( result.recordset.length == 0 ) {
      res.status( 400 ).send( { errorMsg: message } );
    } else {
      if(result.recordset[0].Verificado === true ){
        res.status( 200 ).json( result.recordset[0] );
      }else{
        res.status( 400 ).send( { errorMsg: 'Account not verified' } );
      }
    }
  } catch ( e ) {
    console.log( `Error: ${e}` );
    res.status( 500 ).send( e );
  }
};

export const getUserByEmail = async ( req, res ) => {
  const { Email } = req.params;
  if ( Email == null || Email == '' ) {
    const message = 'Please Fill All Fields.';
    return res.status( 400 ).json( { msg: message } );
  }
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input( 'Email', Email )
      .query( userQueries.getUserByEmail );
    res.status( 200 ).json( result.recordset );
  } catch ( e ) {
    res.status( 500 );
    res.send( e.message );
  }
};

export const getEmployerByID = async ( req, res ) => {
  const { Cedula } = req.params;
  if ( Cedula == null || Cedula == '' ) {
    const message = 'Please Fill All Fields.';
    return res.status( 400 ).json( { msg: message } );
  }
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input( 'Cedula', Cedula )
      .query( employerQueries.getEmployerByID );
    console.log( result );
    res.status( 200 ).json( result.recordset );
  } catch ( e ) {
    res.status( 500 );
    res.send( e.message );
  }
};

export const registerNewUser = async ( req, res ) => {
  const { Cedula, Nombre, Apellido1, Apellido2, Telefono, Email, Contrasenia, Roles } = req.body;

  if ( Cedula == null || Nombre == null || Apellido1 == null
    || Apellido2 == null || Telefono == null || Email == null || Contrasenia == null ) {

    const message = 'Please Fill All Fields.';
    return res.status( 400 ).json( { msg: message } );
  }

  if ( Cedula == '' || Nombre == '' || Apellido1 == ''
    || Apellido2 == '' || Telefono == '' || Email == '' || Contrasenia == '' ) {

    const message = 'Please Fill All Fields.';
    return res.status( 400 ).json( { msg: message } );
  }
  const pool = await getConnection();
  try {
    const result = await pool
      .request()
      .input( 'Email', sql.VarChar, Email )
      .input( 'Contrasenia', sql.VarChar, Contrasenia )
      .input( 'Roles', sql.VarChar, Roles )
      .input( 'Cedula', sql.VarChar, Cedula )
      .input( 'Nombre', sql.VarChar, Nombre )
      .input( 'Apellido1', sql.VarChar, Apellido1 )
      .input( 'Apellido2', sql.VarChar, Apellido2 )
      .input( 'Telefono', sql.VarChar, Telefono )
      .execute( 'registrarEmpleador' );
    console.log( result );
  } catch ( e ) {
    console.log( `Error: ${e}` );
    res.status( 500 ).send( e.message );
  }
  try {
    const dataInfoUser = {
      'email': Email, 
      'password': Contrasenia, 
      'employer': `${Nombre} ${Apellido1} ${Apellido2}`, 
    };

    let mailFormat = {
      from: process.env.EMAIL_USER,
      to: Email,
      subject: 'New SeleMiracleRun Account',
      html: emailNewUserEmployer( dataInfoUser ),
    };
    let mailFormatVerify = {
      from: process.env.EMAIL_USER,
      to: Email,
      subject: 'Verify new SeleMiracleRun Account',
      html: emailNewUserVerification( Email ),
    };
    await sendEmail( mailFormat );
    await sendEmail( mailFormatVerify );
    console.log( 'Se envio correctamente' );
  } catch ( e ){
    console.log( e );
  }
};

export const getProfileEmployee = async ( req, res ) => {
  try {
    const { Email } = req.params;
    const pool = await getConnection();
    const result = await pool
      .request()
      .input( 'Email', Email )
      .query( userQueries.getProfileEmployee );
    res.json( result.recordset );
    console.log( result.recordset );
  } catch ( e ) {
    res.status( 500 );
    res.send( e.message );
  }
};
export const getProfileEmployeer = async ( req, res ) => {
  try {
    const { Email } = req.params;
    const pool = await getConnection();
    const result = await pool
      .request()
      .input( 'Email', Email )
      .query( userQueries.getProfileEmployeer );
    res.json( result.recordset );
  } catch ( e ) {
    res.status( 500 );
    res.send( e.message );
  }
};

export const updateProfileEmployee = async ( req, res ) => {
  const { Nombre, Apellido1,Apellido2,Email,Telefono,Cedula,EmailViejo } = req.body;
  if ( Nombre == null || Apellido1 == null || Apellido2 == null || 
    Email == null  || Cedula == null ) {
    const message = 'Bad Request. Please Fill All Fields.';
    return res.status( 400 ).json( { msg: message } );
  }
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input( 'Email', sql.VarChar, Email )
      .input( 'EmailViejo', sql.VarChar, EmailViejo )
      .query( userQueries.udpateEmail );
    console.log( result.recordset );
  } catch ( e ) {
    console.log( `Error: ${e}` );
    res.status( 500 ).send( e.message );
  }
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input( 'Nombre', sql.VarChar, Nombre )
      .input( 'Apellido1', sql.VarChar, Apellido1 )
      .input( 'Apellido2', sql.VarChar, Apellido2 )
      .input( 'Cedula', sql.VarChar, Cedula )
      .input( 'Telefono', sql.VarChar, Telefono )
      .query( userQueries.updateEmployee );
    res.send( result.recordset );
  } catch ( e ) {
    console.log( `Error: ${e}` );
    res.status( 500 ).send( e.message );
  }
};

export const updateProfileEmployeer = async ( req, res ) => {
  const { Nombre, Apellido1,Apellido2,Email,Telefono,Cedula,EmailViejo } = req.body;
  console.log(Nombre, Apellido1,Apellido2,Email,Telefono,Cedula,EmailViejo);
  if ( Nombre == null || Apellido1 == null || Apellido2 == null || 
    Email == null  || Cedula == null ) {
    const message = 'Bad Request. Please Fill All Fields.';
    return res.status( 400 ).json( { msg: message } );
  }
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input( 'Email', sql.VarChar, Email )
      .input( 'EmailViejo', sql.VarChar, EmailViejo )
      .query( userQueries.udpateEmail );
    console.log( result.recordset );
  } catch ( e ) {
    console.log( `Error: ${e}` );
    res.status( 500 ).send( e.message );
  }
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input( 'Nombre', sql.VarChar, Nombre )
      .input( 'Apellido1', sql.VarChar, Apellido1 )
      .input( 'Apellido2', sql.VarChar, Apellido2 )
      .input( 'Cedula', sql.VarChar, Cedula )
      .input( 'Telefono', sql.VarChar, Telefono )
      .query( userQueries.updateEmployeer );
    res.send( result.recordset );
  } catch ( e ) {
    console.log( `Error: ${e}` );
    res.status( 500 ).send( e.message );
  }
};

export const updateVerification = async ( req, res ) => {
  console.log(req.body)
  const { Email } = req.body;
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input( 'Email', Email )
      .query( userQueries.updateVerification );
    console.log(result.recordset)
    res.status( 200 ).json( { msg: 'Se verifico corectamente'} );
  } catch ( e ) {
    res.status( 500 ).json({msg: 'No se pudo verificar'})
  }
};
import { getConnection, sql } from '../database';
import { employerQueries } from '../database/queries/employerQueries';
import { sendEmail } from '../services/Mailer';
import { emailPDFTotalsReport } from '../FormatEmailMessages/EmailPDFTotalsReport';

export const getEmployer = async ( req, res ) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query( employerQueries.getAllEmployers );
    res.json( result.recordset );
  } catch ( e ) {
    res.status( 500 );
    res.send( e.message );
  }
};

export const createNewEmployer = async ( req, res ) => {
  const { Cedula, Nombre, Apellido1, Apellido2, Telefono, Email } = req.body;
  if ( Cedula == null || Nombre == null || Apellido1 == null
    || Apellido2 == null || Telefono == null || Email == null ) {

    const message = 'Bad Request. Please Fill All Fields.';
    return res.status( 400 ).json( { msg: message } );

  }

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input( 'Cedula', sql.VarChar, Cedula )
      .input( 'Nombre', sql.VarChar, Nombre )
      .input( 'Apellido1', sql.VarChar, Apellido1 )
      .input( 'Apellido2', sql.VarChar, Apellido2 )
      .input( 'Telefono', sql.VarChar, Telefono )
      .input( 'Email', sql.VarChar, Email )
      .query( employerQueries.createNewEmployer );
    console.log( result );
    res.json( { Cedula, Nombre, Apellido1, Apellido2, Telefono, Email } );
  } catch ( e ) {
    console.log( `Error: ${e}` );
    res.status( 500 ).send( e.message );
  }
};

export const getAllEmployerPayments = async (req, res) => {
  const { employerEmail, projectNameFilter, initialDateFilter, endDateFilter } = req.params;
  if (employerEmail == '') {
    const message = 'Bad Request. Please Fill All Fields.';
    return res.status(400).json({ msg: message });
  }
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input('employerEmail', employerEmail)
      .query(employerQueries.getAllPaymentsOfEmployer);
    if (projectNameFilter != 'Any') {
      result.recordset = filterPaymentsByProjectName(result.recordset, projectNameFilter);
    }
    result.recordset = filterPaymentsByDate(result.recordset, initialDateFilter, endDateFilter);

    res.status(200).json(result.recordset);
  } catch (e) {
    res.status(404);
    res.send(e.message);
  }
};
export const sendFileEmail = async(req, res) =>{
  const { file, email, payRollConsecutive } = req.body;
  try {
    let mailFormat = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Reporte De Montos Totales',
      html: emailPDFTotalsReport(payRollConsecutive),
      attachments: [
        {
            filename: 'Reporte.pdf',
            path: file,
            contentType: 'application/pdf',
            encoding: 'base64'  
        }
    ]
    };
    await sendEmail( mailFormat );
    res.status(200).send('ok');
    console.log( 'Se envio correctamente' );
  } catch ( e ){
    console.log( e );
  }
}

import { getConnection } from '../database';
import { projectQueries } from '../database/queries/projectQueries';

export const getTypeOfContracts = async ( req, res ) => {
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .query( projectQueries.getAllContracts );
    res.json( result.recordset );
  } catch ( e ) {
    console.log( e );
  }
};
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, React, useState } from 'react';
import { getAnEntity } from '../../Utils/getAnEntity';
import { useSelector } from 'react-redux';
import { IconContext } from 'react-icons';
import { MdOutlinePictureAsPdf } from 'react-icons/md';

export const ViewPayroll = () => {
  const [ infoReceived, setInfoReceived ] = useState( false );
  const user = useSelector( ( state ) => state.user.user );
  const activeProject = useSelector( ( state ) => state.activeProject.projectName );
  const [ data, setData ] = useState();
  const navigate = useNavigate();
  const goToDetails = ( element ) => {
    navigate( '/payroll/details', { state: element } );
  };
  const removeTimeFromDate = ( date ) => {
    let myDate = new Date( date );
    let noTimeDate = new Date( myDate.getFullYear(), myDate.getMonth(), myDate.getDate() );
    return noTimeDate.toDateString();
  };
  const handlePayment = async () => {
    const seleUrl = process.env.REACT_APP_BACKEND_LOCALHOST + 'createPayrroll';
    console.log( user.Cedula, activeProject );
    const postFetch = await fetch( seleUrl, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify( {
        Cedula: user.Cedula,
        NombreProyecto: activeProject,
      } ),
    } );
    if ( postFetch.ok === true ) {
      setInfoReceived( false );
    }
  };

  const handleReport = ( element ) =>{
    navigate( '/payroll/report', { state: element } );
  };

  useEffect( () => {
    const getData = async () => {
      const newData = await getAnEntity( 'payrrolls/', activeProject );
      setData( newData );
      setInfoReceived( true );
    };
    getData();
  }, [ infoReceived ] );
  return !infoReceived ? <div className='loader' ></div > : (
    <>
      <h2 className='navigate-title'>{activeProject} Payrolls</h2>
      <div className='table-button'>
        <button className='create-button' onClick={handlePayment}>Pay Payroll</button>
      </div>
      <table className='Table'>
        <thead>
          <tr className='table-header'>
            <th className='table-left-border'>#</th>
            <th className=''>Start Date</th>
            <th className=''>End Date</th>
            <th className=''>Status</th>
            <th className=''>Employees Payslips</th>
            <th className='table-right-border'>Generate Report</th>
          </tr>
        </thead>
        <tbody>
          {data.slice( 0 ).reverse().map( ( element ) => (
            <tr key={element.Consectivo}>
              <td className='table-left-border'>{element.Consectivo}</td>
              <td className=''>{removeTimeFromDate( element.FechaIncio )}</td>
              <td className=''>{removeTimeFromDate( element.FechaFin )}</td>
              <td className=''>
                Closed</td>
              <td className=''>
                <button className='details-button' onClick={() => {
                  goToDetails( element );
                }}>Details</button>
              </td>
              <td className="table-right-border">
                  <button className="report-button" onClick={() => {handleReport( element );}}>
                    View
                  </button>
                
              </td>
            </tr>
          ) )}
        </tbody>
      </table>
      <label className='Empty-message'>{( data.length === 0 ) ? 'No Payrolls made yet' : ''}</label>
    </>
  );
};

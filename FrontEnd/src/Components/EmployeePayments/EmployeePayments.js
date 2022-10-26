import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import '../../App.css';
import { getAnEntity } from '../../Utils/getAnEntity';
import { removeTimeFromDate } from '../../shared/removeTimeFromDate';
import { useNavigate } from 'react-router-dom';

export const EmployeePayments = () => {
  const activeProject = useSelector( ( state ) => state.activeProject.projectName );
  const employeeEmail = useSelector( ( state ) => state.user.user.Email );
  const navigate = useNavigate();
  const [ employeePayments, setEmployeePayments ] = useState( [] );
  const [ isLoading, setIsLoading ] = useState( true );
  
  let formatter = new Intl.NumberFormat( 'en-US', {
    style: 'currency',
    currency: 'CRC',
  } );
  const handleGenerateReport = (element)=>{
    navigate('reports/payslipReport', { state: element });
  }

  useEffect( () => {
    setIsLoading( true );
    const getEmployeeInfo = async () => {

      const infoReceived = await getAnEntity( 'employeePayments', `/${activeProject}/${employeeEmail}` );
      if ( infoReceived === undefined ) {
        setEmployeePayments( [] );
      } else {
        setEmployeePayments( infoReceived );
        console.log( infoReceived );
      }
      setIsLoading( false );
    };
    getEmployeeInfo();
  }, [ activeProject, employeeEmail ] );

  return ( isLoading ? <div className='loader' ></div > :
    <>
      <h2 className='navigate-title'>My {activeProject} Payments</h2>
      <table className='Table'>
        <thead>
          <tr className='table-header'>
            <th className='left-td table-left-border'> Payment Id </th>
            <th className='right-td'>Contract Type</th>
            <th className='right-td'>Payment Date</th>
            <th className='right-td'>Hours Worked</th>
            <th className='right-td'>Hourly Wage</th>
            <th className='right-td'>Gross Salary</th>
            <th className='right-td'>Mandatory Deductions</th>
            <th className='right-td'>Voluntary Deductions</th>
            <th className='right-td'>Net Salary</th>
            <th className='table-right-border '>Report</th>
          </tr>
        </thead>
        <tbody>
          {employeePayments.slice( 0 ).reverse().map( ( row ) => (
            <tr key={row.ConsecutivoPago}>
              <td className='left-td table-left-border'>{row.ConsecutivoPago}</td>
              <td className='right-td'>{row.TipoContrato}</td>
              <td className='right-td'>{removeTimeFromDate( row.FechaFin )}</td>
              <td className='right-td'>{row.TipoContrato === 'Por Horas' ? row.SalarioBruto / row.SalarioPorHoras : '-'}</td>
              <td className='right-td'>{row.TipoContrato === 'Por Horas' ? formatter.format( row.SalarioPorHoras ) : '-'}</td>
              <td className='right-td'>{formatter.format( row.SalarioBruto )}</td>
              <td className='right-td'>{row.TipoContrato === 'Servicios Profesionales' ? '-' : formatter.format( row.MontoTotalDeduccionesObligatoriasEmpleado )}</td>
              <td className='right-td'>{row.TipoContrato === 'Servicios Profesionales' ? '-' : formatter.format( row.MontoTotalDeduccionesVoluntarias )}</td>
              <td className='right-td'>{formatter.format( row.SalarioNeto )}</td>
              <td className=''>
                <button className='emp-pay-button' onClick={() => handleGenerateReport(row)}> View</button>
              </td>
            </tr>
          ) )}
        </tbody>
      </table>
      <label className='Empty-message'>{( employeePayments.length === 0 ) ? 'No Payments made to me yet' : ''}</label>
    </>
  );
};

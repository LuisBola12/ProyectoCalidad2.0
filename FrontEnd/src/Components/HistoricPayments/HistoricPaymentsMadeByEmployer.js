import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import '../../App.css';
import { useProjectsData } from '../../Utils/PayrollProjects/useProjectsData';
import { IconContext } from 'react-icons';
import { FaFilter } from 'react-icons/fa';
import { DateRangeSelect } from '../DateRangeSelect/DateRangeSelect';
import { addDays } from 'date-fns';
import { Pagination } from '../Pagination/Pagination';
import { ExportToExcelButton } from '../ExportToExcelButton/ExportToExcelButton';

export const HistoricPaymentsMadeByEmployer = () => {
  const seleUrl = process.env.REACT_APP_BACKEND_LOCALHOST;

  const [ employerPayments, setEmployerPayments ] = useState( [] );
  const [ isLoading, setIsLoading ] = useState( true );
  const [ projectNameFilter, setProjectNameFilter ] = useState( 'Any' );
  const [ contractTypeFilter, setContractTypeFilter ] = useState( 'Any' );
  const [ idFilter, setIdFilter ] = useState( 'Any' );
  const [ filterSwitch, setFilterSwitch ] = useState( false );
  const [ pageNumber, setPageNumber ] = useState( 1 );
  const [ contractTypes, setContractTypes ] = useState( [] );
  const [ employeesIDs, setEmployeesIDs ] = useState( [] );
  const [ firstRender, setFirstRender ] = useState( true );
  const perPage = 10;
  const employerID = useSelector( ( state ) => state.user.user.Cedula );

  const [ range, setRange ] = useState( [
    {
      startDate: addDays( new Date(), -60 ),
      endDate: addDays( new Date(), 1 ),
      key: 'selection'
    }
  ] );
  const { projects } = useProjectsData();

  let formatter = new Intl.NumberFormat( 'en-US', {
    style: 'currency',
    currency: 'CRC',
  } );

  useEffect( () => {
    setIsLoading( true );
    const getEmployeeInfo = async () => {
      const infoReceived = await fetch(
        `${seleUrl}payments/${employerID}/${projectNameFilter}/${range[0].startDate}/${range[0].endDate}/${idFilter}/${contractTypeFilter}` );
      const payments = await infoReceived.json();
      if ( payments === undefined ) {
        setEmployerPayments( [] );
      } else {
        if ( firstRender ) {
          const contractTypesReceived = [];
          const idsReceived = [];
          for ( let paymentIndex = 0; paymentIndex < payments.length; paymentIndex++ ) {
            if ( !idsReceived.includes( payments[paymentIndex].CedulaEmpleado ) ) {
              idsReceived.push( payments[paymentIndex].CedulaEmpleado );
            }
            if ( !contractTypesReceived.includes( payments[paymentIndex].TipoContrato ) ) {
              contractTypesReceived.push( payments[paymentIndex].TipoContrato );
            }
            setContractTypes( contractTypesReceived );
            setEmployeesIDs( idsReceived );

          }
          setFirstRender( false );
        }


        setEmployerPayments( payments );
        console.log( payments );
      }
      setIsLoading( false );
    };
    getEmployeeInfo();
  }, [ projectNameFilter, filterSwitch, idFilter, contractTypeFilter ] );


  const maxPage = Math.ceil( employerPayments.length / perPage );

  return ( isLoading ? <div className='loader' ></div > :
    <>
      <h2 className='navigate-title'>Payments Per Employee</h2>
      <div className='report-header'>
        <div className='filter-payments-report'>
          <IconContext.Provider
            value={{
              className: 'filter-icon',
            }}
          >
            <label>
              <FaFilter />
            </label>
          </IconContext.Provider>
          <label>By Project Name</label>
          <select
            className='project-Name-Filter'
            value={projectNameFilter}
            onChange={( e ) => {
              setProjectNameFilter( e.target.value );
            }}
          >
            <option value={'Any'}> Any </option>
            {projects.map( ( element ) => (
              <option key={element.Nombre} value={element.Nombre}>
                {element.Nombre}
              </option>
            ) )
            }
          </select>

          <br />
          <label>By Contract Type</label>
          <select
            className='project-Name-Filter'
            value={contractTypeFilter}
            onChange={( e ) => {
              setContractTypeFilter( e.target.value );
            }}
          >
            <option value={'Any'}> Any </option>
            {contractTypes.map( ( element ) => (
              <option key={element} value={element}>
                {element}
              </option>
            ) )
            }
          </select>

          <br />
          <label>By Employee ID</label>
          <select
            className='project-Name-Filter'
            value={idFilter}
            onChange={( e ) => {
              setIdFilter( e.target.value );
            }}
          >
            <option value={'Any'}> Any </option>
            {employeesIDs.map( ( element ) => (
              <option key={element} value={element}>
                {element}
              </option>
            ) )
            }
          </select>
          <br />

          <label>By Date</label>
          <DateRangeSelect
            range={range}
            setRange={setRange}
            filterSwitch={filterSwitch}
            setFilterSwitch={setFilterSwitch}
          />


        </div>

        <ExportToExcelButton
          objectsArray={employerPayments}
          sheetName={'myPayments'}
          fileName={'myPaymentsReport'}
        />
      </div>

      <table className='Table' id='EmployeePaymentsTable'>
        <thead>
          <tr className='table-header'>
            <th className='left-td table-left-border'>Name</th>
            <th className='right-td'>Proyect</th>
            <th className='right-td'>ID</th>
            <th className='right-td'>Contract Type</th>
            <th className='right-td'>Gross Salary</th>
            <th className='right-td'>Benefits</th>
            <th className='right-td'>Employer Obligatory Deductions</th>
            <th className='right-td'>Employee Obligatory Deductions</th>
            <th className='right-td'>VoluntaryDeductions</th>
            <th className='table-right-border right-td'>Employer Cost</th>
          </tr>
        </thead>
        <tbody>
          {employerPayments.slice( ( pageNumber - 1 ) * perPage, ( pageNumber - 1 ) * perPage + perPage ).reverse().map( ( row ) => (
            <tr key={row.ConsecutivoPago}>
              <td className='left-td table-left-border'>{row.Nombre + ' ' + row.Apellido1 + ' ' + row.Apellido2}</td>
              <td className='right-td'>{row.NombreProyecto}</td>
              <td className='right-td'>{row.CedulaEmpleado}</td>
              <td className='right-td'>{row.TipoContrato}</td>
              <td className='right-td'>{formatter.format( row.SalarioBruto )}</td>
              <td className='right-td'>{formatter.format( row.MontoTotalBeneficios )}</td>
              <td className='right-td'>{formatter.format( row.MontoTotalDeduccionesObligatoriasEmpleador )}</td>
              <td className='right-td'>{formatter.format( row.MontoTotalDeduccionesObligatoriasEmpleado )}</td>
              <td className='right-td'>{formatter.format( row.MontoTotalDeduccionesVoluntarias )}</td>
              <td className='right-td'>{formatter.format( row.SalarioBruto + row.MontoTotalDeduccionesObligatoriasEmpleador )}</td>
            </tr>
          ) )}
        </tbody>
      </table>
      <label className='Empty-message'>{( employerPayments.length === 0 ) ? 'No Payments made to me yet' : ''}</label>

      <Pagination
        page={pageNumber}
        setPage={setPageNumber}
        maxPage={maxPage}
      />

    </>
  );
};

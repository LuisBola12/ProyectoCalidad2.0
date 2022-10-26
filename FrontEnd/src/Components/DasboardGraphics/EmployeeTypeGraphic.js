import { React, useState, useEffect } from 'react';
import { PieChart } from '../Plots/PieChart.js';
import { useSelector } from 'react-redux';

export const EmployeeTypeGraphic = () => {
  const user = useSelector( ( state ) => state.user.user );
  const activeProject = useSelector( ( state ) => state.activeProject.projectName );
  const [ infoReceived, setInfoReceived ] = useState( false );
  const [ benefitsLables, setBenefitsLables ] = useState( [] );
  const [ benefitsData, setBenefitsData ] = useState( [] );
  const url = process.env.REACT_APP_BACKEND_LOCALHOST + 'countEmployeeTypes/' + user.Cedula + '/' + activeProject;

  useEffect( () => {
    try {
      const getStatistics = async () => {
        console.log( url );
        const infoReceived = await fetch( url );
        console.log(  infoReceived );
        const data = await infoReceived.json();
        if ( data ) {
          let labels = [];
          let dataValues = [];
          data.forEach( ( element ) => {
            labels.push( element.ContractType );
            dataValues.push( element.EmployeeCount );
          } );
          setBenefitsLables( labels );
          setBenefitsData( dataValues );
          setInfoReceived( true );
        }
      };
      getStatistics();
    }
    catch ( e ){
      console.log( e );
    }
  }, [] );

  return !infoReceived ? <div className='loader' ></div > : (
    <div className='benefit-graphic-container'>
      <h3>Contract Type Variety on Project</h3>
      {benefitsLables.length > 0 && benefitsData.length > 0 ? 
        <PieChart
          dataLabels={benefitsLables}
          dataValues= {benefitsData}
        />
        : <>
          <label className='Empty-message' style={{ marginTop: 'auto' }}>No Employees Added</label>
        </>
      
      }
    </div>    
    
  );
};

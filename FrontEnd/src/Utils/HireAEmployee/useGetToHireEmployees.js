import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getEmployeesToHire } from './getEmployeesWithOtherContratcs';
export const useGetEmployeesToHire = () => {
  const activeProject = useSelector( ( state ) => state.activeProject.projectName );
  const userEmail = useSelector( ( state ) => state.user.user.Email );
  const [ employeesToHire, setEmployeesToHire ] = useState( [ {} ] );
  const [ infoReceived, setInfoReceived ] = useState( false );

  useEffect( () => {
    const getEmployeesWithContratc = async() =>{
      setEmployeesToHire( await getEmployeesToHire( activeProject,userEmail ) );
      if ( employeesToHire ){
        setInfoReceived( true );
      }
    };
    getEmployeesWithContratc();
  }, [] );
  return {
    employeesToHire, infoReceived
  };
};

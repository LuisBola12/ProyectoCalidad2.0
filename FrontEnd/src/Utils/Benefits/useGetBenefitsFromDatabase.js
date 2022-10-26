import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getAnEntity } from '../getAnEntity';

export const useGetBenefitsFromDatabase = () => {
  const activeProject = useSelector( ( state ) => state.activeProject.projectName );
  const employerId = useSelector( ( state ) => state.user.user.Cedula );
  const [ projectBenefits, setProjectBenefits ] = useState( [ {} ] );
  const [ infoReceived, setInfoReceived ] = useState( false );
  useEffect( () => {
    const getBenefits = async () => {
      setProjectBenefits( await getAnEntity( 'benefits/', activeProject + '/' + employerId ) );
      setInfoReceived( true );
    };
    getBenefits();
  }, [ infoReceived ] );
  return {
    projectBenefits, infoReceived, setInfoReceived
  };
};

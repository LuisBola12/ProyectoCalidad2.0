import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getAnEntity } from '../getAnEntity';

export const useGetVoluntaryDeductionsFromDatabase = () => {
  const activeProject = useSelector((state) => state.activeProject.projectName);
  const employerId = useSelector((state) => state.user.user.Cedula);
  const [projectVoluntaryDeductions, setProjectVoluntaryDeductions] = useState([{}]);

  const [infoReceived, setInfoReceived] = useState(false);
  useEffect(() => {
    const getVoluntaryDeductions = async () => {
      setProjectVoluntaryDeductions(await getAnEntity('voluntaryDeductions/', activeProject + '/' + employerId));
      setInfoReceived(true);
    };
    getVoluntaryDeductions();
  }, [infoReceived]);
  return {
    projectVoluntaryDeductions, infoReceived, setInfoReceived
  };
};

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getAnEntity } from '../getAnEntity';


export const useGetOfferedVoluntaryDeductions = () => {
  const activeProject = useSelector((state) => state.activeProject.projectName);
  const employeeEmail = useSelector((state) => state.user.user.Email);
  const [offeredVoluntaryDeductions, setOfferedVoluntaryDeductions] = useState([{}]);
  const [offeredInfo, setofferedInfo] = useState(false);
  useEffect(() => {
    const api = activeProject + '/' + employeeEmail;
    const getVoluntaryDeductions = async () => {
      setOfferedVoluntaryDeductions(await getAnEntity('offeredVoluntaryDeductions/', api));
      setofferedInfo(true);
    };
    getVoluntaryDeductions();
  }, [offeredInfo]);
  return {
    offeredVoluntaryDeductions, offeredInfo, setofferedInfo
  };
};


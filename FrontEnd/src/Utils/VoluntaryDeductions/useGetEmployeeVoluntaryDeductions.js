import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getAnEntity } from '../getAnEntity';

export const useGetEmployeeVoluntaryDeductions = () => {
  const activeProject = useSelector((state) => state.activeProject.projectName);
  const employeeEmail = useSelector((state) => state.user.user.Email);
  const [EmployeeVoluntaryDeductions, setEmployeeVoluntaryDeductions] = useState([{}]);
  const [EmployeeInfo, setEmployeeInfo] = useState(false);
  useEffect(() => {
    const api = activeProject + '/' + employeeEmail;
    const getVoluntaryDeductions = async () => {
      setEmployeeVoluntaryDeductions(await getAnEntity('myVoluntaryDeductions/', api));
      setEmployeeInfo(true);
    };
    getVoluntaryDeductions();
  }, [EmployeeInfo]);
  return {
    EmployeeVoluntaryDeductions, EmployeeInfo, setEmployeeInfo
  };
};

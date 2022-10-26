import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getAnEntity } from '../getAnEntity';

export const useGetEmployeeBenefits = () => {
  const activeProject = useSelector((state) => state.activeProject.projectName);
  const employeeEmail = useSelector((state) => state.user.user.Email);
  const [EmployeeBenefits, setEmployeeBenefits] = useState([{}]);
  const [EmployeeInfo, setEmployeeInfo] = useState(false);
  useEffect(() => {
    const api = activeProject + '/' + employeeEmail;
    const getBenefits = async () => {
      setEmployeeBenefits(await getAnEntity('myBenefits/', api));
      setEmployeeInfo(true);
    };
    getBenefits();
  }, [EmployeeInfo]);
  return {
    EmployeeBenefits, EmployeeInfo, setEmployeeInfo
  };
};

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getAnEntity } from '../getAnEntity';


export const useGetOfferedBenefits = () => {
  const activeProject = useSelector((state) => state.activeProject.projectName);
  const employeeEmail = useSelector((state) => state.user.user.Email);
  const [offeredBenefits, setOfferedBenefits] = useState([{}]);
  const [offeredInfo, setofferedInfo] = useState(false);
  useEffect(() => {
    const api = activeProject + '/' + employeeEmail;
    const getBenefits = async () => {
      setOfferedBenefits(await getAnEntity('offeredBenefits/', api));
      setofferedInfo(true);
    };
    getBenefits();
  }, [offeredInfo]);
  return {
    offeredBenefits, offeredInfo, setofferedInfo
  };
};


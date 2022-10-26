export const getPeriodOfAPorject = async( projectName ) => {
  const url = process.env.REACT_APP_BACKEND_LOCALHOST + 'getPeriodOfAProjectToReport/' + projectName;
  try{
    const result = await fetch(url);
    const newData = await result.json();
    return newData;
  }catch(error){
    console.log(error);
    return false;
  }
}

export const getTotalSalaryCost = async(payrollConsecutive, projectName) => {
  const url = process.env.REACT_APP_BACKEND_LOCALHOST + 'getTotalSalaryCost/' + payrollConsecutive + '/' + projectName;
  try{
    const result = await fetch(url);
    const newData = await result.json();
    return newData;
  }catch(error){
    console.log(error);
    return false;
  }
}

export const getTotalBenefitsCost = async(payrollConsecutive) => {
  const url = process.env.REACT_APP_BACKEND_LOCALHOST + 'totalBenefitsReport/' + payrollConsecutive;
  try{
    const result = await fetch(url);
    const newData = await result.json();
    return newData;
  }catch(error){
    console.log(error);
    return false;
  }
}

export const getTotalObligatoryDeductionsCost = async(payrollConsecutive) => {
  const url = process.env.REACT_APP_BACKEND_LOCALHOST + 'totalObligatoryDeductionsReport/' + payrollConsecutive;
  try{
    const result = await fetch(url);
    const newData = await result.json();
    return newData;
  }catch(error){
    console.log(error);
    return false;
  }
}

export const getVoluntaryDeductionsStatistics = async( EmployerID, activeProject ) => {
  const url = process.env.REACT_APP_BACKEND_LOCALHOST + 'voluntaryDeductionsStatistics/' + EmployerID + `/${activeProject}`;
  try{
    const result = await fetch(url);
    const newData = await result.json();
    return newData;
  }catch(error){
    console.log(error);
    return false;
  }
}
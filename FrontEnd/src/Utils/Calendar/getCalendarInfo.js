export const getHoursEmployer = async( id, projectName ) => {
  const url = process.env.REACT_APP_BACKEND_LOCALHOST + 'getHours/' + id + '/' + projectName;
  try{
    const result = await fetch(url);
    const newData = await result.json();
    return newData;
  }catch(error){
    console.log(error);
    return false;
  }
}

export const getPayrrollPayslips = async ( activeProject, payrrollNumber ) => {
  const url = process.env.REACT_APP_BACKEND_LOCALHOST + 'payslipsOfaProject';
  const result = await fetch( url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify( {
      Proyecto: activeProject,
      ConsecutivoPlanilla: payrrollNumber
    } ),
  } );
  const newData = await result.json();
  return newData;
};
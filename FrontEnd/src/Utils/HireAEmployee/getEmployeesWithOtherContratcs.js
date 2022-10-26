export const getEmployeesToHire = async ( activeProject, userEmail ) => {
  const otherContractsUrl = process.env.REACT_APP_BACKEND_LOCALHOST + 'employeesWithContractsOnOtherProyects';
  try {
    console.log( activeProject, userEmail );
    const result = await fetch( otherContractsUrl, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify( {
        Email: userEmail,
        Proyecto: activeProject,
      } ),
    } );
    const resultJson = await result.json();
    return resultJson;
  } catch ( error ) {
    console.log( error );
  }
};

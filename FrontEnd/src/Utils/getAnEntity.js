export const getAnEntity = async ( url, project ) => {
  const seleUrl = process.env.REACT_APP_BACKEND_LOCALHOST + `${url}${project}`;
  try {
    const response = await fetch( seleUrl );
    const newData = await response.json();
    return newData;
  } catch ( error ) {
    console.log( error );
  }
};
export const validAnEntity = async ( url, entity ) => {
  const seleUrl = process.env.REACT_APP_BACKEND_LOCALHOST + `${url}${entity}`;
  try {
    const response = await fetch( seleUrl );
    const newData = await response.json();
    if ( newData.length === 1 ) {
      return false;
    } else {
      return true;
    }
  } catch ( error ) {
    console.log( error );
  }
};
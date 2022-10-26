export const putVerificationUser = async( Email ) => {
  const url = process.env.REACT_APP_BACKEND_LOCALHOST + 'verificationEmail';
  try{
    const result = await fetch( url, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify( {
        Email: Email,
      } ),
    } );
    return result;
  }catch(error){
    console.log(error);
    return false;
  }
}
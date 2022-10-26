import { useSelector } from 'react-redux';
export const usePutEditUser = () => {
  const user = useSelector( ( state ) => state.user.user );
  const updateEmployee = async ( formValues ) => {
    const apiEmployee = process.env.REACT_APP_BACKEND_LOCALHOST + 'updateEmployee';
    let string = JSON.stringify( formValues );
    string = JSON.stringify( {
      Email: formValues.email,
      Nombre: formValues.name,
      Apellido1: formValues.lastname,
      Apellido2: formValues.secondlastname,
      Cedula: formValues.id,
      Telefono: formValues.phoneNumber,
      EmailViejo: user.Email,
    } );
    const result = await fetch( apiEmployee, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: string
    } );
    console.log( result );
    return true;
  };
  const updateEmployeer = async ( formValues ) => {
    const apiEmployeer = process.env.REACT_APP_BACKEND_LOCALHOST + 'updateEmployeer';
    let string = JSON.stringify( formValues );
    string = JSON.stringify( {
      Email: formValues.email,
      Nombre: formValues.name,
      Apellido1: formValues.lastname,
      Apellido2: formValues.secondlastname,
      Cedula: formValues.id,
      Telefono: formValues.phoneNumber,
      EmailViejo: user.Email,
    } );
    const result = await fetch( apiEmployeer, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: string
    } );
    console.log( result );
    return true;
  };
  return {
    updateEmployee, updateEmployeer
  };
};

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getAnEntity } from '../getAnEntity';

export const useGetProfileData = ( formValues,setUserId,setFormValuesCopy ) => {
  const user = useSelector( ( state ) => state.user.user );
  const setFormValues = ( userInfo ) =>{
    formValues.name = userInfo[0].Nombre;
    formValues.lastname = userInfo[0].Apellido1;
    formValues.secondlastname = userInfo[0].Apellido2;
    formValues.id = userInfo[0].Cedula;
    formValues.email = userInfo[0].Email;
    formValues.phoneNumber = userInfo[0].Telefono;
    setUserId( `${userInfo[0].Nombre[0]}${userInfo[0].Apellido1[0]}` );
    setFormValuesCopy( Object.assign( {}, formValues ) );
  };
  const [ infoReceived, setInfoReceived ] = useState( false );
  useEffect( () => {
    const getUserProfile = async () => {
      if ( user.Roles === 'admin' ){
        setFormValues( await getAnEntity( 'profileEmployeer/', user.Email ),setUserId );
      } else {
        setFormValues( await getAnEntity( 'profileEmployee/',user.Email ),setUserId );
      }
      setInfoReceived( true );
    };
    getUserProfile();
  }, [] );
  return {
    infoReceived,
  };
};

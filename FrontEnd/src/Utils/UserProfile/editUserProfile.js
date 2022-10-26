import { validateEmail, validateName } from './../../Validate';

export const removeNoEdit = () => {
  document.getElementById( 'name' ).removeAttribute( 'disabled' );
  document.getElementById( 'lastname' ).removeAttribute( 'disabled' );
  document.getElementById( 'secondlastname' ).removeAttribute( 'disabled' );
  document.getElementById( 'email' ).removeAttribute( 'disabled' );
  document.getElementById( 'phoneNumber' ).removeAttribute( 'disabled' );
  document.getElementById( 'name' ).removeAttribute( 'readOnly' );
  document.getElementById( 'lastname' ).removeAttribute( 'readOnly' );
  document.getElementById( 'secondlastname' ).removeAttribute( 'readOnly' );
  document.getElementById( 'email' ).removeAttribute( 'readOnly' );
  document.getElementById( 'phoneNumber' ).removeAttribute( 'readOnly' );
  document.getElementById( 'user-profile-buttons-div' ).style.display = 'flex';
  document.getElementById( 'name' ).style.border = 'solid 1px black';
  document.getElementById( 'lastname' ).style.border = 'solid 1px black';
  document.getElementById( 'secondlastname' ).style.border = 'solid 1px black';
  document.getElementById( 'email' ).style.border = 'solid 1px black';
  document.getElementById( 'phoneNumber' ).style.border = 'solid 1px black';
};

export const applyNoEdit = () => {
  document.getElementById( 'name' ).setAttribute( 'disabled','true' );
  document.getElementById( 'lastname' ).setAttribute( 'disabled','true' );
  document.getElementById( 'secondlastname' ).setAttribute( 'disabled','true' );
  document.getElementById( 'email' ).setAttribute( 'disabled','true' );
  document.getElementById( 'phoneNumber' ).setAttribute( 'disabled','true' );
  document.getElementById( 'name' ).setAttribute( 'readOnly','true' );
  document.getElementById( 'lastname' ).setAttribute( 'readOnly','true' );
  document.getElementById( 'secondlastname' ).setAttribute( 'readOnly','true' );
  document.getElementById( 'email' ).setAttribute( 'readOnly','true' );
  document.getElementById( 'phoneNumber' ).setAttribute( 'readOnly','true' );
  document.getElementById( 'user-profile-buttons-div' ).style.display = 'none';
  document.getElementById( 'name' ).style.border = 'none';
  document.getElementById( 'lastname' ).style.border = 'none';
  document.getElementById( 'secondlastname' ).style.border = 'none';
  document.getElementById( 'email' ).style.border = 'none';
  document.getElementById( 'phoneNumber' ).style.border = 'none';
};
export const validateEditUserForm = ( data ) =>{
  let error = {};
  const { email,name,lastname,secondlastname } = data;
  console.log( data );
  if ( email ){
    if ( !validateEmail( email ) ){
      error.email = 'You must enter a valid format for an email.';
      document.getElementById( 'email' ).style.borderColor = 'red';
    } else {
      document.getElementById( 'email' ).style.borderColor = 'gray';
    }
  } else {
    error.email = 'Please enter an email.';
    document.getElementById( 'email' ).style.borderColor = 'red';
  }
  if ( name ){
    if ( !validateName( name ) ){
      error.name = 'Please enter a valid name.';
      document.getElementById( 'name' ).style.borderColor = 'red';
    } else {
      document.getElementById( 'name' ).style.borderColor = 'gray';
    }
  } else {
    error.name = 'Please enter a name.';
    document.getElementById( 'name' ).style.borderColor = 'red';
  }
  
  if ( lastname ){
    if ( !validateName( lastname ) ){
      error.lastname = 'Please enter a valid lastname.';
      document.getElementById( 'lastname' ).style.borderColor = 'red';
    } else {
      document.getElementById( 'lastname' ).style.borderColor = 'gray';
    }
  } else {
    error.lastname = 'Please enter a lastname.';
    document.getElementById( 'lastname' ).style.borderColor = 'red';
  }
  
  if ( secondlastname ){
    if ( !validateName( secondlastname ) ){
      error.secondlastname = 'Please enter valid a second last name.';
      document.getElementById( 'secondlastname' ).style.borderColor = 'red';
    } else {
      document.getElementById( 'secondlastname' ).style.borderColor = 'gray';
    }
  } else {
    error.secondlastname = 'Please enter a secondlastname.';
    document.getElementById( 'secondlastname' ).style.borderColor = 'red';
  }
  return error;
};

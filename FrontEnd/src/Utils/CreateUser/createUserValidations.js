import { validateEmail, validatePassword, validateName, validateId, validatePhoneNumber } from '../../Validate';

const validate = ( values ) => {
  let errors = {};
  if ( values.email_register ){
    if ( !validateEmail( values.email_register ) ){
      errors.email_register = 'You must enter a valid format for an email.';
      document.getElementById( 'email_register' ).style.borderColor = 'red';
    } else {
      document.getElementById( 'email_register' ).style.borderColor = 'gray';
    }
  } else {
    errors.email_register = 'Please enter an email.';
    document.getElementById( 'email_register' ).style.borderColor = 'red';
  }

  if ( values.password_register ){
    if ( !validatePassword( values.password_register ) ){
      errors.password_register = 'Password must be 8 characters long';
      document.getElementById( 'password_register' ).style.borderColor = 'red';
    } else {
      document.getElementById( 'password_register' ).style.borderColor = 'gray';
    }
  } else {
    errors.password_register = 'Please enter a password.';
    document.getElementById( 'password_register' ).style.borderColor = 'red';
  }

  if ( values.name_register ){
    if ( !validateName( values.name_register ) ){
      errors.name_register = 'Please enter a name.';
      document.getElementById( 'name_register' ).style.borderColor = 'red';
    } else {
      document.getElementById( 'name_register' ).style.borderColor = 'gray';
    }
  } else {
    errors.name_register = 'Please enter a name.';
    document.getElementById( 'name_register' ).style.borderColor = 'red';
  }
  
  if ( values.lastname1_register ){
    if ( !validateName( values.lastname1_register ) ){
      errors.lastname1_register = 'Please enter a first last name.';
      document.getElementById( 'lastname1_register' ).style.borderColor = 'red';
    } else {
      document.getElementById( 'lastname1_register' ).style.borderColor = 'gray';
    }
  } else {
    errors.lastname1_register = 'Please enter a first last name.';
    document.getElementById( 'lastname1_register' ).style.borderColor = 'red';
  }

  if ( values.lastname2_register ){
    if ( !validateName( values.lastname2_register ) ){
      errors.lastname2_register = 'Please enter a second last name.';
      document.getElementById( 'lastname2_register' ).style.borderColor = 'red';
    } else {
      document.getElementById( 'lastname2_register' ).style.borderColor = 'gray';
    }
  } else {
    errors.lastname2_register = 'Please enter a second last name.';
    document.getElementById( 'lastname2_register' ).style.borderColor = 'red';
  }

  if ( values.id_register ){
    if ( !validateId( values.id_register ) ){
      errors.id_register = 'Id must follow the Costa Rican format.';
      document.getElementById( 'id_register' ).style.borderColor = 'red';
    } else {
      document.getElementById( 'id_register' ).style.borderColor = 'gray';

    }
  } else {
    errors.id_register = 'Please enter an Id.';
    document.getElementById( 'id_register' ).style.borderColor = 'red';
  }

  if ( values.phoneNumber_register ){
    if ( !validatePhoneNumber( values.phoneNumber_register ) ){
      errors.phoneNumber_register = 'Phone Number must be: 00000000';
      document.getElementById( 'phoneNumber_register' ).style.borderColor = 'red';
    } else {
      document.getElementById( 'phoneNumber_register' ).style.borderColor = 'gray';

    }
  } else {
    document.getElementById( 'phoneNumber_register' ).style.borderColor = 'gray';
  }

  return errors;
};

export default validate;
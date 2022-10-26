export const validateEmail = ( email ) => {
  return String( email )
    .toLowerCase()
    .match(
      /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const validatePassword = ( password ) => {
  return String( password )
    .toLowerCase()
    .match(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    );
};

export const validateName = ( name ) =>{
  return String( name )
    .toLowerCase()
    .match(
      /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/
    );
};

export const validateId = ( id ) => {
  return String( id )
    .toLowerCase()
    .match(
      /^[1-9]-?\d{4}-?\d{4}$/
    );
};

export const validatePhoneNumber = ( phoneNumber ) => {
  return String( phoneNumber )
    .toLowerCase()
    .match(
      /^[1-9]{8}$/
    );
};

export const validateNumber = ( number ) => {
  return String( number )
    .toLowerCase()
    .match(
      /^[1-9]$/
    );
};

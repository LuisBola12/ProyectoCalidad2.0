export const hireContractForm = ( data ) => {
  let errors = {};
  const { contract, contractDeadline,serviceValue,hWage } = data;
  if ( contract ) {
    document.getElementById( 'error-contract-input' ).style.display = '';
    document.getElementById( 'contract' ).style.borderColor = 'gray';
  } else {
    errors.contract = 'Please select a type of Contract.';
    document.getElementById( 'contract' ).style.borderColor = 'red';
  }
  if ( contractDeadline ) {
    document.getElementById( 'error-contract-deadline-input' ).style.display = '';
    document.getElementById( 'contractDeadline' ).style.borderColor = 'gray';
  } else {
    errors.contractDeadline = 'Please enter a hired until date.';
    document.getElementById( 'contractDeadline' ).style.borderColor = 'red';
  }
  if ( contract ){
    if ( contract === 'Servicios Profesionales' ){
      if ( serviceValue ){
        if ( serviceValue < 0 ){
          errors.serviceValue = 'Service value must be a positive number.';
          document.getElementById( 'serviceValue' ).style.borderColor = 'red';
        } else {
          document.getElementById( 'error-contract-service-value-input' ).style.display = '';
          document.getElementById( 'serviceValue' ).style.borderColor = 'gray';
        }
      } else {
        errors.serviceValue = 'Please enter a service value.';
        document.getElementById( 'serviceValue' ).style.borderColor = 'red';
      }
    } else {
      if ( hWage ){
        if ( hWage < 0 ){
          errors.hWage = 'Hourly Wage must be a positive value.';
          document.getElementById( 'hWage' ).style.borderColor = 'red';
        } else {
          document.getElementById( 'error-contract-hWage-input' ).style.display = '';
          document.getElementById( 'serviceValue' ).style.borderColor = 'gray';
        }
      } else {
        errors.hWage = 'Please enter an hourly wage.';
        document.getElementById( 'hWage' ).style.borderColor = 'red';
      }
    }
  }
  return errors;
};

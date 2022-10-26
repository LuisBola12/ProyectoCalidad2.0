
const validate = ( values ) => {
  let errors = {};
  if ( !values.projectName ) {
    errors.projectName = 'Project Name Is Required';
    errors.projectNameErrorCss = 'borderRed';
  } 
  console.log( values.paymentPeriod );
  if ( !values.paymentPeriod || values.paymentperiod === '' ) {
    errors.paymentPeriod = 'Payment Period Required';
    errors.paymentPeriodErrorCss = 'borderRed';
    console.log( errors.paymentPeriod );
  }
  if ( !values.maxBenefitsQuantity ) {
    errors.maxBenefitsQuantity = 'Max Benefits Quantity Required';
    errors.maxBenefitsQuantityCss = 'borderRed';
  }
  if ( !values.maxBenefitsMoneyAmount ) {
    errors.maxBenefitsMoneyAmount = 'Max Money in Benefits Per employee';
    errors.maxBenefitsMoneyAmountECss = 'borderRed';
  }
  
  return errors;
};

export default validate;
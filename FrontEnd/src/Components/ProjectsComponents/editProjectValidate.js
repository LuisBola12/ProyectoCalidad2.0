
const validateEditProject =  ( values ) => {
  let errors = {};
  if ( !values.projectName ) {
    errors.projectName = 'Project Name Is Required';
    errors.projectNameErrorCss = 'editborderRed';
  }
  if ( !values.paymentPeriod || values.paymentperiod === '' ) {
    errors.paymentPeriod = 'Payment Period Required';
    errors.paymentPeriodErrorCss = 'editborderRed';
  }
  return errors;
};
export default validateEditProject;
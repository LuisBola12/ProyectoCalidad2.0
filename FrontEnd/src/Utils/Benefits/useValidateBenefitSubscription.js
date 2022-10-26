import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const launchInfoMessage = (title, icon, message, buttonColor) => {
  Swal.fire({
    icon: icon,
    title: title,
    text: message,
    confirmButtonColor: buttonColor,
  });

}



const useValidateBenefitSubscription = () => {
  const url = 'validateBenefit';
  const employeeEmail = useSelector((state) => state.user.user.Email);
  const activeProject = useSelector((state) => state.activeProject.projectName);


  const canSuscribe = async (benefitToValidateName) => {
    let errorMessageForUser = ``;
    const responseFromApi = await fetch(process.env.REACT_APP_BACKEND_LOCALHOST + `${url}/${activeProject}/${employeeEmail}/${benefitToValidateName}`)
    const validateInfo = await responseFromApi.json();
    console.log(validateInfo);

    if (responseFromApi.status === 500) {
      errorMessageForUser = 'Failed to connect, try again later';
      launchInfoMessage('Connection error', 'info', errorMessageForUser, 'darkgreen');
      return;
    }
    if (validateInfo.isValid) {
      launchInfoMessage('subscribed', 'success', `You subscribed to ${benefitToValidateName}`, 'darkgreen');
      return true;
    }
    else if (validateInfo.exceedsMoneyAmountLimit) {
      errorMessageForUser = `You have reached the maximum amount of money available for benefits.
      The maximum amount of benefits per employee is ${validateInfo.maxMoneyAmountAllowed}`;
    }
    if (validateInfo.exceedsBenefitsQtyLimit) {
      if (validateInfo.exceedsMoneyAmountLimit) {
        errorMessageForUser = errorMessageForUser + '. ';
      }
      errorMessageForUser = errorMessageForUser + `The maximum amount of benefits per employee is ${validateInfo.maxBenefitsQtyAllowed}`
    }

    launchInfoMessage('Error', 'error', errorMessageForUser, 'darkgreen');
    return false;
  }

  return {
    canSuscribe
  }
}

export default useValidateBenefitSubscription;
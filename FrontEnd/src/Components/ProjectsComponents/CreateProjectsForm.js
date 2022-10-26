import React from 'react';
import './createProject.scss';
import validate from './NewProjectValidationRules';
import useForm from '../../shared/hooks/useForm';
import { useNavigate } from 'react-router-dom';
import usePost from '../../shared/hooks/usePost';
import { useSelector } from 'react-redux';
import { validAnEntity } from '../../Utils/validAnEntity';
import Swal from 'sweetalert2';

export const CreateProjectsForm = () => {
  const navigate = useNavigate();
  const { post } = usePost(process.env.REACT_APP_BACKEND_LOCALHOST + 'projects');

  const emailFromUser = useSelector((state) => state.user.user.Email);

  const sendToDatabase = async () => {
    const hasUniqueName = await validAnEntity('myProjects/' + emailFromUser + '/', formValues.projectName);
    if (hasUniqueName === true) {
      let string = JSON.stringify(formValues);
      string = JSON.stringify({
        projectName: formValues.projectName,
        paymentPeriod: formValues.paymentPeriod,
        email: emailFromUser,
        description: formValues.description,
        maxBenefitsMoneyAmount: formValues.maxBenefitsMoneyAmount,
        maxBenefitsQuantity: formValues.maxBenefitsQuantity
      });
      post(string);
      navigate(-1);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error...',
        text: 'That project name already exists',
        confirmButtonColor: 'darkgreen',
      });
      setIsSubmitting(false);
    }
  };

  const { formValues, handleInputChange, handleSubmit, errors, setIsSubmitting } = useForm(sendToDatabase, validate);

  return (
    <>
      <div className='project-bar'>
        <div className='project-logo'></div>
        <div className='project-title'> Create New Project </div>
      </div>

      <form className='form'>
        <div className='row' >
          <div className='row-Element'>
            <input type='text' id='projectName' className={`row-Element__input ${errors.projectNameErrorCss}`} value={formValues.projectName || ''}
              onChange={handleInputChange} autoComplete='off' placeholder=' ' />
            <label htmlFor='projectName' className='row-Element__label'> Project Name <span className='req'>*</span></label>
            <p className='error' >{errors.projectName}</p>
          </div>
          <div className='row-Element'>
            <select id='paymentPeriod' className={`row-Element__dropDown ${errors.paymentPeriodErrorCss}`} onChange={handleInputChange} >
              <option value=''>Select Payment Period</option>
              <option value='Mensual'>Mensual</option>
              <option value='Quincenal'>Quincenal</option>
              <option value='Semanal'>Semanal</option>
            </select>
            <label htmlFor='paymentPeriod' className='row-Element__dropDown__label'> Payment Period <span className='req'>*</span></label>
            <p className='error' >{errors.paymentPeriod}</p>
          </div>
        </div>

        <div className='row' >
          <div className='row-Element'>
            <input type='number' id='maxBenefitsQuantity' className={`row-Element__input ${errors.maxBenefitsQuantityCss}`} value={formValues.maxBenefitsQuantity || ''}
              onChange={handleInputChange}
              autoComplete='off'
              placeholder=' ' />
            <label htmlFor='maxBenefitsQuantity' className='row-Element__label'> Max Benefits Quantity <span className='req'     >*</span></label>
            <p className='error'>{errors.maxBenefitsQuantity}</p>
          </div>

          <div className='row-Element'>
            <input type='number' id='maxBenefitsMoneyAmount' className={`row-Element__input ${errors.maxBenefitsQuantityCss}`} value={formValues.maxBenefitsMoneyAmount || ''}
              onChange={handleInputChange}
              autoComplete='off'
              placeholder=' ' />
            <label htmlFor='maxBenefitsMoneyAmount' className='row-Element__label'> Max Money On Benefits Per Employee <span className='req'>*</span></label>
            <p className='error'>{errors.maxBenefitsMoneyAmount}</p>
          </div>
        </div>
        <div className='row'>
          <div className='row-Element'>
            <textarea id='description' onChange={handleInputChange} className='row-Element__textArea' autoComplete='off' placeholder=' '></textarea>
            <label htmlFor='description' className='row-Element__label row-Element__textarea-label center'>Description</label>
            <p className='error deeper'>{errors.description}</p>
          </div>
        </div>
        <div className='row'>
          <div className='project-btn-box'>
            <button onClick={handleSubmit} className='project-btn-sumbit' >
              Create
            </button>
            <button className='project-btn-cancel' onClick={() => navigate('/')}  >
              Cancel
            </button>
          </div>
        </div>
      </form>
      <footer className='createProject-footerCopyRights'> &copy; SeleMiracleRun </footer>
    </>

  );
};

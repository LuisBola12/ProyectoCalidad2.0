import '../../App.css';
import './CreateBenefit.scss';
import React from 'react';
import { usePostToBenefits } from '../../Utils/Benefits/usePostToBenefits.js';
import { usePutToBenefits } from '../../Utils/Benefits/usePutToBenefits';
import { useNavigate } from 'react-router-dom';
import { maskCurrency } from '../../shared/moneyFormatTransform';
import validateBenefitForm from '../../Utils/Benefits/validateBenefitForm';
import useForm from '../../shared/hooks/useForm';
import { validAnEntity } from '../../Utils/validAnEntity';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

export const CreateBenefit = () => {
  const { submitBenefit } = usePostToBenefits();
  const { reactivateBenefit } = usePutToBenefits();
  const activeProject = useSelector( ( state ) => state.activeProject.projectName );
  const employerId = useSelector( ( state ) => state.user.user.Cedula );
  const navigate = useNavigate();

  const createNewBenefit = async ( notExists ) => {
    if ( notExists === true ) {
      submitBenefit( formValues.Name, formValues.Cost, formValues.Description );
      navigate( '/benefits' );
      Swal.fire( {
        title: 'Done!',
        text: `${formValues.Name} has been created successfully.`,
        icon: 'success',
        confirmButtonColor: 'darkgreen',
      } );
    } else {
      setIsSubmitting( false );
      Swal.fire( {
        icon: 'error',
        title: 'error...',
        text: 'That benefit already exists',
        confirmButtonColor: 'darkgreen',
      } );
    }
  };

  const submit = async () => {
    const notPreviouslyExists = await validAnEntity( 'benefits/' + activeProject + '/' + employerId + '/', formValues.Name + '*' );
    const notExists = await validAnEntity( 'benefits/' + activeProject + '/' + employerId + '/', formValues.Name );
    if ( notPreviouslyExists === false && notExists === true ) {
      Swal.fire( {
        title: 'That benefit existed before',
        text: 'you want to reactivate it?',
        icon: 'question',
        showCloseButton: true,
        showDenyButton: true,
        confirmButtonColor: '#133c54',
        denyButtonColor: 'gray',
        confirmButtonText: 'Reactivate',
        denyButtonText: 'Create a new one instead',
        cancelButtonText: 'X'
      } ).then( ( result ) => {
        if ( result.isConfirmed ) {
          // función de reactivar beneficio
          const reactivateApi = process.env.REACT_APP_BACKEND_LOCALHOST + `benefit/${formValues.Name + '*'}`;
          console.log( reactivateApi );
          reactivateBenefit( formValues.Name, reactivateApi );
          navigate( '/benefits' );
          Swal.fire( {
            title: 'Reactivated!',
            text: `The benefit ${formValues.Name} has been reactivated.`,
            icon: 'success',
            confirmButtonColor: 'darkgreen',
          } );
        } else if ( result.isDenied ){
          createNewBenefit( notExists );
        }
      } );
      
    } else {
      createNewBenefit( notExists );
    }
  };
  const { formValues, handleInputChange, handleSubmit, errors, setIsSubmitting } = useForm( submit, validateBenefitForm );
  return (
    <>
      <div className='benefits-form'>
        <div className='form-title'>
          <div className='image-benefit'></div>
          Create Benefit
        </div>
        <div className='form-group-benefits'>
          <div className='Name-input'>
            <div className='animated-input'>
              <input
                type='text'
                id='Name'
                className='animated-input__input'
                autoComplete='off'
                placeholder=' '
                maxLength={50}
                value={formValues.Name || ''}
                onChange={handleInputChange}
              ></input>
              <label htmlFor='Name' className='animated-input__label'>Name<span className='req'>*</span></label>
            </div>
            <label className='error-message' id='benefit-name'>{errors.Name}</label>
          </div>
          <div className='Cost-input'>
            <div className='animated-input'>
              <input
                type='text'
                id='Cost'
                className='animated-input__input'
                autoComplete='off'
                placeholder=' '
                maxLength={50}
                value={formValues.Cost || ''}
                onChange={( e ) => { handleInputChange( maskCurrency( e ) ); }}
              ></input>
              <label htmlFor='Cost' className='animated-input__label'>Cost ₡<span className='req'>*</span></label>
            </div>
            <label className='error-message' id='benefit-cost'>{errors.Cost}</label>
          </div>
        </div>
        <div>
          <div className='animated-input'>
            <textarea
              id='Description'
              className='animated-input__textarea'
              autoComplete='off' placeholder=' '
              maxLength={300}
              value={formValues.Description || ''}
              onChange={handleInputChange}
            ></textarea>
            <label htmlFor='Description' className='animated-input__label'>Description</label>
            <label className='error-message' id='benefit-description'></label>
          </div>
        </div>
        <div className='buttons'>
          <button
            className='create-benefit-btn'
            onClick={handleSubmit}>
            Create
          </button>
          <button
            className='cancel-benefit-btn'
            onClick={() => {
              navigate( '/benefits' );
            }}>
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

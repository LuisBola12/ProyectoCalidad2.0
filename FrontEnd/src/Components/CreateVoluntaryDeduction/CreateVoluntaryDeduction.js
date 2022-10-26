import React from 'react';
import '../../App.css';
import './CreateVoluntaryDeduction.scss';
import { usePostToVoluntaryDeductions } from '../../Utils/VoluntaryDeductions/usePostToVoluntaryDeductions';
import { usePutToVoluntaryDeductions } from '../../Utils/VoluntaryDeductions/usePutToVoluntaryDeductions';
import validateVoluntaryDeductionForm from '../../Utils/VoluntaryDeductions/validateVoluntaryDeductionForm';
import useForm from '../../shared/hooks/useForm';
import { useNavigate } from 'react-router-dom';
import { maskCurrency } from '../../shared/moneyFormatTransform';
import { validAnEntity } from '../../Utils/validAnEntity';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

export const CreateVoluntaryDeduction = () => {
  const { submitVoluntaryDeduction } = usePostToVoluntaryDeductions();
  const { reactivateVoluntaryDeduction } = usePutToVoluntaryDeductions();
  const activeProject = useSelector((state) => state.activeProject.projectName);
  const employerId = useSelector( ( state ) => state.user.user.Cedula );
  const navigate = useNavigate();

  const createNewVoluntaryDeduction = async (notExists) => {
    if ( notExists === true ) {
      submitVoluntaryDeduction( formValues.Name, formValues.Cost, formValues.Description );
      navigate( '/voluntaryDeductions' );
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
        text: 'That voluntary deduction already exists',
        confirmButtonColor: 'darkgreen',
      } );
    }
  };

  const submit = async () => {
    const notPreviouslyExists = await validAnEntity( 'voluntaryDeductions/' + activeProject + '/' + employerId + '/', formValues.Name + '*' );
    const notExists = await validAnEntity('voluntaryDeductions/' + activeProject + '/', formValues.Name);
    if (notPreviouslyExists === false && notExists === true) {
      Swal.fire( {
        title: 'That voluntary deduction existed before',
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
          // función de reactivar deduccion voluntaria
          const reactivateApi = process.env.REACT_APP_BACKEND_LOCALHOST + `voluntaryDeduction/${formValues.Name + '*'}`;
          console.log( reactivateApi );
          reactivateVoluntaryDeduction( formValues.Name, reactivateApi );
          navigate( '/voluntaryDeductions' );
          Swal.fire( {
            title: 'Reactivated!',
            text: `The voluntary deduction ${formValues.Name} has been reactivated.`,
            icon: 'success',
            confirmButtonColor: 'darkgreen',
          } );
        } else if ( result.isDenied ){
          createNewVoluntaryDeduction( notExists );
        }
      } );
    } else {
      createNewVoluntaryDeduction( notExists );
    }
  };

  const { formValues, handleInputChange, handleSubmit, errors, setIsSubmitting } = useForm(submit, validateVoluntaryDeductionForm);
  return (
    <>
      <div className='voluntaryDeductions-form'>
        <div className='form-title-voluntaryDeductions'>
          <div className='image-voluntaryDeduction'></div>
          Create Voluntary Deduction
        </div>
        <div className='form-group-voluntaryDeductions'>
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
                onChange={handleInputChange} />
              <label htmlFor='Name' className='animated-input__label'>Name<span className='req'>*</span></label>
            </div>
            <label className='error-message' > {errors.Name} </label>
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
                onChange={(e) => { handleInputChange(maskCurrency(e)); }} ></input>
              <label htmlFor='Cost' className='animated-input__label'>Cost<span className='req'>*</span></label>
            </div>
            <label className='error-message' > {errors.Cost} </label>
          </div>
        </div>
        <div className='animated-input'>
          <textarea
            type='text'
            id='Description'
            className='animated-input__textarea'
            autoComplete='off'
            placeholder=' '
            maxLength={300}
            value={formValues.Description || ''}
            onChange={handleInputChange} />
          <label htmlFor='Description' className='animated-input__label'>Description</label>
          <label className='error' > {errors.Description} </label>
        </div>
        <div className='buttons-voluntaryDeduction'>
          <button
            className='create-voluntaryDeduction-btn'
            onClick={handleSubmit}>
            Create
          </button>
          <button
            className='cancel-voluntaryDeduction-btn'
            onClick={() => { navigate('/voluntaryDeductions'); }}>
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

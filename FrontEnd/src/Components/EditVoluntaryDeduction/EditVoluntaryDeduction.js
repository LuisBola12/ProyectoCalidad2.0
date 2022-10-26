import React from 'react';
import '../../App.css';
import '../CreateVoluntaryDeduction/CreateVoluntaryDeduction.scss';
import { useNavigate } from 'react-router-dom';
import { maskCurrency } from '../../shared/moneyFormatTransform';
import validateVoluntaryDeductionForm from '../../Utils/VoluntaryDeductions/validateVoluntaryDeductionForm';
import useForm from '../../shared/hooks/useForm';
import { validAnEntity } from '../../Utils/validAnEntity';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { transformCost } from '../../shared/moneyFormatTransform';
import { usePutToVoluntaryDeductions } from '../../Utils/VoluntaryDeductions/usePutToVoluntaryDeductions';
import Swal from 'sweetalert2';

export const EditVoluntaryDeduction = () => {
  const apiVoluntaryDeductions = process.env.REACT_APP_BACKEND_LOCALHOST + 'voluntaryDeductions';
  const activeProject = useSelector((state) => state.activeProject.projectName);
  const location = useLocation();
  const oldName = location.state.Nombre;
  const employerId = useSelector((state) => state.user.user.Cedula);
  const navigate = useNavigate();
  const { updateVoluntaryDeduction } = usePutToVoluntaryDeductions();
  const submit = async () => {
    const notExists = await validAnEntity('voluntaryDeductions/' + activeProject + '/' + employerId + '/', formValues.Name);
    if (notExists === true || oldName === formValues.Name) {
      updateVoluntaryDeduction(formValues.Name, formValues.Cost, formValues.Description, apiVoluntaryDeductions + `/${oldName}`);
      navigate('/voluntaryDeductions');
    } else {
      setIsSubmitting(false);
      Swal.fire({
        icon: 'error',
        title: 'error...',
        text: 'That voluntary deduction already exists',
        confirmButtonColor: 'darkgreen',
      });
    }
  };
  const {
    formValues,
    handleInputChange,
    handleSubmit,
    errors,
    setIsSubmitting,
    setFormValues
  } = useForm(submit, validateVoluntaryDeductionForm);
  useEffect(() => {
    setFormValues({
      Name: location.state.Nombre,
      Cost: transformCost(location.state.Costo),
      Description: location.state.Descripcion
    });
  }, []);

  return (
    <>
      <div className='voluntaryDeductions-form'>
        <div className='form-title'>
          <div className='image-voluntaryDeduction'></div>
          Edit Deduction
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
                onChange={handleInputChange}
              ></input>
              <label htmlFor='Name' className='animated-input__label'>Name<span className='req'>*</span></label>
            </div>
            <label className='error-message' id='voluntaryDeduction-name'>{errors.Name}</label>
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
                onChange={(e) => { handleInputChange(maskCurrency(e)); }}
              ></input>
              <label htmlFor='Cost' className='animated-input__label'>Cost ₡<span className='req'>*</span></label>
            </div>
            <label className='error-message' id='voluntaryDeduction-cost'>{errors.Cost}</label>
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
            <label className='error-message' id='voluntaryDeduction-description'></label>
          </div>
        </div>
        <div className='buttons'>
          <button
            className='create-voluntaryDeduction-btn'
            onClick={handleSubmit}>
            Save
          </button>
          <button
            className='cancel-voluntaryDeduction-btn'
            onClick={() => {
              navigate('/voluntaryDeductions');
            }}>
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

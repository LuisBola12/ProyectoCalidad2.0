import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetErrorMsg } from '../../Slices/user/userSlice';
import { validAnEntity } from '../../Utils/validAnEntity';
import usePost from '../../shared/hooks/usePost';
import validate from '../../Utils/CreateUser/createUserValidations';
import useForm from '../../shared/hooks/useForm';
import './CreateUserStyle.scss';
import Swal from 'sweetalert2';

export const CreateUser = () => {
  const dispatch = useDispatch();
  const { post } = usePost(process.env.REACT_APP_BACKEND_LOCALHOST + 'createEmployer');

  const sendToDatabase = async () => {
    const user = await validAnEntity('users/', formValues.email_register);
    const employee = await validAnEntity('employer/', formValues.id_register);

    if (user === true && employee === true) {

      let string = JSON.stringify(formValues);
      string = JSON.stringify({
        Cedula: formValues.id_register,
        Nombre: formValues.name_register,
        Apellido1: formValues.lastname1_register,
        Apellido2: formValues.lastname2_register,
        Telefono: formValues.phoneNumber_register,
        Email: formValues.email_register,
        Contrasenia: formValues.password_register,
        Roles: 'admin'
      });
      await post(string);
      Swal.fire( {
        title: 'Account Created',
        text: `A verification email has been send.`,
        icon: 'success',
        confirmButtonColor: 'darkgreen',
      } )
      dispatch(resetErrorMsg());
      navigate('/');
    } else {
      setIsSubmitting(false);
      alert('These user alredy exists.');
    }
  };

  const { formValues, handleInputChange, handleSubmit, setIsSubmitting, errors } = useForm(sendToDatabase, validate);

  const navigate = useNavigate();
  const handleClick = () => {
    dispatch(resetErrorMsg());
    navigate('/');
  }

  return (
    <div>
      <div className='register-bar'>
        <div className='register-logo'></div>
        <div className='register-title'> Sign Up </div>
      </div>

      <div className='register-full-form'>
        <div className='register-form'>
          <div>
            <div className='register-animated-input-name'>
              <input
                type='text'
                id='name_register'
                className='register-animated-input-name__input'
                value={formValues.name_register || ''}
                maxLength={15}
                onChange={handleInputChange}
                autoComplete='off'
                placeholder=' ' />
              <label htmlFor='name_register' className='register-animated-input-name__label'> Name <span className='req'>*</span></label>
            </div>
            <div>
              <label className='register-error' id='register_error_name'>{errors.name_register}</label>
            </div>
          </div>

          <div>
            <div className='register-animated-input-name'>
              <input
                type='text'
                id='lastname1_register'
                className='register-animated-input-name__input'
                value={formValues.lastname1_register || ''}
                maxLength={15}
                onChange={handleInputChange}
                autoComplete='off'
                placeholder=' ' />
              <label htmlFor='lastname1_register' className='register-animated-input-name__label'>First Last Name<span className='req'>*</span></label>
            </div>
            <div>
              <label className='register-error' id='register_error_name'>{errors.lastname1_register} </label>
            </div>
          </div>

          <div>
            <div className='register-animated-input-name'>
              <input
                type='text'
                id='lastname2_register'
                className='register-animated-input-name__input'
                value={formValues.lastname2_register || ''}
                maxLength={15}
                onChange={handleInputChange}
                autoComplete='off'
                placeholder=' ' />
              <label htmlFor='lastname2_register' className='register-animated-input-name__label'>Second Last Name<span className='req'>*</span></label>
            </div>
            <div>
              <label className='register-error' id='register_error_lastname2'>{errors.lastname2_register}</label>
            </div>
          </div>
        </div>

        <div className='register-form'>
          <div>
            <div className='register-row'>
              <input
                type='text'
                id='id_register'
                className='register-row__input'
                value={formValues.id_register || ''}
                maxLength={15}
                onChange={handleInputChange}
                autoComplete='off'
                placeholder=' ' />
              <label htmlFor='id_register' className='register-row__label'>Id<span className='req'>*</span></label>
            </div>
            <div>
              <label className='register-error' id='register_error_ID'>{errors.id_register}</label>
            </div>
          </div>
          <div>
            <div className='register-row'>
              <input
                type='text'
                id='phoneNumber_register'
                className='register-row__input'
                value={formValues.phoneNumber_register || ''}
                maxLength={8}
                onChange={handleInputChange}
                autoComplete='off'
                placeholder=' ' />
              <label htmlFor='phoneNumber_register' className='register-row__label'>Phone Number</label>
            </div>
            <div>
              <label className='register-error' id='register_error_phoneNumber'>{errors.phoneNumber_register}</label>
            </div>
          </div>
        </div>

        <div className='register-form'>
          <div>
            <div className='register-row'>
              <input
                type='text'
                id='email_register'
                className='register-row__input'
                value={formValues.email_register || ''}
                maxLength={50}
                onChange={handleInputChange}
                autoComplete='off'
                placeholder=' ' />
              <label htmlFor='email_register' className='register-row__label'> Email <span className='req'>*</span> </label>
            </div>
            <div>
              <label className='register-error' id='register_error_email'>{errors.email_register}</label>
            </div>
          </div>
          <div>
            <div className='register-row'>
              <input
                type='password'
                id='password_register'
                className='register-row__input'
                value={formValues.password_register || ''}
                maxLength={20}
                onChange={handleInputChange}
                autoComplete='off'
                placeholder=' ' />
              <label htmlFor='password_register' className='register-row__label'> Password <span className='req'>*</span> </label>
            </div>
            <div>
              <label className='register-error' id='register_error_password'>{errors.password_register}</label>
            </div>
          </div>
        </div>

        <div className='register-btn-box'>
          <button className='register-btn r-sumbit' onClick={handleSubmit}>
            Create
          </button>
          <button className='register-btn r-cancel' onClick={handleClick}>
            Cancel
          </button>
        </div>
      </div>
      <footer className='register-footerCopyRights'> &copy; SeleMiracleRun </footer>
    </div>
  );
};

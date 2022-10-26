import { useState, React } from 'react';
import { IconContext } from 'react-icons';
import { FaEdit } from 'react-icons/fa';
import { useForm } from './../../shared/hooks/useForm';
import { useSelector } from 'react-redux';
import { useGetProfileData } from './../../Utils/UserProfile/getUserProfile';
import { usePutEditUser } from '../../Utils/UserProfile/putEditProfile';
import {
  removeNoEdit,
  applyNoEdit,
  validateEditUserForm,
} from './../../Utils/UserProfile/editUserProfile';

export const UserProfile = () => {
  const { updateEmployee, updateEmployeer } = usePutEditUser();
  const [userId, setUserId] = useState('');
  const [formValuesCopy, setFormValuesCopy] = useState({})
  const [isEditing, setIsEditing] = useState(false);
  const user = useSelector((state) => state.user.user);
  const handleEdit = () => {
    setIsEditing(true);
    removeNoEdit();
  }
  const applyFormValues = () => {
    formValues.name = formValuesCopy.name;
    formValues.lastname = formValuesCopy.lastname;
    formValues.secondlastname = formValuesCopy.secondlastname;
    formValues.email = formValuesCopy.email;
    formValues.phoneNumber = formValuesCopy.phoneNumber;
  }
  const applyChangesToForm = () => {
    formValuesCopy.name = formValues.name;
    formValuesCopy.lastname = formValues.lastname;
    formValuesCopy.secondlastname = formValues.secondlastname;
    formValuesCopy.email = formValues.email;
    formValuesCopy.phoneNumber = formValues.phoneNumber;
  }
  const handleCancel = () => {
    applyFormValues();
    applyNoEdit();
    setIsEditing(false);
  }
  const submit = async () => {
    if (user.Roles === 'admin') {
      const result = await updateEmployeer(formValues);
      if (result === true) {
        setIsSubmitting(false);
        applyChangesToForm();
        applyNoEdit();
        setIsEditing(false);
      }
    } else {
      const result = await updateEmployee(formValues);
      if (result === true) {
        setIsSubmitting(false);
        applyChangesToForm();
        applyNoEdit();
        setIsEditing(false);
      }
    }
  }

  const {
    formValues,
    handleInputChange,
    handleSubmit,
    setIsSubmitting,
    errors,
  } = useForm(submit, validateEditUserForm);
  const { infoReceived } = useGetProfileData(formValues, setUserId, setFormValuesCopy);
  return !infoReceived ? (
    <div className='loader'></div>
  ) : (
    <>
      <div className='user-info-container'>
        <div className='user-profile-header'>
          <div className='user-profile-logo'>{userId}</div>
          <div className='user-profile-edit-icon'>
            <IconContext.Provider
              value={{
                className: 'user-profile-edit-button',
              }}
            >
              <button className='edit-profile-button' onClick={handleEdit}>
                <FaEdit />
              </button>
            </IconContext.Provider>
          </div>
        </div>
        <div className='user-profile-form'>
          <div className='user-profile-inner-div'>
            <div className='div-profile'>
              <label className='user-profile-label'>Name</label>
              <label id='error-name-user' className='error-label-userprofile'>
                {errors.name}
              </label>
            </div>
            <input
              id='name'
              className='user-profile-input'
              disabled
              value={!isEditing ? formValuesCopy.name : formValues.name}
              onChange={handleInputChange}
              readOnly
            ></input>
          </div>
          <div className='user-profile-inner-div'>
            <div className='div-profile'>
              <label className='user-profile-label'>First Last Name</label>
              <label id='error-fLastname-user' className='error-label-userprofile'>
                {errors.lastname}
              </label>
            </div>
            <input
              id='lastname'
              className='user-profile-input'
              disabled
              value={!isEditing ? formValuesCopy.lastname : formValues.lastname}
              onChange={handleInputChange}
              readOnly
            ></input>
          </div>
          <div className='user-profile-inner-div'>
            <div className='div-profile'>
              <label className='user-profile-label'>Second Last Name</label>
              <label id='error-Slastname-user' className='error-label-userprofile'>
                {errors.secondlastname}
              </label>
            </div>
            <input
              id='secondlastname'
              className='user-profile-input'
              disabled
              value={!isEditing ? formValuesCopy.secondlastname : formValues.secondlastname}
              onChange={handleInputChange}
              readOnly
            ></input>
          </div>
          <div className='user-profile-inner-div'>
            <div className='div-profile'>
              <label className='user-profile-label'>Identification</label>
            </div>
            <input
              id='id'
              className='user-profile-input'
              disabled
              value={formValues.id}
              onChange={handleInputChange}
              readOnly
            ></input>
          </div>
          <div className='user-profile-inner-div'>
            <div className='div-profile'>
              <label className='user-profile-label'>Email</label>
              <label id='error-email-user' className='error-label-userprofile'>
                {errors.email}
              </label>
            </div>
            <input
              id='email'
              className='user-profile-input'
              disabled
              value={!isEditing ? formValuesCopy.email : formValues.email}
              onChange={handleInputChange}
              readOnly
            ></input>
          </div>
          <div className='user-profile-inner-div'>
            <div className='div-profile'>
              <label className='user-profile-label'>Phone Number</label>
            </div>
            <input
              id='phoneNumber'
              className='user-profile-input'
              disabled
              value={!isEditing ? formValuesCopy.phoneNumber : formValues.phoneNumber}
              onChange={handleInputChange}
              readOnly
            ></input>
          </div>
          <div className='user-profile-inner-div'></div>

          <div id='user-profile-buttons-div' className='user-profile-buttons'>
            <button className='submit-change-btn' onClick={handleSubmit}>
              Submit
            </button>
            <button className='dont-change-btn' onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

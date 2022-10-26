import React, { useState, useEffect } from 'react';
import { IconContext } from 'react-icons';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { useForm } from './../../shared/hooks/useForm';
import { useSelector, useDispatch } from 'react-redux';
import { getAnEntity } from '../../Utils/getAnEntity';
import Swal from 'sweetalert2';
import usePost from '../../shared/hooks/usePost';
import validateEditProject from './editProjectValidate';
import { validAnEntity } from '../../Utils/validAnEntity';
import { updateActiveProject } from '../../Slices/projectSlice/activeProjectSlice';
import { useNavigate } from 'react-router-dom';
import { useProjectManagement } from '../../Utils/ProjectManagement/useProjectManagement.jsx';

export const ProjectInfo = () => {
  const navigate = useNavigate();
  const [ isEditing, setIsEditing ] = useState( false );
  const [ inputCss, setInputCss ] = useState( 'user-profile-input' );
  const [ isLoading, setIsLoading ] = useState( true );
  const activeProject = useSelector( ( state ) => state.activeProject.projectName );
  const [ projectData, setProjectData ] = useState( [] );
  const employerID = useSelector( ( state ) => state.user.user.Cedula );
  const { post: eliminateProjectFromDatabase, postError: eliminateProjectFromDatabaseError } = usePost( process.env.REACT_APP_BACKEND_LOCALHOST + 'logicEliminateProject', 'PUT' );
  const { post: updateProject } = usePost( process.env.REACT_APP_BACKEND_LOCALHOST + 'updateProject', 'PUT' );
  const dispatch = useDispatch();
  const [ changeMade, setChangeMade ] = useState( false );
  const { eliminateProject } = useProjectManagement();
  const submit = async () => {
    const availableName = await validAnEntity( 'projects/', formValues.projectName );
    if ( formValues.projectName === activeProject || availableName ) {
      console.log( 'entra a submit' );
      let string = JSON.stringify( formValues );
      string = JSON.stringify( {
        projectName: formValues.projectName,
        paymentPeriod: formValues.paymentPeriod,
        oldProjectName: activeProject,
        employerID: employerID
      } );
      updateProject( string );
      dispatch( updateActiveProject( formValues.projectName ) );
      setFormValues( [] );
      setIsEditing( false );
      setProjectData( [] );
      setChangeMade( true );
    } else {
      Swal.fire( {
        icon: 'error',
        title: 'Error...',
        text: 'That project name already exists',
        confirmButtonColor: 'darkgreen'
      } );
    }
    setIsSubmitting( false );
  };

  const { formValues, handleInputChange, handleSubmit, errors, setFormValues, setErrors, setIsSubmitting } = useForm( submit, validateEditProject );
  useEffect( () => {
    setIsLoading( true );
    const loadProjectData = async () => {
      const result = await getAnEntity( 'projects/', activeProject );
      console.log( result );
      setProjectData( result[0] );
      setFormValues( { ...formValues, projectName: projectData.Nombre } );
      setIsLoading( false );
    };
    loadProjectData();
    setChangeMade( false );
  }, [ changeMade ] );

  return isLoading
    ? (
      <div className='loader'></div>
    )
    : (
      <>

        <div className='user-info-container project-info-header'>
          <div className='user-profile-header'>
            <h2 className='projectEditTitle' >Project Info</h2>
            <div className='project-button-icons'>
              <IconContext.Provider
                value={{
                  className: 'user-profile-edit-button'
                }}
              >
                <button className='edit-profile-button' onClick={() => {
                  setIsEditing( true );
                  setInputCss( 'input-editing' );
                  setChangeMade( true );
                }
                } >
                  <FaEdit />
                </button>
              </IconContext.Provider>

              <IconContext.Provider
                value={{
                  className: 'delete-project-button'
                }}
              >
                <button className='edit-profile-button' onClick={() => eliminateProject( activeProject )}>
                  <MdDelete />
                </button>
              </IconContext.Provider>
            </div>
          </div>

          <div className='user-profile-form'>

            <div className='user-profile-inner-div'>
              <div className='div-profile'>
                <label className='user-profile-label'>ProjectName</label>
                <label id='errorsProjectName' className='editProjectsErrors'>
                  {errors.projectName}
                </label>
              </div>
              <input
                id='projectName'
                className={inputCss + ' ' + errors.projectNameErrorCss}
                placeholder={projectData.Nombre}
                autoComplete='off'
                value={( isEditing && !isLoading ) ? formValues.projectName || '' : projectData.Nombre}
                onChange={handleInputChange}
                disabled={!isEditing}
              ></input>
            </div>

            <div className='user-profile-inner-div'>
              <div className='div-profile'>
                <label className='user-profile-label'>PaymentPeriod</label>
                <label id='errorsProjectName' className='editProjectsErrors'>
                  {errors.paymentPeriod}
                </label>
              </div>
              {
                isEditing
                  ? (
                    <select id='paymentPeriod' className={inputCss + ' ' + errors.paymentPeriodErrorCss} onChange={handleInputChange} >
                      <option value=''>Select Payment Period</option>
                      <option value='Mensual'>Mensual</option>
                      <option value='Quincenal'>Quincenal</option>
                      <option value='Semanal'>Semanal</option>
                    </select>
                  )
                  : <input
                    id='paymentPeriod'
                    className={inputCss}
                    disabled={!isEditing}
                    value={isEditing ? formValues.paymentPeriod || projectData.TipoPeriodo : projectData.TipoPeriodo}
                    onChange={handleInputChange}
                  ></input>
              }
            </div>

            <div className='user-profile-inner-div'>
              <div className='div-profile'>
                <label className='user-profile-label'>Max Benefits Quantity</label>
                <label id='errorMaxBenefitsQuantity ' className={`error-label ${errors.projectNameErrorCss}`}>
                  {errors.maxBenefitsQuantity}
                </label>
              </div>
              <input
                id='maxBenefitsQuantity'
                className={inputCss}
                disabled={true}
                autoComplete='off'
                placeholder={isEditing ? `Can't edit max benefits quantity: ${projectData.CantidadMaximaBeneficiosEmpleado} ` : projectData.CantidadMaximaBeneficiosEmpleado}
                value={isEditing ? '' : projectData.CantidadMaximaBeneficiosEmpleado}
                onChange={handleInputChange}
              ></input>
            </div>

            <div className='user-profile-inner-div'>
              <div className='div-profile'>
                <label className='user-profile-label'>Max Benefits Money Amount</label>
                <label id='error-id-user' className='error-label'>
                  {errors.email}
                </label>
              </div>
              <input
                id='maxBenefitsMoneyAmount'
                className={inputCss}
                disabled={true}
                placeholder={isEditing ? `Can't edit max benefits money amount: ${projectData.MontoMaximoBeneficiosEmpleado}` : projectData.MontoMaximoBeneficiosEmpleado}
                autoComplete='off'
                value={isEditing ? '' : projectData.MontoMaximoBeneficiosEmpleado}
              ></input>
            </div>
            <div className='user-profile-inner-div' />

            {
              isEditing
                ? (
                  <>

                    <br></br>
                    <div id='user-profile-buttons-div' className='editProjectButtons'>
                      <button className='projectButon projectCreateButton' onClick={handleSubmit}>
                        Submit
                      </button>
                      <button className='projectButon projectCancelButton' onClick={() => {
                        setIsEditing( false );
                        setInputCss( 'user-profile-input' );
                        setFormValues( [] );
                        setFormValues( { ...formValues, projectName: projectData.Nombre } );
                        setErrors( [] );
                      }}>
                        Cancel
                      </button>
                    </div>
                  </>
                )
                : <></>

            }
          </div>
        </div>
      </>
    );
};

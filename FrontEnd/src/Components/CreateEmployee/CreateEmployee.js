import React, { useState, useEffect } from 'react';
import './CreateEmployeesStyle.scss';
import { useSelector } from 'react-redux';
import { back, validateForm, showContractValues } from '../../Utils/CreateEmployee/CreateEmployee';
import useForm from '../../shared/hooks/useForm';
import usePost from '../../shared/hooks/usePost';
import { validAnEntity } from '../../Utils/validAnEntity';
import { verifyEmployeeProject } from '../../Utils/CreateEmployee/CreateEmployee';

export const CreateEmployee = () => {
  const [contractsReceived, setContractsReceived] = useState(false);
  const [typeOfContracts, setTypeOfContracts] = useState();
  const activeProject = useSelector((state) => state.activeProject.projectName);
  const idEmployer =  useSelector((state)=>state.user.user.Cedula);
  const { post } = usePost(process.env.REACT_APP_BACKEND_LOCALHOST + 'employee');
  const sendToDatabase = async () => {
    let string = JSON.stringify(formValues);
    string = JSON.stringify({
      NombreProyecto: activeProject,
      CedulaEmpleador:idEmployer,
      Email: formValues.email,
      Roles: 'emp',
      Nombre: formValues.name,
      Apellido1: formValues.lastname,
      Apellido2: formValues.secondlastname,
      Cedula: formValues.id,
      Telefono: formValues.phoneNumber,
      TipoJornada: formValues.contract,
      FechaFinContrato: formValues.contractDeadline,
      SalarioPorHora: formValues.hWage,
      NombreServicio: formValues.serviceName,
      ValorServicio: formValues.serviceValue,
    });
    const user = await validAnEntity('users/', formValues.email);
    const employee = await validAnEntity('employee/', formValues.id);
    const employeeContract = await verifyEmployeeProject(formValues.id, activeProject);
    if (user === true && employee === true && employeeContract === true) {
      post(string);
      back();
    } else {
      setIsSubmitting(false);
      alert('There is already an user with those credentials.');
    }
  };
  const { formValues, handleInputChange, handleSubmit, errors, setIsSubmitting } = useForm(sendToDatabase, validateForm);
  useEffect(() => {
    const fetchTypeContracts = async () => {
      const seleUrl = process.env.REACT_APP_BACKEND_LOCALHOST + 'typeContracts';
      try {
        const response = await fetch(seleUrl);
        const newData = await response.json();
        setTypeOfContracts(newData);
        setContractsReceived(true);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTypeContracts();
  }, []);

  return !contractsReceived ? <div className='loader'></div> : (
    <>
      <div className='employees-form'>
        <div className='form-title-bar'>
          <div className='image-employee'></div>
          <div className='form-title-employee'> Create Employee </div>
        </div>
        <div className='form-name-employee'>
          <div>
            <div className='animated-input-employee'>
              <input type='text' id='name' className='animated-input-employee__input' value={formValues.name || ''}
                maxLength={15} onChange={handleInputChange} autoComplete='off' placeholder=' '></input>
              <label htmlFor='name' className='animated-input-employee__label'>Name<span className='req'>*</span></label>
            </div>
            <div>
              <label className='errorForm' id='error-name-input'>{errors.name}</label>
            </div>
          </div>

          <div>
            <div className='animated-input-employee'>
              <input type='text' id='lastname' className='animated-input-employee__input'
                value={formValues.lastname || ''} maxLength={15} onChange={handleInputChange} autoComplete='off' placeholder=' '></input>
              <label htmlFor='lastname' className='animated-input-employee__label'>First Last Name<span className='req'>*</span></label>
            </div>
            <div>
              <label className='errorForm' id='error-first-lastname-input'>{errors.lastname}</label>
            </div>
          </div>
          <div>
            <div className='animated-input-employee'>
              <input type='text' id='secondlastname' className='animated-input-employee__input'
                value={formValues.secondlastname || ''} maxLength={15} onChange={handleInputChange} autoComplete='off' placeholder=' '></input>
              <label htmlFor='secondlastname' className='animated-input-employee__label'>Second Last Name<span className='req'>*</span></label>
            </div>
            <div>
              <label className='errorForm' id='error-second-lastname-input'>{errors.secondlastname}</label>
            </div>
          </div>
        </div>
        <div className='form-id-phone-employee'>
          <div>
            <div className='animated-input-employee-id'>
              <input type='text' id='id' className='animated-input-employee-id__input'
                value={formValues.id || ''}
                maxLength={15}
                onChange={handleInputChange}
                autoComplete='off' placeholder=' '></input>
              <label htmlFor='id' className='animated-input-employee-id__label'>Id<span className='req'>*</span></label>
            </div>
            <div>
              <label className='errorForm' id='error-id-employee'>{errors.id}</label>
            </div>
          </div>
          <div className='animated-input-employee-id'>
            <input type='number' id='phoneNumber' className='animated-input-employee-id__input'
              value={formValues.phoneNumber || ''}
              maxLength={8}
              onChange={handleInputChange}
              autoComplete='off' placeholder=' '></input>
            <label htmlFor='phoneNumber' className='animated-input-employee-id__label'>Phone Number</label>
          </div>
        </div>
        <div className='form-credentials-employee'>
          <div>
            <div className='animated-input-employee-credentials'>
              <input type='text' id='email' className='animated-input-employee-credentials__input'
                value={formValues.email || ''}
                maxLength={50}
                onChange={handleInputChange}
                autoComplete='off' placeholder=' '></input>
              <label htmlFor='email' className='animated-input-employee-credentials__label'>Email<span className='req'>*</span></label>
            </div>
            <div>
              <label className='errorForm' id='error-email-input'>{errors.email}</label>
            </div>
          </div>
        </div>
        <div className='form-contract-employee'>
          <div>
            <div className='animated-input-employee-contract'>
              <select id='contract' className='animated-input-employee-contract__input'
                value={formValues.contract || ''}
                onChange={(e) => {
                  handleInputChange(e);
                  showContractValues(e);
                }}
              >
                <option value={''}>Select a Contract </option>
                {typeOfContracts.map((element) => (
                  <option key={element.TipoJornada} value={element.TipoJornada}>{element.TipoJornada}</option>
                ))}
              </select>
              <label htmlFor='contract' className='animated-input-employee-contract__label'>Type of Contract<span className='req'>*</span></label>
            </div>
            <div>
              <label className='errorForm' id='error-contract-input'>{errors.contract}</label>
            </div>
          </div>
          <div className='animated-input-employee-service-contract'>
            <input type='date' id='contractDeadline' className='animated-input-employee-service-contract__input'
              value={formValues.contractDeadline || ''}
              maxLength={50}
              onChange={handleInputChange}
              autoComplete='off' placeholder=' '></input>
            <label htmlFor='contractDeadline' className='animated-input-employee-service-contract__label'>Hired Until</label>
          </div>
        </div>
        <div className='form-profesional-contract' id='profesional service'>
          <div className='animated-input-employee-service-contract'>
            <input type='text' id='serviceName' className='animated-input-employee-service-contract__input'
              value={formValues.serviceName}
              maxLength={50}
              onChange={handleInputChange}
              autoComplete='off' placeholder=' '></input>
            <label htmlFor='serviceName' className='animated-input-employee-service-contract__label'>Service Name</label>
          </div>
          <div className='animated-input-employee-service-contract'>
            <input type='text' id='serviceValue' className='animated-input-employee-service-contract__input'
              value={formValues.serviceValue}
              maxLength={50}
              onChange={handleInputChange}
              autoComplete='off' placeholder=' '></input>
            <label htmlFor='serviceValue' className='animated-input-employee-service-contract__label'>Service Value</label>
          </div>
        </div>
        <div className='form-others-contract' id='other-contract'>
          <div className='animated-input-employee-other-contract'>
            <input type='number' id='hWage' className='animated-input-employee-other-contract__input'
              value={formValues.hWage || ''}
              onChange={handleInputChange}
              autoComplete='off' placeholder=' '></input>
            <label htmlFor='hWage' className='animated-input-employee-other-contract__label'>Hourly Wage</label>
          </div>
        </div>
        <div className='buttons-employee'>
          <button className='create-employee-btn'
            onClick={handleSubmit}>
            Create
          </button>
          <button className='cancel-employee-btn' onClick={() => { back(); }}>
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

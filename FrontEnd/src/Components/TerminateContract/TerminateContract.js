import { React, useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { FaArrowLeft } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import "./TerminateContract.scss";
import { useSelector } from "react-redux";
import usePost from './../../shared/hooks/usePost';
import Swal from 'sweetalert2';
export const TerminateContract = () => {
  const activeProject = useSelector((state) => state.activeProject.projectName);
  const [employeevalues, setEmployeeValues] = useState({});
  const idEmployer =  useSelector((state)=>state.user.user.Cedula);
  const [reasonOfEndContract, setReasonOfEndContract] = useState("");
  const navigate = useNavigate();
  const { post } = usePost(process.env.REACT_APP_BACKEND_LOCALHOST + 'deleteEmployeeFromProject');
  const location = useLocation();
  const handleSend = async () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'darkgreen',
      cancelButtonColor: 'darkred',
      confirmButtonText: 'Terminate Contract'
    }).then(async (result) => {
      if (result.isConfirmed) {
        let string = JSON.stringify({
          Proyecto: activeProject,
          EmailEmpleado: employeevalues.Email,
          Cedula: employeevalues.Cedula,
          CedulaEmpleador:idEmployer,
          MotivoDeDespido: reasonOfEndContract
        });
        const resultOfQ = await post(string);
        Swal.fire({
          title: 'Contract Terminated!',
          text: `${location.state.Nombre} contract has been terminated successfully!`,
          icon: 'success',
          confirmButtonColor: 'darkgreen',
        })
        if (resultOfQ === true) {
          navigate(-1);
        }
      }
    })
  }
  useEffect(() => {
    setEmployeeValues({
      Nombre: location.state.Nombre,
      Apellido1: location.state.Apellido1,
      Apellido2: location.state.Apellido2,
      Cedula: location.state.Cedula,
      TipoContrato: location.state.TipoContrato,
      Email: location.state.Email,
    });
  }, []);
  return (
    <>
      <div className="form-end-contract">
        <IconContext.Provider
          value={{
            color: "gray",
            className: "global-class-name",
            size: "2.6rem",
          }}
        >
          <button className="back-arrow-button" onClick={() => { navigate(-1) }}>
            <FaArrowLeft />
          </button>
        </IconContext.Provider>
        <div className="form-end-contract-title">
          <div className="image-terminateContract"></div>
          <div className="form-terminateContract-employee">
            {" "}
            Termination Of Contract{" "}
          </div>
        </div>
      </div>
      <div className="employee-to-EndContract">
        {`${employeevalues.Nombre} ${employeevalues.Apellido1} ${employeevalues.Apellido2}
           - ${employeevalues.Cedula} - ${employeevalues.TipoContrato}
        `}
      </div>
      <div className="reason-to-end-contract">
        <div className="animated-reason-input">
          <textarea
            id="Description"
            className="animated-reason-input__textarea"
            autoComplete="off"
            placeholder=" "
            value={reasonOfEndContract}
            onChange={(e) => {
              setReasonOfEndContract(e.target.value);
            }}
          ></textarea>
          <label htmlFor="Description" className="animated-reason-input__label">
            Reason
          </label>
          <label className="error-message" id="benefit-description"></label>
        </div>
      </div>
      <div className="buttons-terminate-contract">
        <button className="create-employee-btn" onClick={handleSend}>
          Send
        </button>
      </div>
    </>
  );
};

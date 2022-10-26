import { React } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "./../../shared/hooks/useForm";
import { useGetTypeOfContracts } from "../../Utils/HireAEmployee/useGetTypeOfContracts";
import { showContractValues } from "../../Utils/CreateEmployee/CreateEmployee";
import { hireContractForm } from "../../Utils/HireAEmployee/validHireForm";
import usePost from "./../../shared/hooks/usePost";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export const HireContract = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const activeProject = useSelector((state) => state.activeProject.projectName);
  const idEmployer =  useSelector((state)=>state.user.user.Cedula);
  const { post } = usePost(process.env.REACT_APP_BACKEND_LOCALHOST + "contractExistentEmployee");
  const sendToDataBase = () => {
    let string = JSON.stringify(formValues);
    string = JSON.stringify({
      Cedula: location.state.Cedula,
      TipoContrato: formValues.contract,
      CedulaEmpleador:idEmployer,
      Proyecto: activeProject,
      NombreServicio: formValues.serviceName,
      SalarioPorHora: formValues.hWage,
      FechaFinContrato: formValues.contractDeadline,
      ValorServicio: formValues.serviceValue,
    });
    post(string);
    navigate(-1);
  };
  const { formValues, handleInputChange, handleSubmit, errors } = useForm(
    sendToDataBase,
    hireContractForm
  );
  const back = () => {
    navigate(-1);
  };
  const { typeOfContracts, contractsReceived } = useGetTypeOfContracts();

  return !contractsReceived ? (
    <div className="loader"></div>
  ) : (
    <>
      <div className="hire-header-title">
        <div className="image-employee"></div>
        Hire Employee
      </div>
      <div>
        <h2>{`Hiring: ${location.state.Cedula}-${location.state.Nombre}`}</h2>
      </div>
      <div className="employees-form">
        <div className="contract-contractDeadline">
          <div>
            <div className="animated-input-employee-contract">
              <select
                id="contract"
                className="animated-input-employee-contract__input"
                value={formValues.contract || ""}
                onChange={(e) => {
                  handleInputChange(e);
                  showContractValues(e);
                }}
              >
                <option value={""}>Select a Contract </option>
                {typeOfContracts.map((element) => (
                  <option key={element.TipoJornada} value={element.TipoJornada}>
                    {element.TipoJornada}
                  </option>
                ))}
              </select>
              <label
                htmlFor="contract"
                className="animated-input-employee-contract__label"
              >
                Type of Contract<span className="req">*</span>
              </label>
            </div>
            <div>
              <p className="errorForm" id="error-contract-input">
                {errors.contract}
              </p>
            </div>
          </div>
          <div>
            <div className="animated-input-employee-service-contract">
              <input
                type="date"
                id="contractDeadline"
                className="animated-input-employee-service-contract__input"
                value={formValues.contractDeadline || ""}
                maxLength={50}
                onChange={handleInputChange}
                autoComplete="off"
                placeholder=" "
              ></input>
              <label
                htmlFor="contractDeadline"
                className="animated-input-employee-service-contract__label"
              >
                Hired Until
              </label>
            </div>
            <div>
              <p className="errorForm" id="error-contract-deadline-input">
                {errors.contractDeadline}
              </p>
            </div>
          </div>
        </div>
        <div className="form-profesional-contract" id="profesional service">
          <div className="animated-input-employee-service-contract">
            <input
              type="text"
              id="serviceName"
              className="animated-input-employee-service-contract__input"
              value={formValues.serviceName || ""}
              maxLength={50}
              onChange={handleInputChange}
              autoComplete="off"
              placeholder=" "
            ></input>
            <label
              htmlFor="serviceName"
              className="animated-input-employee-service-contract__label"
            >
              Service Name
            </label>
          </div>
          <div>
            <div className="animated-input-employee-service-contract">
              <input
                type="text"
                id="serviceValue"
                className="animated-input-employee-service-contract__input"
                value={formValues.serviceValue || ""}
                maxLength={50}
                onChange={handleInputChange}
                autoComplete="off"
                placeholder=" "
              ></input>
              <label
                htmlFor="serviceValue"
                className="animated-input-employee-service-contract__label"
              >
                Service Value
              </label>
            </div>

            <div>
              <p className="errorForm" id="error-contract-service-value-input">
                {errors.serviceValue}
              </p>
            </div>
          </div>
        </div>
        <div className="form-others-contract" id="other-contract">
          <div>
            <div className="animated-input-employee-other-contract">
              <input
                type="number"
                id="hWage"
                className="animated-input-employee-other-contract__input"
                value={formValues.hWage || ""}
                onChange={handleInputChange}
                autoComplete="off"
                placeholder=" "
              ></input>
              <label
                htmlFor="hWage"
                className="animated-input-employee-other-contract__label"
              >
                Hourly Wage
              </label>
            </div>

            <div>
              <p className="errorForm" id="error-contract-hWage-input">
                {errors.hWage}
              </p>
            </div>
          </div>
        </div>
        <div className="buttons-employee">
          <button className="create-employee-btn" onClick={handleSubmit}>
            Hire
          </button>
          <button
            className="cancel-employee-btn"
            onClick={() => {
              back();
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

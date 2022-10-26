import { React, useState, useEffect } from "react";
import "./EmployeePayslip.scss";
import { jsPDF } from "jspdf";
import axios from "axios";
import { useSelector } from "react-redux";
import {useLocation, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { removeTimeFromDate } from "../../shared/removeTimeFromDate";
import {
  getOblDeductionsOfAPayslip,
  getVolDeductionsOfAPayslip,
} from "../../Utils/PaySlipReport/getDeductionsData";
import { IconContext } from "react-icons";
import { FaArrowLeft } from "react-icons/fa";

export const PayslipReportComp = () => {
  const location = useLocation();
  const user = useSelector((state) => state.user.user);
  const activeProject = useSelector((state) => state.activeProject.projectName);
  const navigate = useNavigate();
  const [obligatoryDeductions, setObligatoryDeductions] = useState([]);
  const [totalObligatoryDeductionsCost, setTotalObligatoryDeductionsCost] =
    useState(0);
  const [voluntaryDeductions, setVoluntaryDeductions] = useState([]);
  const [voluntaryDeductionsCost, setTotalVoluntaryDeductionsCost] =
    useState(0);

  let formatter = new Intl.NumberFormat('en-US', {
    style: "currency",
    currency: "CRC",
  });

  const handleReport = async () => {
    let doc = new jsPDF("p", "mm", "a4");
    let file;
    await doc.html(document.getElementById("payrollReport"), {
      margin: [0, 0, 0, 23],
      callback: function (doc) {
        file = doc.output("datauristring");
      },
      html2canvas: { scale: 0.23 },
    });
    return file;
  };

  const sendEmail = async () => {
    const file = await handleReport();
    if (file) {
      await axios
        .post(`${process.env.REACT_APP_BACKEND_LOCALHOST}sendFileEmail`, {
          file: file,
          email: user.Email,
          payRollConsecutive: location.state.ConsecutivoPago,
        })
        .then((res) => {
          if (res.status === 200){
            Swal.fire( {
              title: 'Report Sent!',
              text: `Report ${location.state.ConsecutivoPago} has been sent!`,
              icon: 'success',
              confirmButtonColor: 'darkgreen',
            } )
          }else{
            Swal.fire( {
              title: 'Error Occured',
              icon: 'warning',
              confirmButtonColor: 'darkgreen',
            })
          }
        });
    }
  };
  const back = () => {
    navigate(-1);
  };

  useEffect(() => {
    const getTotalObligatoryDeductions = async () => {
      const data = await getOblDeductionsOfAPayslip(
        location.state.ConsecutivoPago
      );
      if (data) {
        setObligatoryDeductions(data);
        let total = 0;
        data.forEach((element) => {
          total += element.MontoEmpleado;
        });
        setTotalObligatoryDeductionsCost(total);
      }
    };
    const getTotalVoluntaryDeductions = async () => {
      const data = await getVolDeductionsOfAPayslip(
        location.state.ConsecutivoPago
      );
      if (data) {
        setVoluntaryDeductions(data);
        let total = 0;
        data.forEach((element) => {
          total += element.MontoDeduccion;
        });
        setTotalVoluntaryDeductionsCost(total);
      }
    };

    getTotalObligatoryDeductions();
    getTotalVoluntaryDeductions();
  }, []);


  return (
    <>
      <div className="payrollReport-title">
      <IconContext.Provider
          value={{
            color: "black",
            className: "global-class-name",
            size: "2.6rem",
          }}
        >
          <button
            className="payrollReport-title__back-arrow"
            onClick={() => {
              back();
            }}
          >
            <FaArrowLeft />
          </button>
        </IconContext.Provider>
        <label className="payrollReport-title__title">Payslip Report</label>
        <button
          className="create-button"
          onClick={() => {
            sendEmail();
          }}
        >
          Send Report To Email
        </button>
      </div>
      <div className="payrollReport-page">
        <div id="payrollReport">
          <div className="payrollReport-header">
            <div className="payrollReport-header__title">{activeProject}</div>
            <div className="payrollReport-div">
              <label className="payrollReport__text">
                <b>Employee: </b>
                {`${user.Nombre} ${user.Apellido1} ${user.Apellido2} - ${user.Cedula} - ${location.state.TipoContrato}`}
              </label>
            </div>
            <div className="payrollReport-div">
              <label className="payrollReport__text">
                <b>Payslip Id: </b>
                {location.state.ConsecutivoPago}
              </label>
            </div>
            <div className="payrollReport-div">
              <label className="payrollReport__text">
                <b>Pay Date: </b>
                {removeTimeFromDate(location.state.FechaFin)}
              </label>
            </div>
          </div>
          <div className="payrollReport-salaries">
            <div className="payrollReport-div">
              <label className="payrollReport__TotalText">
                Gross Salary:{" "}
              </label>
              <label className="payrollReport__totalTotal">
                {formatter.format(location.state.SalarioBruto)}
              </label>
            </div>
            <hr></hr>
          </div>
          <div className="payrollReport-lawDeductions">
            <div className="payrollReport-div">
              <label className="payrollReport__title">
                Obligatory Deductions
              </label>
            </div>
            {obligatoryDeductions.map((element, index) => (
              <div key={index} className="payrollReport-div">
                <label className="payrollReport__text">
                  {`${element.NombreDeduccionObligatoria}`}
                </label>
                <label className="payrollReport__total">
                  {formatter.format(element.MontoEmpleado)}
                </label>
              </div>
            ))}
            <div className="payrollReport-div">
              <label className="payrollReport__TotalText">Total: </label>
              <label className="payrollReport__totalTotal">
                {formatter.format(totalObligatoryDeductionsCost)}
              </label>
            </div>
            <hr></hr>
          </div>
          <div className="payrollReport-lawDeductions">
            <div className="payrollReport-div">
              <label className="payrollReport__title">
                Voluntary Deductions
              </label>
            </div>
            {voluntaryDeductions.map((element, index) => (
              <div key={index} className="payrollReport-div">
                <label className="payrollReport__text">
                  {`${element.NombreDeduccion}`}
                </label>
                <label className="payrollReport__total">
                  {formatter.format(element.MontoDeduccion)}
                </label>
              </div>
            ))}
            <div className="payrollReport-div">
              <label className="payrollReport__TotalText">Total: </label>
              <label className="payrollReport__totalTotal">
                {formatter.format(voluntaryDeductionsCost)}
              </label>
            </div>
            <hr></hr>
          </div>
          <div className="payrollReport-div">
            <label className="payrollReport__totalCostText">
              Net Salary:{" "}
            </label>
            <label className="payrollReport__totalCost">
              {formatter.format(
                location.state.SalarioNeto
              )}
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

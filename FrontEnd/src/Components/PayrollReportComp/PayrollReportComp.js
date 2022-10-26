import { React, useState, useEffect } from "react";
import "./PayrollReportStyle.scss";
import { jsPDF } from "jspdf";
import axios from "axios";
import Swal from 'sweetalert2';
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { IconContext } from "react-icons";
import { FaArrowLeft } from "react-icons/fa";
import {
  getTotalSalaryCost,
  getPeriodOfAPorject,
  getTotalObligatoryDeductionsCost,
  getTotalBenefitsCost,
} from "../../Utils/PayRollReport/getPayRollData";
import { removeTimeFromDate } from "../../shared/removeTimeFromDate";
import { sumTotalSalaries } from "../../Utils/PayRollReport/sumTotalSalarys";
import { sumTotalBenefits } from './../../Utils/PayRollReport/sumTotalBenefits';

export const PayrollReportComp = () => {
  const location = useLocation();
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const activeProject = useSelector((state) => state.activeProject.projectName);
  const [totalSalaryCost, setTotalSalaryCost] = useState([]);
  const [totalSalary, setTotalSalary] = useState(0);
  const [category, setCategory] = useState("");
  const [benefits, setBenefits] = useState([]);
  const [obligatoryDeductions, setObligatoryDeductions] = useState([]);
  const [totalBenefitsCost, setTotalBenefitsCost] = useState([]);
  const [totalObligatoryDeductionsCost, setTotalObligatoryDeductionsCost] =
    useState([]);

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
          payRollConsecutive: location.state.Consectivo,
        })
        .then((res) => {
          if (res.status === 200){
            Swal.fire( {
              title: 'Done!',
              text: `Email sent successfully.`,
              icon: 'success',
              confirmButtonColor: 'darkgreen',
            } );
          }
          else{
            Swal.fire( {
              title: 'Done!',
              text: `We couldnt sent the email`,
              icon: 'error',
              confirmButtonColor: 'darkred',
            } );
          }
        });
    }
  };

  const back = () => {
    navigate(-1);
  };

  useEffect(() => {
    const getDataTotalSalary = async () => {
      const data = await getTotalSalaryCost(
        location.state.Consectivo,
        activeProject
      );
      if (data) {
        setTotalSalaryCost(data);
        const total = sumTotalSalaries(data)
        setTotalSalary(total);
      }
    };
    const getCategory = async () => {
      const data = await getPeriodOfAPorject(activeProject);
      if (data) {
        setCategory(data[0].TipoPeriodo);
      }
    };
    const getTotalBenefits = async () => {
      const data = await getTotalBenefitsCost(location.state.Consectivo);
      if (data) {
        setBenefits(data);
        const total = sumTotalBenefits(data);
        setTotalBenefitsCost(total);
      }
    };
    const getTotalObligatoryDeductions = async () => {
      const data = await getTotalObligatoryDeductionsCost(
        location.state.Consectivo
      );
      if (data) {
        setObligatoryDeductions(data);
        let total = 0;
        data.forEach((element) => {
          total += element.Monto;
        });
        setTotalObligatoryDeductionsCost(total);
      }
    };
    getDataTotalSalary();
    getCategory();
    getTotalBenefits();
    getTotalObligatoryDeductions();
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
        <label className="payrollReport-title__title">Total Costs Report</label>
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
                <b>Employer: </b>
                {`${user.Nombre} ${user.Apellido1} ${user.Apellido2} - ${user.Cedula}`}
              </label>
            </div>
            <div className="payrollReport-div">
              <label className="payrollReport__text">
                <b>Payroll ID: </b>
                {location.state.Consectivo}
              </label>
            </div>
            <div className="payrollReport-div">
              <label className="payrollReport__text">
                <b>Period: </b>
                {category}
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
              <label className="payrollReport__title">Salaries</label>
            </div>
            {totalSalaryCost.map((element) => (
              <div key={element.salario} className="payrollReport-div">
                <label className="payrollReport__text">
                  {`Salarios Empleados ${element.TipoContrato}`}
                </label>
                <label className="payrollReport__total">
                  {formatter.format(element.salario)}
                </label>
              </div>
            ))}
            <div className="payrollReport-div">
              <label className="payrollReport__TotalText">Total: </label>
              <label className="payrollReport__totalTotal">
                {formatter.format(totalSalary)}
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
                  {formatter.format(element.Monto)}
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

          <div className="payrollReport-benefits">
            <div className="payrollReport-div">
              <label className="payrollReport__title">Benefits</label>
            </div>
            {benefits.map((element, index) => (
              <div key={index} className="payrollReport-div">
                <label className="payrollReport__text">
                  {`${element.NombreBeneficio}`}
                </label>
                <label className="payrollReport__total">
                  {formatter.format(element.Monto)}
                </label>
              </div>
            ))}
            <div className="payrollReport-div">
              <label className="payrollReport__TotalText">Total: </label>
              <label className="payrollReport__totalTotal">
                {formatter.format(totalBenefitsCost)}
              </label>
            </div>
            <hr></hr>
            <div className="payrollReport-div">
              <label className="payrollReport__totalCostText">
                Total Cost:{" "}
              </label>
              <label className="payrollReport__totalCost">
                {formatter.format(
                  totalSalary +
                    totalObligatoryDeductionsCost +
                    totalBenefitsCost
                )}
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

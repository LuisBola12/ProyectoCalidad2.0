import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Benefits } from './Pages/benefits';
import { Employees } from './Pages/employees';
import { VoluntaryDeductions } from './Pages/voluntaryDeductions';
import { CreateNewVoluntaryDeduction } from './Pages/createNewVoluntaryDeduction';
import { EmployeesVoluntaryDeductions } from './Pages/employeesVoluntaryDeductions';
import { EditVoluntaryDeductions } from './Pages/editVoluntaryDeductions';
import { Contracts } from './Pages/contracts';
import { SelectProject } from './Pages/selectProject';
import { CreateNewEmployee } from './Pages/createNewEmployee';
import history from './history';
import { Login } from './Pages/login';
import { Register } from './Pages/register';
import { PrivateRoute } from './Components/PrivateRoute/PrivateRoute';
import { Unauthoraized } from './Pages/unauthoraized';
import { CreateNewBenefit } from './Pages/createNewBenefit';
import { CreateProjectsForm } from './Components/ProjectsComponents/CreateProjectsForm';
import { EditBenefits } from './Pages/editBenefits';
import { RegisterHours } from './Pages/registerHours';
import { useSelector } from 'react-redux';
import { Payroll } from './Pages/payroll';
import { PayrollDetailsPage } from './Pages/payrollDetails';
import { EmployeesBenefits } from './Pages/employeesBenefits';
import { UserPage } from './Pages/userProfile';
import { HireAEmployee } from './Pages/crudHireEmployees';
import { HireEmployee } from './Pages/hireEmployee';
import { EndContractWithEmployee } from './Pages/endContractWithEmployee';
import { EmployeeMyPayments } from './Pages/employeeMyPayments';
import { EditProjectPage } from './Pages/editProject';
import { EmployeePaymentsReport } from './Pages/employeePaymentsReport';
import { HistoricPaymentsPerEmployeePage } from './Pages/historicPaymentsPerEmployeePage.js';
import { EmployerPaymentsReport } from './Pages/employerPaymentsReport';
import { PayrollReport } from './Pages/payrollReport';
import { DashBoard } from './Pages/dashBoard';
import { VerificationPage } from './Pages/verification';
import { PayslipReport } from './Pages/payslipReport';
import { AboutUsPage } from './Pages/aboutUs';

function App() {

  const userRoll = useSelector( ( state ) => state.user.user );

  return (

    <Router history={history}>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='no-autorizado' element={<Unauthoraized />} />
        <Route path='register' element={<Register />} />
        <Route path='verification' element={<VerificationPage />} />
        <Route path='aboutUs' element={<AboutUsPage />} />

        {/* Routes for the employer */}
        {userRoll && userRoll.Roles === 'admin' ?
          (
            <Route element={<PrivateRoute allowedRoles={[ 'admin' ]} />}>
              {/* <Route path='/' element={<SelectProject />} /> */}
              <Route path='benefits' element={<Benefits />} />
              <Route path='employees' element={<Employees />} />
              <Route path='voluntaryDeductions' element={<VoluntaryDeductions />} />
              <Route path='voluntaryDeductions/CreateVoluntaryDeductions' element={<CreateNewVoluntaryDeduction />} />
              <Route path='voluntaryDeductions/editVoluntaryDeduction' element={<EditVoluntaryDeductions />} />
              <Route path='projectAdmin' element={<SelectProject />} />
              <Route path='contracts' element={<Contracts />} />
              <Route path='projects' element={<SelectProject />} />
              <Route path='userProfile' element={<UserPage />} />
              <Route path='employees/CreateEmployee' element={<CreateNewEmployee />} />
              <Route path='employees/hireAEmployee' element={<HireAEmployee />} />
              <Route path='employees/hireAEmployee/hire' element={<HireEmployee />} />
              <Route path='employees/terminateContract' element={<EndContractWithEmployee />} />
              <Route path='benefits/CreateBenefit' element={<CreateNewBenefit />} />
              <Route path='benefits/editBenefit' element={<EditBenefits />} />
              <Route path='newProjectForm' element={<CreateProjectsForm />} />
              <Route path='payroll' element={<Payroll />} />
              <Route path='payroll/details' element={<PayrollDetailsPage />} />
              <Route path='projectSettings' element={<EditProjectPage />} />
              <Route path='paymentsPerEmployee' element={<HistoricPaymentsPerEmployeePage />} />
              <Route path='PaymentsReport' element={<EmployerPaymentsReport />} />
              <Route path='payroll/report' element={<PayrollReport />} />
              <Route path='dashBoard' element={<DashBoard />} />
            </Route>
          ) : (
            <Route element={<PrivateRoute allowedRoles={[ 'emp' ]} />}>
              <Route path='projectAdmin' element={<SelectProject />} />
              <Route path='registerHours' element={<RegisterHours />} />
              <Route path='projects' element={<SelectProject />} />
              <Route path='userProfile' element={<UserPage />} />
              <Route path='myBenefits' element={<EmployeesBenefits />} />
              <Route path='myVoluntaryDeductions' element={<EmployeesVoluntaryDeductions />} />
              <Route path='myPayments' element={<EmployeeMyPayments />} />
              <Route path='PaymentsReport' element={<EmployeePaymentsReport />} />
              <Route path='/myPayments/reports/payslipReport' element={<PayslipReport/>} />
            </Route>
          )}
      </Routes>
    </Router>
  );
}
export default App;

/* eslint-disable space-in-parens */
import { Router } from 'express';
import { sendFileEmail } from '../controllers/employer.controller';
import {
  getProjectsByEmailAndName, getProjectsByEmail, createProject, createPayrroll,
  getProjectInfoByName, updateProject, deleteProject, getPeriodOfAProjectToReport, getCountEmployeesContractType
} from '../controllers/projects.controller';
import {
  getEmployees, postNewEmployee, getEmployeeByID, verifyEmployeeContractOnProject,
  getEmployeesWithContractOnOtherProyects, contractAEmployee, setHoursEmployee, deleteEmployeeFromProject, getEmployeesAllInfo,
  getEmployeePayments, getAllEmployeePayments, getHours
} from '../controllers/employees.contoller';
import {
  getEmployerByID, getUserByEmail, verifyCredentials, registerNewUser,
  getProfileEmployeer, getProfileEmployee, updateProfileEmployeer, updateProfileEmployee, updateVerification
} from '../controllers/users.controller';
import {
  getVoluntaryDeductions, createNewVoluntaryDeduction, getVoluntaryDeductionsByName, updateVoluntaryDeduction,
  getEmployeeVoluntaryDeductionsByEmail, getOfferedVoluntaryDeductions, linkEmployeeToVoluntaryDeduction, unlinkEmployeeToVoluntaryDeduction,
  deactivateVoluntaryDeduction, reactivateVoluntaryDeduction, getVoluntaryDeductionsStatistics
} from '../controllers/voluntaryDeductions.controller';
import { getTypeOfContracts } from '../controllers/contracts.controller';
import {
  getBenefits, createBenefit, getBenefitsByName, updateBenefit, getEmployeeBenefitsByEmail,
  getOfferedBenefits, linkEmployeeToBenefit, unlinkEmployeeToBenefit, deactivateBenefit,
  validateBenefitSuscription, reactivateBenefit, getBenefitsStatistics
} from '../controllers/benefits.controller';
import { getAllPayslipsOfAProject, getPayrrollsOfAProject, getTotalSalaryCost, getTotalCostBenefitsEmployer, getTotalCostObligatoryDeductionsEmployer, getSeparateOblDeductions, getSeparateVolDeductions, getPaymentsMadeByEmployer } from '../controllers/payrollController';
import { getPayrollTotalCosts, getPayrrollStatistics } from '../controllers/payrollController';

const router = Router();

//Users
router.get( '/users/:Email', getUserByEmail );
router.get( '/profileEmployee/:Email', getProfileEmployee );
router.get( '/profileEmployeer/:Email', getProfileEmployeer );
router.post( '/users', verifyCredentials );
router.put( '/verificationEmail', updateVerification );

//Employer
router.post('/createEmployer', registerNewUser);
router.get('/employer/:Cedula', getEmployerByID);
router.put('/updateEmployeer', updateProfileEmployeer);
router.get('/getTotalSalaryCost/:consecutivoPlanilla/:NombreProyecto', getTotalSalaryCost);
router.post('/sendFileEmail', sendFileEmail);

//Periodos
// router.get('/periodos',getPeriodos);


//Contracts
router.get('/typeContracts', getTypeOfContracts);


//Employees
router.get( '/employee/:Proyecto', getEmployees );
router.post( '/employee', postNewEmployee );
router.get( '/employee/:Cedula', getEmployeeByID );
router.post( '/employee/contract', verifyEmployeeContractOnProject );
router.put( '/updateEmployee', updateProfileEmployee );
router.post( '/employeesWithContractsOnOtherProyects', getEmployeesWithContractOnOtherProyects );
router.post( '/contractExistentEmployee', contractAEmployee );
router.post( '/deleteEmployeeFromProject', deleteEmployeeFromProject );
router.post( '/employee/hours', setHoursEmployee );
router.get( '/employeePayments/:projectName/:employeeEmail', getEmployeePayments );
router.get( '/employeePayments/:employeeEmail/:projectNameFilter/:initialDateFilter/:endDateFilter', getAllEmployeePayments );
router.get( '/getHours/:CedulaEmpleado/:NombreProyecto', getHours );

//Projects
router.post('/createPayrroll', createPayrroll);
router.get('/getEmployeesInfo/:projectName', getEmployeesAllInfo);
router.get('/projects/:Email/:Rol', getProjectsByEmail);
router.post('/projects', createProject);
router.post('/getProjectPeriod', createPayrroll);
router.put('/logicEliminateProject', deleteProject);
router.get('/myProjects/:Email/:ProjectName', getProjectsByEmailAndName);
router.get('/projects/:projectName', getProjectInfoByName);
router.put('/updateProject', updateProject);
router.get('/getEmployeesInfo/:projectName', getEmployeesAllInfo);
router.get('/getPeriodOfAProjectToReport/:nombreProyecto', getPeriodOfAProjectToReport);

//Projects
router.get('/projects/:Email/:Rol', getProjectsByEmail);
router.post('/projects', createProject);
router.post('/getProjectPeriod', createPayrroll);
router.put('/logicEliminateProject', deleteProject);
router.get('/myProjects/:Email/:ProjectName', getProjectsByEmailAndName);
router.get('/projects/:projectName', getProjectInfoByName);
router.put('/updateProject', updateProject);
router.get('/countEmployeeTypes/:employerID/:projectName', getCountEmployeesContractType);

//Benefits
router.get( '/benefits/:Proyecto/:CedulaEmpleador', getBenefits );
router.get( '/benefits/:Proyecto/:CedulaEmpleador/:Nombre', getBenefitsByName );
router.get( '/myBenefits/:Proyecto/:Email', getEmployeeBenefitsByEmail );
router.get( '/offeredBenefits/:Proyecto/:Email', getOfferedBenefits );
router.post( '/benefits', createBenefit );
router.put( '/benefits/:NombreAntiguo', updateBenefit );
router.put( '/benefits', deactivateBenefit );
router.put( '/benefit/:NombreAntiguo', reactivateBenefit );
router.post( '/myBenefits', linkEmployeeToBenefit );
router.put( '/myBenefits', unlinkEmployeeToBenefit );
router.get( '/validateBenefit/:projectName/:employeeEmail/:benefitToValidate', validateBenefitSuscription );
router.get( '/benefitsStatistics/:CedulaEmpleador/:NombreProyecto', getBenefitsStatistics);

//VoluntaryDeductions
router.get( '/voluntaryDeductions/:NombreProyecto/:CedulaEmpleador', getVoluntaryDeductions );
router.get( '/voluntaryDeductions/:NombreProyecto/:CedulaEmpleador/:Nombre', getVoluntaryDeductionsByName );
router.post( '/voluntaryDeductions', createNewVoluntaryDeduction );
router.put( '/voluntaryDeductions/:NombreAntiguo', updateVoluntaryDeduction );
router.get( '/myVoluntaryDeductions/:Proyecto/:Email', getEmployeeVoluntaryDeductionsByEmail );
router.get( '/offeredVoluntaryDeductions/:Proyecto/:Email', getOfferedVoluntaryDeductions );
router.post( '/myVoluntaryDeductions', linkEmployeeToVoluntaryDeduction );
router.put( '/myVoluntaryDeductions', unlinkEmployeeToVoluntaryDeduction );
router.put( '/voluntaryDeductions', deactivateVoluntaryDeduction );
router.put( '/voluntaryDeduction/:NombreAntiguo', reactivateVoluntaryDeduction );
router.get( '/voluntaryDeductionsStatistics/:CedulaEmpleador/:NombreProyecto', getVoluntaryDeductionsStatistics);

//Payrrolls
router.get('/payrrolls/:Proyecto', getPayrrollsOfAProject);
router.post('/payslipsOfaProject', getAllPayslipsOfAProject);
router.get('/payments/:employerID/:projectNameFilter/:initialDateFilter/:endDateFilter/:idFilter/:contractTypeFilter', getPaymentsMadeByEmployer);
router.get('/totalBenefitsReport/:consecutivoPlanilla', getTotalCostBenefitsEmployer);
router.get('/totalObligatoryDeductionsReport/:consecutivoPlanilla', getTotalCostObligatoryDeductionsEmployer);
router.get('/payslipOblDeductions/:consecutivoPago', getSeparateOblDeductions);
router.get('/payslipVolDeductions/:consecutivoPago', getSeparateVolDeductions);
router.get( '/payrollTotalCosts/:employerID/:projectNameFilter/:initialDateFilter/:endDateFilter', getPayrollTotalCosts );
router.get( '/payrrollStatistics/:CedulaEmpleador/:NombreProyecto', getPayrrollStatistics);

export default router;

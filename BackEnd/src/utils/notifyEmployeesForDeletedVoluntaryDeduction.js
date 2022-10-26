import { emailDeletedVoluntaryDeduction } from "../FormatEmailMessages/EmailDeletedVoluntaryDeduction";
import { sendEmail } from "../services/Mailer";


export const notifyEmployeesForDeletedVoluntaryDeduction = async (employees, voluntaryDeduction, project) => {
  for (let i = 0; i < employees.length; i++) {
    const dataInfoUser = {
      'voluntaryDeduction': voluntaryDeduction,
      'project': project,
      'employer': `${employees[i].NombreEmpleador} ${employees[i].Apellido1Empleador} ${employees[i].Apellido2Empleador}`,
      'employee': `${employees[i].NombreEmpleado} ${employees[i].Apellido1Empleado} ${employees[i].Apellido2Empleado}`,
    };
    let mailFormat = {
      from: process.env.EMAIL_USER,
      to: employees[i].EmailEmpleado,
      subject: `${voluntaryDeduction} voluntary deduction is no longer offered`,
      html: emailDeletedVoluntaryDeduction(dataInfoUser),
    };
    await sendEmail(mailFormat);
  }
}
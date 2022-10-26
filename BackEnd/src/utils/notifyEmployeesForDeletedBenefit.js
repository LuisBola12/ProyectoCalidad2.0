import { emailDeletedBenefit } from "../FormatEmailMessages/EmailDeletedBenefit";
import { sendEmail } from "../services/Mailer";


export const notifyEmployeesForDeletedBenefit = async (employees, benefit, project) => {
  for (let i = 0; i < employees.length; i++) {
    const dataInfoUser = {
      'benefit': benefit,
      'project': project,
      'employer': `${employees[i].NombreEmpleador} ${employees[i].Apellido1Empleador} ${employees[i].Apellido2Empleador}`,
      'employee': `${employees[i].NombreEmpleado} ${employees[i].Apellido1Empleado} ${employees[i].Apellido2Empleado}`,
    };
    let mailFormat = {
      from: process.env.EMAIL_USER,
      to: employees[i].EmailEmpleado,
      subject: `${benefit} benefit is no longer offered`,
      html: emailDeletedBenefit(dataInfoUser),
    };
    await sendEmail(mailFormat);
  }
}
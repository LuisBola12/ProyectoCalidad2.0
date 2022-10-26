export const employerQueries = {
  getAllEmployers: 'Select * From Empleador',
  getEmployerByID: 'Select * From Empleador Where Cedula = @Cedula',
  createNewEmployer: 'Insert into Empleador (Cedula, Nombre, Apellido1, Apellido2, Telefono, Email) values(@Cedula, @Nombre, @Apellido1, @Apellido2, @Telefono, @Email)',
  getAllEmployeesByID: 'Select * From Empleador Where Cedula = @Cedula',
  getEmployerByProjectIDEmployee: `SELECT Emp.Nombre, Emp.Apellido1
  FROM Empleado E
  JOIN EmpleadoYContratoSeAsocianAProyecto ECAP ON E.Cedula = ECAP.CedulaEmpleado
   JOIN Proyecto P ON ECAP.NombreProyecto = P.Nombre
    JOIN Empleador Emp ON P.CedulaEmpleador = Emp.Cedula
  WHERE E.Cedula = @CedEmpleado AND P.Nombre = @Proyecto`
};
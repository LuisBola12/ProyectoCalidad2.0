export const employeesQueries = {
  getAllEmployees: 'Select e.Nombre, e.Apellido1, e.Apellido2, e.Cedula,e.Email, ecp.TipoContrato from  Empleado e inner join EmpleadoYContratoSeAsocianAProyecto ecp on e.Cedula = ecp.CedulaEmpleado and ecp.NombreProyecto = @Proyecto where ecp.FechaFin > GETDATE();',
  getEmployeeByID: 'Select * From Empleado Where Cedula = @Cedula',
  verifyEmployeeContractProject: 'Select * from EmpleadoYContratoSeAsocianAProyecto ecp where ecp.CedulaEmpleado = @Cedula AND ecp.NombreProyecto = @Proyecto',
  addContractOfAnEmployee: `Insert into EmpleadoYContratoSeAsocianAProyecto 
  values(@Cedula,@TipoJornada,@NombreProyecto,@CedulaEmpleador,@NombreServicio,@SalarioPorHora,
    @FechaInicioContrato,@FechaFinContrato,@ValorServicio)`,
  getEmployeesWithContractsOnOtherProyects: `Select E.Cedula, E.Nombre, E.Apellido1, E.Apellido2, ECP.NombreProyecto,ECP.TipoContrato from Empleado E 
  inner join EmpleadoYContratoSeAsocianAProyecto ECP on ECP.CedulaEmpleado = E.Cedula
  inner join Proyecto PR on PR.Nombre = ECP.NombreProyecto
  inner join Empleador EP on EP.Cedula = PR.CedulaEmpleador
  where EP.Email = @Email
  AND E.Cedula NOT IN (
              Select ECP.CedulaEmpleado
            from EmpleadoYContratoSeAsocianAProyecto ECP
            join Empleado E on ECP.CedulaEmpleado = E.Cedula
            join Proyecto P on ECP.NombreProyecto = P.Nombre
            where ECP.NombreProyecto = @Proyecto AND ECP.FechaFin > GETDATE()
          )`,
  createNewEmployee: 'Insert into Empleado (Cedula, Nombre, Apellido1, Apellido2, Telefono, Email) values(@Cedula, @Nombre, @Apellido1, @Apellido2, @Telefono, @Email)',
  contractExistentEmployee: `Insert into EmpleadoYContratoSeAsocianAProyecto values (@Cedula,@TipoJornada,@NombreProyecto,@CedulaEmpleador,
    @NombreServicio,@SalarioPorHora,@FechaInicioContrato,@FechaFinContrato,@ValorServicio)`,
  deleteEmployeeFromProject: 'Delete from EmpleadoYContratoSeAsocianAProyecto where CedulaEmpleado = @Cedula and NombreProyecto = @NombreProyecto',
  insertHours: 'EXEC ingresarHoras @Email = @EmailEmpleado , @Proyecto = @ProyectoEmpleado, @Fecha = @FechaEmpleado, @CantidadHoras = @CantHorasEmpleado',
  getActiveEmployeesInfo: 'SELECT * FROM [SeleMiracleRun].[dbo].[EmpleadoYContratoSeAsocianAProyecto] WHERE FechaFin > GETDATE() AND NombreProyecto = @projectName',
  updateEmployee: 'Update Empleado set Nombre= @Nombre, Apellido1= @Apellido1 ,Apellido2= @Apellido2,Telefono= @Telefono Where Cedula= @Cedula',
  updateEmployeer: 'Update Empleador set Nombre= @Nombre, Apellido1= @Apellido1 ,Apellido2= @Apellido2,Telefono= @Telefono Where Cedula= @Cedula',
  udpateEmail: 'Update Usuarios set Email = @Email where Email = @EmailViejo',
  getPaymentsOfEmployee: `SELECT pa.ConsecutivoPago, pa.ConsecutivoPlanilla, pa.CedulaEmpleado, pa.MontoTotalDeduccionesObligatoriasEmpleado,
  pa.MontoTotalDeduccionesVoluntarias,
  pa.SalarioBruto, pa.SalarioNeto, pl.FechaIncio, pl.FechaFin, e.SalarioPorHoras, 
  e.TipoContrato, e.ValorDeServicio
  FROM [Pago] pa JOIN Planilla pl ON pl.Consectivo = pa.ConsecutivoPlanilla
    JOIN Empleado ON Empleado.Cedula = pa.CedulaEmpleado 
    JOIN EmpleadoYContratoSeAsocianAProyecto e ON e.CedulaEmpleado = Empleado.Cedula AND e.NombreProyecto = pl.NombreProyecto
  WHERE Empleado.Email = @employeeEmail
  AND pl.NombreProyecto = @projectName`,
  getAllPaymentsOfEmployee: `SELECT pl.NombreProyecto, pa.ConsecutivoPago, pa.ConsecutivoPlanilla, pa.CedulaEmpleado, pa.MontoTotalDeduccionesObligatoriasEmpleado,
  pa.MontoTotalDeduccionesVoluntarias,
  pa.SalarioBruto, pa.SalarioNeto, pl.FechaIncio, pl.FechaFin, e.SalarioPorHoras, 
  e.TipoContrato, e.ValorDeServicio
  FROM [Pago] pa JOIN Planilla pl ON pl.Consectivo = pa.ConsecutivoPlanilla
    JOIN Empleado ON Empleado.Cedula = pa.CedulaEmpleado 
    JOIN EmpleadoYContratoSeAsocianAProyecto e ON e.CedulaEmpleado = Empleado.Cedula AND e.NombreProyecto = pl.NombreProyecto
  WHERE Empleado.Email = @employeeEmail
  order by pl.FechaFin`,
  getHours: `select * 
  from HorasRegistradas
  where CedulaEmpleado = @CedulaEmpleado and NombreProyecto = @NombreProyecto
  order by Fecha desc`,
};



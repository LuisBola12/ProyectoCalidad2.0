export const projectQueries = {
  // Project queries
  getProjectsByEmail:
    `SELECT Proyecto.[Nombre] FROM Empleador 
    JOIN Proyecto ON Proyecto.CedulaEmpleador = Empleador.Cedula 
    WHERE Empleador.Email =@Email AND Proyecto.Activo = 1`,

  getProjectsByEmailAndName:
    `SELECT Proyecto.[Nombre] FROM Empleador 
    JOIN Proyecto ON Proyecto.CedulaEmpleador = Empleador.Cedula 
    WHERE Empleador.Email =@email AND Proyecto.Nombre = @projectName and Proyecto.Activo = 1`,

  createProject:
    `DECLARE @cedulaObtenida VARCHAR(9);
    SELECT  @cedulaObtenida = Empleador.Cedula FROM Empleador
    JOIN Usuarios on Empleador.Email = Usuarios.Email
    WHERE Empleador.Email =  @email
    INSERT into Proyecto(Nombre,CedulaEmpleador,TipoPeriodo,Descripcion
      ,Activo,MontoMaximoBeneficiosEmpleado,CantidadMaximaBeneficiosEmpleado) 
      values (@projectName,@cedulaObtenida, @paymentPeriod, @description
      ,1,@maxBenefitsMoneyAmount,@maxBenefitsQuantity)`,

  getEmployeeWorkingInformation:
    `SELECT [CedulaEmpleado]
    ,[TipoContrato]
    ,[NombreProyecto] 
    ,[SalarioPorHoras]
    ,[FechaInicio]
    ,[FechaFin]
    ,[ValorDeServicio]
    ,[TipoPeriodo]
    FROM [EmpleadoYContratoSeAsocianAProyecto] empyc
    JOIN [Proyecto] p ON p.Nombre = empyc.NombreProyecto 
    WHERE [NombreProyecto] = @projectName`,

  getHourlyEmployeeWorkedHours:
    `
    set implicit_transactions off;
    set transaction isolation level serializable;
    begin transaction t1;
    SELECT [CedulaEmpleado]
    ,[NombreProyecto]
    ,[Cantidad]
    ,[Fecha] FROM [SeleMiracleRun].[dbo].[HorasRegistradas]
    WHERE NombreProyecto = @projectName AND CedulaEmpleado = @employeeId
    commit transaction t1;
    ` ,


  getEmployeeProjectsByEmail: `SELECT P.[Nombre] FROM EmpleadoYContratoSeAsocianAProyecto ep
    JOIN Proyecto p ON p.Nombre =ep.NombreProyecto 
    JOIN Empleado e on e.Cedula = ep.CedulaEmpleado
    JOIN Usuarios u on e.Email = u.Email 
    WHERE e.Email = @Email and p.Activo = 1`,

  getAllContracts: 'Select TipoJornada from Contrato',
  createNewPayroll: 'Insert into Planilla values(@CedulaEmpleador,@FechaInicio,@FechaFin,@NombreProyecto,@CedulaEmpleador)',
  logicalEraseProject: `UPDATE Proyecto 
  SET Activo = 0
  WHERE Nombre = @projectName AND CedulaEmpleador =@employerID`,
  getProjectByName: 'Select * FROM Proyecto WHERE Proyecto.Nombre = @projectName',
  updateProject: 'Update Proyecto set Nombre= @projectName, TipoPeriodo= @paymentPeriod WHERE Nombre =@oldProjectName AND CedulaEmpleador = @employerID',
  getAllEmployeesContactInfo:
    `Select e.Nombre, e.Apellido1, e.Apellido2, e.Cedula,e.Email, ecp.TipoContrato from  Empleado e 
    inner join EmpleadoYContratoSeAsocianAProyecto ecp on e.Cedula = ecp.CedulaEmpleado 
    where ecp.FechaFin > GETDATE() AND ecp.NombreProyecto = @projectName AND ecp.CedulaEmpleador = @employerID;`,

  getSumOfGrossSalariesByProject: `Select sum(SalarioBruto) From Pago Where ConsecutivoPlanilla = '19'`,
  getCountEmployeesByType: `SELECT count(CedulaEmpleado) as EmployeeCount
      ,[TipoContrato] as ContractType
  FROM [SeleMiracleRun].[dbo].[EmpleadoYContratoSeAsocianAProyecto]
  WHERE CedulaEmpleador  = @employerID and NombreProyecto = @projectName
  GROUP BY TipoContrato`
  };

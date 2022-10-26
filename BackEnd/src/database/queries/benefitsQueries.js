export const benefitsQueries = {
  getBenefits: 'Select * from Beneficios b where NombreProyecto = @Proyecto and CedulaEmpleador = @CedulaEmpleador and b.Activo = \'true\'',
  getBenefitsByName: 'select Nombre from Beneficios where Nombre = @Nombre and NombreProyecto = @Proyecto and CedulaEmpleador = @CedulaEmpleador',
  createBenefit: 'Insert into Beneficios (Nombre, NombreProyecto, CedulaEmpleador, CostoActual, Descripción, Activo) values (@Nombre, @NombreProyecto,@CedulaEmpleador,@CostoActual, @Descripción, \'true\')',
  editBenefit: 'Update Beneficios set Nombre = @Nombre, CostoActual = @CostoActual, Descripción = @Descripción where NombreProyecto=@NombreProyecto and CedulaEmpleador = @CedulaEmpleador and Nombre=@NombreAntiguo and Activo = \'true\'',
  reactivateBenefit: 'Update Beneficios set Nombre = @Nombre, Activo = 1 where NombreProyecto=@NombreProyecto and CedulaEmpleador = @CedulaEmpleador and Nombre=@NombreAntiguo',
  getBenefitInfo: 'SELECT * FROM Beneficios  WHERE NombreProyecto = @projectName AND  Nombre = @benefitName',
  benefitUsedInfo:
    `
    SELECT  Empleado.Nombre as EmployeeName, Empleado.Apellido1 as EmployeeLastName
    ,BeneficioElegido.NombreProyecto as ProjectName
    ,count(BeneficioElegido.NombreBeneficio)  as employeeBenefitsQty
    , sum(Beneficios.CostoActual) as moneyAmountUsedByEmployee
    FROM Usuarios
    JOIN Empleado ON Usuarios.Email = Empleado.Email
    JOIN EmpleadoYContratoSeAsocianAProyecto e 
    ON Empleado.Cedula = e.CedulaEmpleado
    JOIN BeneficioElegido ON BeneficioElegido.CedulaEmpleado = Empleado.Cedula and BeneficioElegido.NombreProyecto = e.NombreProyecto
    JOIN Beneficios ON Beneficios.Nombre = BeneficioElegido.NombreBeneficio and 
	Beneficios.NombreProyecto = BeneficioElegido.NombreProyecto and Beneficios.CedulaEmpleador
	= BeneficioElegido.CedulaEmpleador

    WHERE Empleado.Email = 'javmoli045@gmail.com'
    AND BeneficioElegido.fechaFin >  GETDATE()
    AND Beneficios.NombreProyecto = 'Taquería Milagro'
	GROUP BY Empleado.Nombre, Empleado.Apellido1,BeneficioElegido.NombreProyecto
      `,

  benefitsLimits:
    `
    SELECT Proyecto.Nombre as ProjectName
    ,CantidadMaximaBeneficiosEmpleado as maxBenefitsQtyAllowed
    , MontoMaximoBeneficiosEmpleado as maxMoneyAmountAllowed 
    FROM Proyecto 
    WHERE Proyecto.Nombre = @ProjectName 
  `,
  getBenefitsStatistics:
    `SELECT Nombre, COUNT(be.CedulaEmpleado) as empleados from Beneficios b 
    JOIN BeneficioElegido be ON be.NombreBeneficio = b.Nombre
    AND be.NombreProyecto = b.NombreProyecto AND 
    b.CedulaEmpleador = be.CedulaEmpleador
    WHERE b.CedulaEmpleador = @CedulaEmpleador and b.Activo = 1
    AND b.NombreProyecto = @NombreProyecto
    AND be.fechaFin > GETDATE()
    GROUP BY b.Nombre`
};

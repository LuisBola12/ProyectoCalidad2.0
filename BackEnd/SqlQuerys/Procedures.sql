CREATE PROCEDURE ingresarHoras (
				@Email VARCHAR(50),
				@Proyecto VARCHAR(50),
				@Fecha date,
				@CantidadHoras int
) 
AS
BEGIN
	DECLARE @CedulaEmpleado VARCHAR(15)

	select  @CedulaEmpleado = E.Cedula
	from Empleado E
	where E.Email = @Email 
	
	INSERT INTO EmpleadoRegistraHorasEnProyecto(CedulaEmpleado, NombreProyecto, Cantidad, Fecha)
	Values (@CedulaEmpleado, @Proyecto, @CantidadHoras, @Fecha)

END;
---------------------------------------------------------------------------------------------------------------
Create Procedure [dbo].[DeleteAnEmployeeFromAProject] @Cedula varchar(15), @Proyecto varchar(50), @CedulaEmpleador varchar(15)
AS
Begin
    Declare @NumeroDeBeneficios int;
	Declare @FechaFinContrato DateTime;
	Select @FechaFinContrato = ECP.FechaFin from EmpleadoYContratoSeAsocianAProyecto ECP where ECP.CedulaEmpleado = @Cedula and ECP.NombreProyecto = @Proyecto and ECP.CedulaEmpleador = @CedulaEmpleador
    Select @NumeroDeBeneficios = Count(*) from BeneficioElegido
    where CedulaEmpleado = @Cedula and NombreProyecto = @Proyecto and FechaFin > GETDATE() and CedulaEmpleador = @CedulaEmpleador;
    If(@NumeroDeBeneficios > 0)
    Begin
        UPDATE BeneficioElegido set FechaFin = GETDATE()  where CedulaEmpleado =	@Cedula and NombreProyecto = @Proyecto and CedulaEmpleador = @CedulaEmpleador;
    End
    Else
        Begin
            Print 'This Employee doesnt have benefits'
        End

    Declare @NumeroDeDeduccionesVoluntarias int;
    Select @NumeroDeDeduccionesVoluntarias = Count(*) from DeduccionVoluntariaElegida 
    where CedulaEmpleado = @Cedula and NombreProyecto = @Proyecto and FechaFin > GETDATE() and CedulaEmpleador = @CedulaEmpleador;
    If(@NumeroDeDeduccionesVoluntarias > 0)
    Begin
        UPDATE DeduccionVoluntariaElegida set FechaFin = GETDATE()  where CedulaEmpleado =	@Cedula and NombreProyecto = @Proyecto and CedulaEmpleador = @CedulaEmpleador;
    End
    Else
        Begin
            Print 'This Employee doesnt have Voluntary Deductions'
        End
    UPDATE EmpleadoYContratoSeAsocianAProyecto set FechaFin = GETDATE()  where CedulaEmpleado =	@Cedula and NombreProyecto = @Proyecto and CedulaEmpleador = @CedulaEmpleador;
End
---------------------------------------------------------------------------------------------------------------
CREATE PROCEDURE obtenerDatosUsuario (
				@Email VARCHAR(50),
				@Contrasenia VARCHAR(20)
) 
AS
BEGIN
	DECLARE @Resultados table(Cedula VARCHAR(15), Nombre VARCHAR(15), Apellido1 VARCHAR(15), Apellido2 VARCHAR(15),Email VARCHAR(50), Roles VARCHAR(20), Verificado BIT)
	DECLARE @Cedula VARCHAR(15), @Nombre VARCHAR(15), @Apellido1 VARCHAR(15), @Apellido2 VARCHAR(15), @EmailEmp VARCHAR(50), @Roles VARCHAR(20), @Verificado BIT

	SELECT @Roles = U.Roles, @Verificado = U.Verificado
	FROM Usuarios U
	WHERE U.Email = @Email AND U.Contrasenia = @Contrasenia

	IF (@Roles = 'admin')
		BEGIN
			SELECT @Cedula = E.Cedula, @Nombre = E.Nombre, @Apellido1 = E.Apellido1, @Apellido2 = E.Apellido2, @EmailEmp = E.Email
			FROM Empleador E
			WHERE E.Email = @Email
		END;
	ELSE
		BEGIN
			IF (@Roles = 'emp')
		
			BEGIN
			SELECT  @Cedula = E.Cedula, @Nombre = E.Nombre, @Apellido1 = E.Apellido1, @Apellido2 = E.Apellido2, @EmailEmp = E.Email
			FROM Empleado E 
			WHERE E.Email = @Email
		END;
		
	END;

	INSERT INTO @Resultados(Cedula, Nombre, Apellido1, Apellido2, Email, Roles, Verificado)
	VALUES(@Cedula, @Nombre, @Apellido1, @Apellido2, @EmailEmp, @Roles, @Verificado)

	SELECT * FROM @Resultados WHERE Cedula IS NOT NULL;
END;
---------------------------------------------------------------------------------------------------------------
CREATE PROCEDURE vincularBeneficioEmpleado 
  @Email VARCHAR(50),
  @NombreBeneficio VARCHAR(50),
  @NombreProyecto VARCHAR(50)
as 
BEGIN
  DECLARE @cedulaEmpleado VARCHAR(15);
  DECLARE @CedulaEmpleador VARCHAR(15);
  DECLARE @fechaFin DATETIME;
  DECLARE @fechaInicio DATETIME;

  SET @fechaInicio = GETDATE();
  SELECT @cedulaEmpleado = Cedula From Empleado WHERE Email = @Email;
  SELECT @fechaFin = FechaFin from EmpleadoYContratoSeAsocianAProyecto ec
  WHERE ec.CedulaEmpleado = @cedulaEmpleado and ec.NombreProyecto = @NombreProyecto;

  SELECT @CedulaEmpleador = CedulaEmpleador from EmpleadoYContratoSeAsocianAProyecto
  where CedulaEmpleado = @cedulaEmpleado and NombreProyecto = @NombreProyecto
  
  INSERT INTO BeneficioElegido VALUES 
  (@cedulaEmpleado, @NombreBeneficio, @NombreProyecto, @CedulaEmpleador, @fechaInicio, @fechaFin);

END;
---------------------------------------------------------------------------------------------------------------
CREATE PROCEDURE getEmployeeBenefits 
  @Email VARCHAR(50),
  @Proyecto VARCHAR(50)
as 
BEGIN
  DECLARE @fechaFin DATETIME;
  DECLARE @cedula VARCHAR(15);

  SELECT @cedula = Cedula From Empleado WHERE Email = @Email;

  SELECT be.NombreBeneficio, b.CostoActual, b.Descripción from Empleado e
  JOIN BeneficioElegido be on e.Cedula = be.CedulaEmpleado
  JOIN Beneficios b on be.NombreBeneficio = b.Nombre and be.NombreProyecto = b.NombreProyecto
  JOIN Proyecto p on b.NombreProyecto = p.Nombre 
  where e.Email = @Email and p.Nombre = @Proyecto and be.fechaFin > GETDATE();
  
END;
---------------------------------------------------------------------------------------------------------------
CREATE PROCEDURE getOfferedBenefits 
  @Email VARCHAR(50),
  @Proyecto VARCHAR(50)
AS 
BEGIN
  DECLARE @cedulaEmpleado VARCHAR(15);
  DECLARE @cedulaEmpleador VARCHAR(15);

  SELECT @cedulaEmpleado = Cedula From Empleado WHERE Email = @Email;
  SELECT @CedulaEmpleador = CedulaEmpleador from EmpleadoYContratoSeAsocianAProyecto
  where CedulaEmpleado = @cedulaEmpleado and NombreProyecto = @Proyecto

  DECLARE @offeredBenefits TABLE(Nombre VARCHAR(50), CostoActual real, Descripción VARCHAR(300));
  INSERT into @offeredBenefits EXEC getEmployeeBenefits @Email = @Email, @Proyecto = @Proyecto;
  SELECT b.Nombre, b.CostoActual, b.Descripción from Beneficios b where b.NombreProyecto = @Proyecto and b.CedulaEmpleador = @cedulaEmpleador
  and b.Nombre not in (select Nombre from @offeredBenefits) and b.Activo = 'True'
END;
GO
---------------------------------------------------------------------------------------------------------------
CREATE PROCEDURE ObtenerDeduccionesObligatorias(
				@CedulaEmpleado VARCHAR(15),
				@Proyecto VARCHAR(50)
)
AS
BEGIN
	SELECT DO.Nombre, DO.PorcentajeEmpleado, DO.PorcentajeEmpleador
	FROM Empleado E
		JOIN EmpleadoYContratoSeAsocianAProyecto ECAP ON E.Cedula = ECAP.CedulaEmpleado
			JOIN Contrato C ON ECAP.TipoContrato = C.TipoJornada 
				JOIN ContratoSujetoADeduccionesObligatorias CSDO ON C.TipoJornada = CSDO.TipoJornada
					JOIN DeduccionesObligatorias DO ON CSDO.NombreDeduccionObligatoria = DO.Nombre
	WHERE E.Cedula = @CedulaEmpleado AND ECAP.NombreProyecto = @Proyecto
END;
---------------------------------------------------------------------------------------------------------------
CREATE PROCEDURE vincularDeduccionVoluntariaEmpleado 
  @Email VARCHAR(50),
  @NombreDeduccionVoluntaria VARCHAR(50),
  @NombreProyecto VARCHAR(50)
as 
BEGIN
	DECLARE @cedulaEmpleado VARCHAR(15);
  DECLARE @CedulaEmpleador VARCHAR(15);
  DECLARE @fechaFin DATETIME;
  DECLARE @fechaInicio DATETIME;

  SET @fechaInicio = GETDATE();
  SELECT @cedulaEmpleado = Cedula From Empleado WHERE Email = @Email;
  SELECT @fechaFin = FechaFin from EmpleadoYContratoSeAsocianAProyecto ec
  WHERE ec.CedulaEmpleado = @cedulaEmpleado and ec.NombreProyecto = @NombreProyecto;

	SELECT @CedulaEmpleador = CedulaEmpleador from EmpleadoYContratoSeAsocianAProyecto
  where CedulaEmpleado = @cedulaEmpleado and NombreProyecto = @NombreProyecto
 
  INSERT INTO DeduccionVoluntariaElegida VALUES 
  (@cedulaEmpleado, @NombreDeduccionVoluntaria, @CedulaEmpleador, @NombreProyecto, @fechaInicio, @fechaFin);

END;
---------------------------------------------------------------------------------------------------------------
CREATE PROCEDURE getEmployeeVoluntaryDeductions 
  @Email VARCHAR(50),
  @Proyecto VARCHAR(50)
as 
BEGIN
  DECLARE @fechaFin DATETIME;
  DECLARE @cedula VARCHAR(15);

  SELECT @cedula = Cedula From Empleado WHERE Email = @Email;

  SELECT dve.NombreDeduccionVoluntaria, dv.Costo, dv.Descripcion from Empleado e
  JOIN DeduccionVoluntariaElegida dve on e.Cedula = dve.CedulaEmpleado
  JOIN DeduccionesVoluntarias dv on dve.NombreDeduccionVoluntaria = dv.Nombre and dve.NombreProyecto = dv.NombreProyecto
  JOIN Proyecto p on dv.NombreProyecto = p.Nombre 
  where e.Email = @Email and p.Nombre = @Proyecto and dve.fechaFin > GETDATE();
  
END;
---------------------------------------------------------------------------------------------------------------
CREATE PROCEDURE getOfferedVoluntaryDeductions 
  @Email VARCHAR(50),
  @Proyecto VARCHAR(50)
AS 
BEGIN
	DECLARE @cedulaEmpleado VARCHAR(15);
  DECLARE @cedulaEmpleador VARCHAR(15);

	SELECT @cedulaEmpleado = Cedula From Empleado WHERE Email = @Email;
  SELECT @CedulaEmpleador = CedulaEmpleador from EmpleadoYContratoSeAsocianAProyecto
  where CedulaEmpleado = @cedulaEmpleado and NombreProyecto = @Proyecto

  DECLARE @offeredVoluntaryDeductions TABLE(Nombre VARCHAR(50), Costo real, Descripcion VARCHAR(300));
  INSERT into @offeredVoluntaryDeductions EXEC getEmployeeVoluntaryDeductions @Email = @Email, @Proyecto = @Proyecto;
  SELECT dv.Nombre, dv.Costo, dv.Descripcion from DeduccionesVoluntarias dv where dv.NombreProyecto = @Proyecto and dv.CedulaEmpleador = @cedulaEmpleador
  and dv.Nombre not in (select Nombre from @offeredVoluntaryDeductions)  and dv.Activo = 'True'
END;
GO
---------------------------------------------------------------------------------------------------------------
CREATE PROCEDURE desvincularDeduccionVoluntariaDeEmpleado (
  @Email VARCHAR(50),
  @Proyecto VARCHAR(50),
  @NombreDeduccionVoluntaria VARCHAR(50)
) AS
BEGIN
  DECLARE @cedulaEmpleado CHAR(15);
  DECLARE @cedulaEmpleador CHAR(15);
  DECLARE @fechaInicioDeduccionVoluntaria DATETIME;

  SELECT @cedulaEmpleado = Cedula FROM Empleado WHERE Email = @Email;

	SELECT @cedulaEmpleador = CedulaEmpleador from EmpleadoYContratoSeAsocianAProyecto
  where CedulaEmpleado = @cedulaEmpleado and NombreProyecto = @Proyecto

  SELECT @fechaInicioDeduccionVoluntaria = fechaInicio FROM DeduccionVoluntariaElegida dve
  WHERE dve.CedulaEmpleado = @cedulaEmpleado AND dve.NombreProyecto = @Proyecto AND 
  NombreDeduccionVoluntaria = @NombreDeduccionVoluntaria AND fechaFin > GETDATE()

  UPDATE DeduccionVoluntariaElegida SET fechaFin = GETDATE()
  WHERE CedulaEmpleado = @cedula AND NombreProyecto = @Proyecto AND 
  NombreDeduccionVoluntaria = @NombreDeduccionVoluntaria AND fechaInicio = @fechaInicioDeduccionVoluntaria
	AND CedulaEmpleador = @cedulaEmpleador
END;
---------------------------------------------------------------------------------------------------------------
CREATE PROCEDURE desvincularBeneficioDeEmpleado (
  @Email VARCHAR(50),
  @Proyecto VARCHAR(50),
  @NombreBeneficio VARCHAR(50)
) AS
BEGIN
  DECLARE @cedulaEmpleado CHAR(15);
  DECLARE @cedulaEmpleador CHAR(15);
  DECLARE @fechaInicioBeneficio DATETIME;

  SELECT @cedulaEmpleado = Cedula FROM Empleado WHERE Email = @Email;

  SELECT @CedulaEmpleador = CedulaEmpleador from EmpleadoYContratoSeAsocianAProyecto
  where CedulaEmpleado = @cedulaEmpleado and NombreProyecto = @Proyecto

  SELECT @fechaInicioBeneficio = fechaInicio FROM BeneficioElegido be
  WHERE be.CedulaEmpleado = @cedulaEmpleado AND be.NombreProyecto = @Proyecto AND 
  NombreBeneficio = @NombreBeneficio AND fechaFin > GETDATE()



  UPDATE BeneficioElegido SET fechaFin = GETDATE()
  WHERE CedulaEmpleado = @cedulaEmpleado AND NombreProyecto = @Proyecto AND 
  NombreBeneficio = @NombreBeneficio AND fechaInicio = @fechaInicioBeneficio
  and CedulaEmpleador = @cedulaEmpleador

END;
GO
---------------------------------------------------------------------------------------------------------------
CREATE PROCEDURE ObtenerBeneficiosEmpleado(
				@CedulaEmpleado VARCHAR(15),
				@Proyecto VARCHAR(50)
)
AS
BEGIN
	SELECT P.CedulaEmpleador, B.Nombre, P.Nombre, B.CostoActual
	FROM Empleado E 
		JOIN BeneficioElegido BE ON E.Cedula = BE.CedulaEmpleado
			JOIN Beneficios B ON	BE.NombreBeneficio = B.Nombre and
												BE.NombreProyecto = B.NombreProyecto		
				JOIN Proyecto P ON B.NombreProyecto = P.Nombre
	where E.Cedula = @CedulaEmpleado AND P.Nombre = @Proyecto AND BE.FechaFin > GETDATE()
END;
---------------------------------------------------------------------------------------------------------------
CREATE PROCEDURE insertarBeneficiosEnPago (
				@CedulaEmpleado VARCHAR(15),
				@Proyecto VARCHAR(50),
				@ConsecutivoPlanilla int,
				@ConsecutivoPago int
) 
AS
BEGIN
	DECLARE @Resultados TABLE(CedulaEmpleador VARCHAR(15),NombreBeneficio VARCHAR(50), NombreProyecto VARCHAR(50), CostoBeneficio real)
	DECLARE @CedulaEmpleador VARCHAR(15), @NombreBeneficio VARCHAR(50), @NombreProyecto VARCHAR(50), @CostoBeneficio real
	INSERT INTO @Resultados EXEC ObtenerBeneficiosEmpleado @CedulaEmpleado = @CedulaEmpleado, @Proyecto = @Proyecto

	DECLARE cursor__ CURSOR FOR
	SELECT R.CedulaEmpleador, R.NombreBeneficio, R.NombreProyecto, R.CostoBeneficio
	FROM @Resultados R;
	OPEN cursor__

	FETCH NEXT FROM cursor__ INTO @CedulaEmpleador , @NombreBeneficio , @NombreProyecto , @CostoBeneficio
	WHILE @@FETCH_STATUS = 0 
		BEGIN
			INSERT INTO PagoContieneBeneficios(ConsecutivoPlanilla, CedulaEmpleador, ConsecutivoPago, NombreBeneficio, NombreProyecto, MontoBeneficio)
			VALUES (@ConsecutivoPlanilla, @CedulaEmpleador, @ConsecutivoPago, @NombreBeneficio, @NombreProyecto, @CostoBeneficio)
		
			FETCH NEXT FROM cursor__ INTO @CedulaEmpleador , @NombreBeneficio , @NombreProyecto , @CostoBeneficio
		END;
	CLOSE cursor__
	DEALLOCATE cursor__

	DECLARE @MontoTotalBeneficios real = 0, @MontoTotalBeneficiosTemp real
	SELECT @MontoTotalBeneficiosTemp = SUM(R.CostoBeneficio)
	FROM @Resultados R
	
	IF (@MontoTotalBeneficiosTemp > 0)
	BEGIN
		PRINT('Empleado si tienen deducciones voluntarias')
		SET @MontoTotalBeneficios = @MontoTotalBeneficiosTemp
	END;

	UPDATE PAGO 
	SET MontoTotalBeneficios = @MontoTotalBeneficios
	WHERE ConsecutivoPago = @ConsecutivoPago AND ConsecutivoPlanilla = @ConsecutivoPlanilla AND CedulaEmpleado = @CedulaEmpleado

END;
---------------------------------------------------------------------------------------------------------------
CREATE PROCEDURE ObtenerDeduccionesVoluntariasEmpleado(
				@CedulaEmpleado VARCHAR(15),
				@Proyecto VARCHAR(50)
)
AS
BEGIN
	SELECT P.CedulaEmpleador, DV.Nombre, P.Nombre, DV.Costo
	FROM Empleado E
		JOIN DeduccionVoluntariaElegida DVE ON E.Cedula = DVE.CedulaEmpleado
			JOIN DeduccionesVoluntarias DV ON	DVE.NombreDeduccionVoluntaria = DV.Nombre and
												DVE.NombreProyecto = DV.NombreProyecto		
				JOIN Proyecto P ON DV.NombreProyecto = P.Nombre
	where E.Cedula = @CedulaEmpleado AND P.Nombre = @Proyecto AND DVE.FechaFin > GETDATE()
END;
---------------------------------------------------------------------------------------------------------------
CREATE PROCEDURE insertarDeduccionesVoluntariasEnPago (
				@CedulaEmpleado VARCHAR(15),
				@Proyecto VARCHAR(50),
				@ConsecutivoPlanilla int,
				@ConsecutivoPago int
) 
AS
BEGIN
	DECLARE @Resultados TABLE(CedulaEmpleador VARCHAR(15),NombreDeduccionVoluntaria VARCHAR(50), NombreProyecto VARCHAR(50), CostoDeduccionVoluntaria real)
	DECLARE @CedulaEmpleador VARCHAR(15), @NombreDeduccionVoluntaria VARCHAR(50), @NombreProyecto VARCHAR(50), @CostoDeduccionVoluntaria real
	INSERT INTO @Resultados EXEC ObtenerDeduccionesVoluntariasEmpleado @CedulaEmpleado = @CedulaEmpleado, @Proyecto = @Proyecto

	DECLARE cursor__ CURSOR FOR
	SELECT R.CedulaEmpleador, R.NombreDeduccionVoluntaria, R.NombreProyecto, R.CostoDeduccionVoluntaria
	FROM @Resultados R;
	OPEN cursor__

	FETCH NEXT FROM cursor__ INTO @CedulaEmpleador , @NombreDeduccionVoluntaria , @NombreProyecto , @CostoDeduccionVoluntaria
	WHILE @@FETCH_STATUS = 0 
		BEGIN
			INSERT INTO PagoPoseeDeduccionesVoluntarias(ConsecutivoPlanilla, CedulaEmpleador, ConsecutivoPago, NombreDeduccion, NombreProyecto, MontoDeduccion)
			VALUES (@ConsecutivoPlanilla, @CedulaEmpleador, @ConsecutivoPago, @NombreDeduccionVoluntaria, @NombreProyecto, @CostoDeduccionVoluntaria)
		
			FETCH NEXT FROM cursor__ INTO @CedulaEmpleador , @NombreDeduccionVoluntaria , @NombreProyecto , @CostoDeduccionVoluntaria
		END;

	CLOSE cursor__
	DEALLOCATE cursor__

	DECLARE @MontoTotalDeduccionesVoluntarias real = 0, @MontoTotalDeduccionesVoluntariasTemp real
	SELECT @MontoTotalDeduccionesVoluntariasTemp = SUM(R.CostoDeduccionVoluntaria)
	FROM @Resultados R
	
	IF (@MontoTotalDeduccionesVoluntariasTemp > 0)
	BEGIN
		PRINT('Empleado si tienen deducciones voluntarias')
		SET @MontoTotalDeduccionesVoluntarias = @MontoTotalDeduccionesVoluntariasTemp
	END;

	UPDATE PAGO 
	SET MontoTotalDeduccionesVoluntarias = @MontoTotalDeduccionesVoluntarias
	WHERE ConsecutivoPago = @ConsecutivoPago AND ConsecutivoPlanilla = @ConsecutivoPlanilla AND CedulaEmpleado = @CedulaEmpleado

END;
---------------------------------------------------------------------------------------------------------------
CREATE PROCEDURE eliminarBeneficio (
		@NombreBeneficio VARCHAR(50),
		@Proyecto VARCHAR(50),
		@CedulaEmpleador VARCHAR(15)
) 
AS
BEGIN

  UPDATE Beneficios SET Activo = 'false' WHERE Nombre = @NombreBeneficio AND NombreProyecto = @Proyecto 
  AND CedulaEmpleador = @CedulaEmpleador;
	
  UPDATE BeneficioElegido SET fechaFin = GETDATE() WHERE NombreBeneficio = @NombreBeneficio 
  AND NombreProyecto = @Proyecto AND fechaFin > GETDATE() AND CedulaEmpleador = @CedulaEmpleador;

  update Beneficios set Nombre = CONCAT(Nombre, '*') where Nombre like '%' + @NombreBeneficio + '%' 
  AND NombreProyecto = @Proyecto AND CedulaEmpleador = @CedulaEmpleador;
  
  SELECT e.Nombre NombreEmpleado, e.Apellido1 Apellido1Empleado, e.Apellido2 Apellido2Empleado, e.Email EmailEmpleado,
  ep.Nombre NombreEmpleador, ep.Apellido1 Apellido1Empleador, ep.Apellido2 Apellido2Empleador
  FROM Empleado e JOIN EmpleadoYContratoSeAsocianAProyecto ecp 
  on e.Cedula = ecp.CedulaEmpleado JOIN Proyecto p on p.Nombre = ecp.NombreProyecto
  JOIN Empleador ep on ep.Cedula = p.CedulaEmpleador 
  WHERE ecp.NombreProyecto = @Proyecto AND ep.Cedula = @CedulaEmpleador
END;
---------------------------------------------------------------------------------------------------------------
Create Procedure conseguirNominaEmpleados (@NombreProyecto varchar(50), @NumeroPagoPlanilla int)
As
	Begin
	Declare @Resultados table(Cedula VARCHAR(15),NombreCompleto VARCHAR(100),TipoContrato VARCHAR(30),HorasTrabajadas int,SalarioPorHora real,SalarioBruto real,
	DeduccionesObligatoriasEmpleador real, DeduccionesObligatoriasEmpleado real,DeduccionesVoluntarias real,Beneficios real,SalarioNeto real)

	Declare @Cedula VARCHAR(15),@NombreCompleto VARCHAR(100),@TipoContrato VARCHAR(30),@HorasTrabajadas int,@SalarioPorHora real,@SalarioBruto real,
	@DeduccionesObligatoriasEmpleador real, @DeduccionesObligatoriasEmpleado real,@DeduccionesVoluntarias real,@Beneficios real,@SalarioNeto real
	DECLARE cursor__ CURSOR FOR
	SELECT p.CedulaEmpleado, p.SalarioBruto, p.SalarioNeto, p.MontoTotalDeduccionesObligatoriasEmpleado,p.MontoTotalDeduccionesObligatoriasEmpleador,
	p.MontoTotalBeneficios,p.MontoTotalDeduccionesVoluntarias
	FROM Pago p
	where p.ConsecutivoPlanilla = @NumeroPagoPlanilla;
	OPEN cursor__

	FETCH NEXT FROM cursor__ INTO @Cedula , @SalarioBruto , @SalarioNeto , @DeduccionesObligatoriasEmpleado,@DeduccionesObligatoriasEmpleador,@Beneficios,@DeduccionesVoluntarias
	WHILE @@FETCH_STATUS = 0 
		BEGIN
			Declare @Nombre varchar(15),@Apellido1 varchar(15), @Apellido2 varchar(15)
			Select @Nombre = Nombre, @Apellido1 = Apellido1, @Apellido2 = Apellido2 from Empleado where Cedula = @Cedula;
			Set @NombreCompleto = @Nombre + ' ' + @Apellido1 + ' ' + @Apellido2

			Declare @FechaInicioPago Date,@FechaFinPago Date
			Select @FechaInicioPago = FechaIncio, @FechaFinPago = FechaFin from Planilla where Consectivo = @NumeroPagoPlanilla
			Print @FechaInicioPago 
			Print @FechaFinPago
			Select @HorasTrabajadas = sum(Cantidad) from HorasRegistradas where Fecha between @FechaInicioPago and @FechaFinPago and  CedulaEmpleado = @Cedula ;
			Select @SalarioPorHora = SalarioPorHoras, @TipoContrato = TipoContrato from EmpleadoYContratoSeAsocianAProyecto  
			where CedulaEmpleado = @Cedula and NombreProyecto = @NombreProyecto 
			INSERT INTO @Resultados values(@Cedula,@NombreCompleto,@TipoContrato,@HorasTrabajadas,@SalarioPorHora,@SalarioBruto,
			@DeduccionesObligatoriasEmpleador,@DeduccionesObligatoriasEmpleado,@DeduccionesVoluntarias,@Beneficios,@SalarioNeto)
			FETCH NEXT FROM cursor__ INTO @Cedula , @SalarioBruto , @SalarioNeto , @DeduccionesObligatoriasEmpleado,@DeduccionesObligatoriasEmpleador,@Beneficios,@DeduccionesVoluntarias
		END;
	Close cursor__
	Deallocate cursor__
	Select * from @Resultados;
	End
Go;
---------------------------------------------------------------------------------------------------------------
CREATE PROCEDURE eliminarDeduccionVoluntaria (
		@NombreDeduccionVoluntaria VARCHAR(50),
		@Proyecto VARCHAR(50)
		@cedulaEmpleador VARCHAR(15);
) 
AS
BEGIN

  UPDATE DeduccionesVoluntarias SET Activo = 'false' WHERE Nombre = @NombreDeduccionVoluntaria AND NombreProyecto = @Proyecto 
  AND CedulaEmpleador = @CedulaEmpleador;
	
  UPDATE DeduccionVoluntariaElegida SET fechaFin = GETDATE() WHERE NombreDeduccionVoluntaria = @NombreDeduccionVoluntaria 
  AND NombreProyecto = @Proyecto AND fechaFin > GETDATE() AND CedulaEmpleador = @CedulaEmpleador;

  update DeduccionesVoluntarias set Nombre = CONCAT(Nombre, '*') where Nombre like '%' + @NombreDeduccionVoluntaria + '%' 
  AND NombreProyecto = @Proyecto AND CedulaEmpleador = @CedulaEmpleador;
  
  SELECT e.Nombre NombreEmpleado, e.Apellido1 Apellido1Empleado, e.Apellido2 Apellido2Empleado, e.Email EmailEmpleado,
  ep.Nombre NombreEmpleador, ep.Apellido1 Apellido1Empleador, ep.Apellido2 Apellido2Empleador
  FROM Empleado e JOIN EmpleadoYContratoSeAsocianAProyecto ecp 
  on e.Cedula = ecp.CedulaEmpleado JOIN Proyecto p on p.Nombre = ecp.NombreProyecto
  JOIN Empleador ep on ep.Cedula = p.CedulaEmpleador 
  WHERE ecp.NombreProyecto = @Proyecto AND ep.Cedula = @CedulaEmpleador
END;
---------------------------------------------------------------------------------------------------------------
CREATE PROCEDURE insertarDeduccionesObligatoriasPago (
				@CedulaEmpleado VARCHAR(15),
				@ConsecutivoPlanilla int,
				@ConsecutivoPago int
) 
AS
BEGIN
	DECLARE @MontoTotalEmpleado real, @MontoTotalEmpleador real
	SELECT @MontoTotalEmpleado = SUM(P.MontoEmpleado), @MontoTotalEmpleador= SUM(P.MontoEmpleador)
	FROM PagoAplicaDeduccionesObligatorias P
	WHERE P.ConsecutivoPlanilla = @ConsecutivoPlanilla AND P.ConsecutivoPago = @ConsecutivoPago;

	UPDATE PAGO 
	SET MontoTotalDeduccionesObligatoriasEmpleado = @MontoTotalEmpleado, MontoTotalDeduccionesObligatoriasEmpleador = @MontoTotalEmpleador
	WHERE ConsecutivoPago = @ConsecutivoPago AND ConsecutivoPlanilla = @ConsecutivoPlanilla AND CedulaEmpleado = @CedulaEmpleado
END;
---------------------------------------------------------------------------------------------------------------
Create Procedure [dbo].[DeleteAllEmployees]  @projectName varchar(50), @employerID varchar(15)
AS
Begin
    Declare @NumeroDeBeneficios int;
	Declare @FechaFinContrato DateTime;
	Select @FechaFinContrato = ECP.FechaFin from EmpleadoYContratoSeAsocianAProyecto ECP where  ECP.NombreProyecto = @projectName and ECP.CedulaEmpleador = @employerID
    Select @NumeroDeBeneficios = Count(*) from BeneficioElegido
    where  NombreProyecto = @projectName and FechaFin > GETDATE() and CedulaEmpleador = @employerID;
    If(@NumeroDeBeneficios > 0)
    Begin
        UPDATE BeneficioElegido set FechaFin = GETDATE()  where  NombreProyecto = @projectName and CedulaEmpleador = @employerID;
    End
    Else
        Begin
            Print 'This Employee doesnt have benefits'
        End

    Declare @NumeroDeDeduccionesVoluntarias int;
    Select @NumeroDeDeduccionesVoluntarias = Count(*) from DeduccionVoluntariaElegida 
    where  NombreProyecto = @projectName and FechaFin > GETDATE() and CedulaEmpleador = @employerID;
    If(@NumeroDeDeduccionesVoluntarias > 0)
    Begin
        UPDATE DeduccionVoluntariaElegida set FechaFin = GETDATE()  where NombreProyecto = @projectName and CedulaEmpleador = @employerID;
    End
    Else
        Begin
            Print 'This Employee doesnt have Voluntary Deductions'
        End
    UPDATE EmpleadoYContratoSeAsocianAProyecto set FechaFin = GETDATE()  where  NombreProyecto = @projectName and CedulaEmpleador = @employerID;
End
---------------------------------------------------------------------------------------------------------------

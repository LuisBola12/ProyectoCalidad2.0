CREATE TRIGGER AgregarEmpleado
ON Empleado INSTEAD OF INSERT
AS
    DECLARE @Cedula varchar(15), @Email varchar(50), @Nombre varchar(12), @Apellido1 varchar(12), @Apellido2 varchar(12), @Telefono char(8)
    SELECT @Cedula = I.Cedula, @Email = I.Email, @Nombre = I.Nombre, @Apellido1 = I.Apellido1, @Apellido2 = I.Apellido2, @Telefono = I.Telefono
    FROM inserted I;

    IF EXISTS (SELECT * FROM Empleador WHERE Cedula = @Cedula)
    BEGIN
        Rollback TRAN;
        Raiserror('ERROR MESSAGE! There is already an employeer with that id',16,1);
    END;
    ELSE
    BEGIN
        insert into Empleado (Cedula, Email, Nombre, Apellido1, Apellido2,Telefono) 
        values ( @Cedula , @Email, @Nombre, @Apellido1, @Apellido2, @Telefono);
    END;
Go;


CREATE TRIGGER AgregarEmpleador
ON Empleador INSTEAD OF INSERT
AS
    DECLARE @Cedula varchar(15), @Email varchar(50), @Nombre varchar(12), @Apellido1 varchar(12), @Apellido2 varchar(12), @Telefono char(8)
    SELECT @Cedula = I.Cedula, @Email = I.Email, @Nombre = I.Nombre, @Apellido1 = I.Apellido1, @Apellido2 = I.Apellido2, @Telefono = I.Telefono
    FROM inserted I;

    IF EXISTS (SELECT * FROM Empleado WHERE Cedula = @Cedula)
    BEGIN
        Rollback TRAN;
        Raiserror('ERROR MESSAGE! There is already an employee with that id',16,1);
    END;
    ELSE
    BEGIN
        insert into Empleador(Cedula, Email, Nombre, Apellido1, Apellido2,Telefono) 
        values ( @Cedula , @Email, @Nombre, @Apellido1, @Apellido2, @Telefono);
    END;
Go;

CREATE TRIGGER [dbo].[AgregarEmpleadoYaDespedido]
ON [dbo].[EmpleadoYContratoSeAsocianAProyecto] INSTEAD OF INSERT
AS
    DECLARE @Cedula varchar(15), @TipoContrato varchar(30), @NombreProyecto varchar(50), @CedulaEmpleador varchar(15), @NombreServicio varchar(50), @SalarioPorHoras float,
	@FechaInicio date, @FechaFin date, @ValorDeServicio real
    SELECT @Cedula = I.CedulaEmpleado, @TipoContrato = I.TipoContrato, @NombreProyecto = I.NombreProyecto, @CedulaEmpleador = I.CedulaEmpleador, @NombreServicio = I.NombreServicio, @SalarioPorHoras = I.SalarioPorHoras,
	@FechaInicio = I.FechaInicio, @FechaFin = I.FechaFin, @ValorDeServicio = I.ValorDeServicio
    FROM inserted I;

    IF EXISTS (SELECT * FROM EmpleadoYContratoSeAsocianAProyecto WHERE CedulaEmpleado = @Cedula and NombreProyecto = @NombreProyecto and CedulaEmpleador = @CedulaEmpleador)
    BEGIN
        update EmpleadoYContratoSeAsocianAProyecto set TipoContrato = @TipoContrato, FechaInicio = @FechaInicio, FechaFin = @FechaFin, SalarioPorHoras = @SalarioPorHoras,
		NombreServicio = @NombreServicio, ValorDeServicio = @ValorDeServicio, CedulaEmpleador = @CedulaEmpleador WHERE CedulaEmpleado = @Cedula AND NombreProyecto = @NombreProyecto AND CedulaEmpleador = @CedulaEmpleador
    END;
    ELSE
    BEGIN
        insert into EmpleadoYContratoSeAsocianAProyecto values ( @Cedula , @TipoContrato, @NombreProyecto, @CedulaEmpleador, @NombreServicio, @SalarioPorHoras,@FechaInicio,@FechaFin,@ValorDeServicio);
    END;
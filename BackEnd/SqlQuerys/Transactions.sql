  --- Transacciones generadas para controlar casos donde el empleado esté agregando horas o agregado o 
  --- quitando beneficios o deducciones voluntarias mientras el empleador está realizando un pago para que 
  --- estos nuevos datos no afecten al resultado del pago a generar.
  ---------------------------------------------------------------------------------------------------------
    set implicit_transactions off;
    set transaction isolation level serializable;
    begin transaction t1;
    SELECT [CedulaEmpleado]
    ,[NombreProyecto]
    ,[Cantidad]
    ,[Fecha] FROM [SeleMiracleRun].[dbo].[HorasRegistradas]
    WHERE NombreProyecto = @projectName AND CedulaEmpleado = @employeeId
    commit transaction t1;


  ---------------------------------------------------------------------------------------------------------
  set implicit_transactions off;
  set transaction isolation level serializable;
  begin transaction t1;
  Select MontoTotalBeneficios from pago where 
  CedulaEmpleado = @Cedula and ConsecutivoPlanilla = @ConsecPlanilla and ConsecutivoPago = @ConsecPago
  commit transaction t1;


  ---------------------------------------------------------------------------------------------------------
  set implicit_transactions off;
  set transaction isolation level serializable;
  begin transaction t1;
  Select MontoTotalDeduccionesVoluntarias from pago where 
  CedulaEmpleado = @Cedula and ConsecutivoPlanilla = @ConsecPlanilla and ConsecutivoPago = @ConsecPago
  commit transaction t1;
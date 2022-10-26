export const payrollQueries = {
  getPeriodos: 'Select * from Periodo',
  getPeriodForAEspecificProject: 'Select TipoPeriodo from Proyecto where Nombre = @Nombre',
  getPayrrollConsecutive: 'Select Consectivo from Planilla where NombreProyecto = @NombreProyecto and FechaIncio = @FechaInicio',
  insertAPayslip: 'INSERT INTO PAGO VALUES(@ConsecutivoPlanilla,@CedulaEmpleador,@CedulaEmpleado,@SalarioBruto,0,0,0,0,0)',
  getTotalCostOfBenefits: `
  set implicit_transactions off;
  set transaction isolation level serializable;
  begin transaction t1;
  Select MontoTotalBeneficios from pago where 
  CedulaEmpleado = @Cedula and ConsecutivoPlanilla = @ConsecPlanilla and ConsecutivoPago = @ConsecPago
  commit transaction t1;
  `,
  getItemizedVolDeductionsOfPayment: `select pcdv.NombreDeduccion, pcdv.MontoDeduccion, p.CedulaEmpleado , p.CedulaEmpleador from Pago p JOIN Empleado e 
  on p.CedulaEmpleado = e.Cedula JOIN PagoPoseeDeduccionesVoluntarias pcdv 
  on p.ConsecutivoPago = pcdv.ConsecutivoPago where pcdv.ConsecutivoPago = @consecutivoPago`,
  getTotalCostOfVolDeductions: `
  set implicit_transactions off;
  set transaction isolation level serializable;
  begin transaction t1;
  Select MontoTotalDeduccionesVoluntarias from pago where 
  CedulaEmpleado = @Cedula and ConsecutivoPlanilla = @ConsecPlanilla and ConsecutivoPago = @ConsecPago
  commit transaction t1;
  `,
  getItemizedOblDeductionsOfPayment: `select pcdo.NombreDeduccionObligatoria, pcdo.MontoEmpleado, p.CedulaEmpleado , p.CedulaEmpleador from Pago p JOIN Empleado e 
  on p.CedulaEmpleado = e.Cedula JOIN PagoAplicaDeduccionesObligatorias pcdo 
  on p.ConsecutivoPago = pcdo.ConsecutivoPago where pcdo.ConsecutivoPago = @consecutivoPago and MontoEmpleado > 0`,
  getTotalCostOfOblDeductions: `Select MontoTotalDeduccionesObligatoriasEmpleado from pago where 
  CedulaEmpleado = @Cedula and ConsecutivoPlanilla = @ConsecPlanilla and ConsecutivoPago = @ConsecPago`,
  insertNetSalaryOfAPayslip: `Update Pago set SalarioNeto = @SalarioNetoEmpleado where CedulaEmpleado = @Cedula 
  and ConsecutivoPlanilla = @ConsecPlanilla and ConsecutivoPago = @ConsecPago`,
  getPaysilipOfAnEmployee: 'select ConsecutivoPago from pago where CedulaEmpleado = @Cedula and ConsecutivoPlanilla = @ConsecPLanilla',
  getPayrrollsOfAproject: 'Select Consectivo,FechaIncio,FechaFin From Planilla Where NombreProyecto = @Proyecto',
  getPaymentsMadeByEmployer:
    `SELECT e.Nombre, e.Apellido1,e.Apellido2, pl.NombreProyecto, p.CedulaEmpleado,ecp.TipoContrato, p.SalarioBruto, p.MontoTotalBeneficios, p.MontoTotalDeduccionesObligatoriasEmpleador,
  p.MontoTotalDeduccionesObligatoriasEmpleado,p.MontoTotalDeduccionesVoluntarias, p.ConsecutivoPago, pl.FechaFin
  FROM [SeleMiracleRun].[dbo].[Pago] p
  JOIN [Empleado] e ON e.Cedula = p.CedulaEmpleado
  JOIN [Planilla] pl ON p.ConsecutivoPlanilla = pl.Consectivo
  JOIN [EmpleadoYContratoSeAsocianAProyecto] ecp ON e.Cedula = ecp.CedulaEmpleado AND pl.NombreProyecto = ecp.NombreProyecto
  WHERE p.CedulaEmpleador = @employerID`,
  getTotalSalaryCost: `	
  select ECP.TipoContrato, SUM(pa.SalarioNeto) as salario 
	from EmpleadoYContratoSeAsocianAProyecto ECP
	join Empleado EM on EM.Cedula = ECP.CedulaEmpleado
	join Pago PA on PA.CedulaEmpleado = ECP.CedulaEmpleado
	join Planilla PL on PL.Consectivo = PA.ConsecutivoPlanilla
	where  PL.Consectivo = @ConsecutivoPlanilla and ECP.NombreProyecto = @NombreProyecto
	group by ECP.TipoContrato
  `,
  getTotalCostBenefitsEmployer: `select PCB.NombreBeneficio, sum(PCB.MontoBeneficio) AS Monto
  from Pago p 
  JOIN Empleado e on p.CedulaEmpleado = e.Cedula 
  JOIN PagoContieneBeneficios PCB on p.ConsecutivoPago = PCB.ConsecutivoPago 
  where PCB.ConsecutivoPlanilla = @ConsecutivoPlanilla
  group by PCB.NombreBeneficio`,
  getTotalCostObligatoryDeductionsEmployer: `select PCDO.NombreDeduccionObligatoria, sum(PCDO.MontoEmpleador) AS Monto
  from Pago p 
  JOIN Empleado e on p.CedulaEmpleado = e.Cedula 
  JOIN PagoAplicaDeduccionesObligatorias PCDO on p.ConsecutivoPago = PCDO.ConsecutivoPago 
  where PCDO.ConsecutivoPlanilla = @ConsecutivoPlanilla AND PCDO.NombreDeduccionObligatoria != 'Impuesto sobre la renta'
  group by PCDO.NombreDeduccionObligatoria`,
  getPayrollTotalCosts: `select pl.NombreProyecto, pl.FechaFin, pr.TipoPeriodo, pa.ConsecutivoPlanilla, SUM(SalarioBruto) as SalariosBrutos,
  SUM(MontoTotalDeduccionesObligatoriasEmpleado) AS DeduccionesObligatoriasEmpleados,
  SUM(MontoTotalDeduccionesObligatoriasEmpleador) AS DeduccionesObligatoriasEmpleador,
  SUM(MontoTotalBeneficios) as Beneficios,
  SUM(MontoTotalDeduccionesVoluntarias) as DeduccionesVoluntarias
  from Pago pa Join Planilla pl on pa.ConsecutivoPlanilla = pl.Consectivo
  join Proyecto pr on pr.CedulaEmpleador=pl.CedulaEmpleador and pr.Nombre = pl.NombreProyecto
  where pl.CedulaEmpleador = @employerID
  group by pa.ConsecutivoPlanilla, pl.NombreProyecto, pl.FechaFin, pr.TipoPeriodo
  order by pl.FechaFin desc
  `,
  getPayrollStatistics: `select pl.Consectivo, sum(pa.SalarioBruto) as Salarios, sum(pa.MontoTotalBeneficios) as Beneficios, 
  sum(pa.MontoTotalDeduccionesObligatoriasEmpleador) as Pagos from Planilla pl
  join Pago pa on pa.ConsecutivoPlanilla = pl.Consectivo
  where NombreProyecto = @NombreProyecto and pl.CedulaEmpleador = @Cedula
  group by pl.Consectivo order by pl.Consectivo desc `
};

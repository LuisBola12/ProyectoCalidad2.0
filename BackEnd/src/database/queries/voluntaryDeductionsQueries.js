export const voluntaryDeductionsQueries = {
  getVoluntaryDeductions: 'Select * From DeduccionesVoluntarias dv Where NombreProyecto = @NombreProyecto and CedulaEmpleador = @CedulaEmpleador and dv.Activo = \'true\'',
  createNewVoluntaryDeduction: 'Insert into DeduccionesVoluntarias (Nombre, NombreProyecto, CedulaEmpleador, Costo, Descripcion, Activo) values (@Nombre, @NombreProyecto, @CedulaEmpleador, @Costo, @Descripcion, \'true\')',
  getVoluntaryDeductionsByName: 'Select Nombre from DeduccionesVoluntarias where Nombre = @Nombre and NombreProyecto = @NombreProyecto and CedulaEmpleador = @CedulaEmpleador',
  editVoluntaryDeduction: 'Update DeduccionesVoluntarias set Nombre=@Nombre, Costo=@Costo, Descripcion=@Descripcion where NombreProyecto=@NombreProyecto and CedulaEmpleador = @CedulaEmpleador and Nombre=@NombreAntiguo and Activo = \'true\'',
  getVoluntaryDeductionsStatistics:
  `SELECT Nombre, COUNT(dve.CedulaEmpleado) as empleados from DeduccionesVoluntarias dv 
  JOIN DeduccionVoluntariaElegida dve ON dve.NombreDeduccionVoluntaria = dv.Nombre
  AND dve.NombreProyecto = dv.NombreProyecto AND 
  dv.CedulaEmpleador = dve.CedulaEmpleador
  WHERE dv.CedulaEmpleador = @CedulaEmpleador and dv.Activo = 1
  AND dve.fechaFin > GETDATE() AND dv.NombreProyecto = @NombreProyecto
  GROUP BY dv.Nombre
  `,
  reactivateVoluntaryDeduction: 'Update DeduccionesVoluntarias set Nombre = @Nombre, Activo = 1 where NombreProyecto=@NombreProyecto and CedulaEmpleador = @CedulaEmpleador and Nombre=@NombreAntiguo',
};
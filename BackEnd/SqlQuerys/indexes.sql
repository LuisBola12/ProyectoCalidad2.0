CREATE NONCLUSTERED INDEX [IndexActivo_Beneficio] ON [dbo].[Beneficios] ([Activo] ASC) WHERE ([Activo]=(1))

CREATE NONCLUSTERED INDEX [IndexActivo_Deducciones] ON [dbo].[DeduccionesVoluntarias] ([Activo] ASC) WHERE ([Activo]=(1))

CREATE NONCLUSTERED INDEX [IndexFechaFin_Beneficio] ON [dbo].[BeneficioElegido] ([fechaFin] ASC )

CREATE NONCLUSTERED INDEX [IndexFechaFin_Deducciones] ON [dbo].[DeduccionVoluntariaElegida] ([FechaFin] ASC)
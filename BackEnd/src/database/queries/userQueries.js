export const userQueries = {
  getAllUSers: 'Select * From Usuarios',
  createNewUser: 'Insert into Usuarios (Email,Contrasenia,Roles, Verificado) values(@Email,@Contrasenia,@Roles,0)',
  getUserByEmail: 'Select Email, Roles From Usuarios Where Email = @Email',
  verifyCredentials: 'Select * From Usuarios Where Email = @Email AND Contrasenia = @Contrasenia',
  getProfileEmployee: 'Select * From Empleado Where Email = @Email',
  getProfileEmployeer: 'Select * From Empleador Where Email = @Email',
  udpateEmail: 'Update Usuarios set Email = @Email where Email = @EmailViejo',
  updateEmployee:'Update Empleado set Nombre= @Nombre, Apellido1= @Apellido1 ,Apellido2= @Apellido2,Telefono= @Telefono Where Cedula= @Cedula',
  updateEmployeer:'Update Empleador set Nombre= @Nombre, Apellido1= @Apellido1 ,Apellido2= @Apellido2,Telefono= @Telefono Where Cedula= @Cedula',
  updateVerification: `update Usuarios set Verificado = 1  where email = @Email`
};
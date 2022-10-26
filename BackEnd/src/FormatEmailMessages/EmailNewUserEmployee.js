export const emailNewUserEmployee = ( data ) => {
  console.log( 'data' );
  const { email, password, project, employer, employee } = data;
  console.log( data );
  const emailFormat = `
  <div>
  <div style='
    background: #133c54; 
    color: white; font-size: 22px; 
    font-weight: bold; 
    text-align: center; 
    line-height: 48px;
    margin-bottom: 30px;'>
    SeleMiracleRun
  </div>
  
  <div style=' font-size: 16px; color: black;'>
      Welcome to  ${project}!
      <br></br>
      <br></br>
      ${employee}, a new account has being created for your personal use in the SeleMiracleRun application.
      <br></br>
      Your email account is: <b>${email}</b>
      <br></br>
      Your password is: <b>${password}</b>
      <br></br>
      Please do not share this message, it is for your security.
      <br></br>
      <br></br>
      <a href="http://localhost:3000/" target="_blank">Log In Here</a>
      <br></br>
      by  ${employer}

  </div>
  `;
  return emailFormat;
};

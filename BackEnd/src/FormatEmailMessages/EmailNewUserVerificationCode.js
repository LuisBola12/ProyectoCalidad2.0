export const emailNewUserVerification = ( email ) => {
  const emailFormat = `
  <div style='
  background: #133c54; 
  color: white; font-size: 22px; 
  font-weight: bold; 
  text-align: center; 
  line-height: 48px;
  margin-bottom: 30px;'>
SeleMiracleRun
</div>
<div style='
text-align: center;
'>
<h2>
  <b>Almost done, ${email}!</b>
</h2>
<div style='
  border: solid gray 1px;
    width: 500px;
    height: 140px;
    padding-top: 20px;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
  '>
  <div style='margin-bottom : 50px'>
    To secure your SeleMiracleRun account, we just need to verify your
    email address: ${email}
  </div>
  <div>
    <a style=' border: "solid gray 1px" ; text-decoration : none ; color: white ; padding: 8px 30px ;
    background: darkgreen ; border-radius : 8px ; margin-bottom : 100px; '
      href="http://localhost:3000/verification?email=${email}">
      Verify Email
    </a>
  </div>
</div>
<div style='width: 500px; margin-left: auto;
margin-right: auto;'>Button not working? Paste the following link into your browser:<a href="http://localhost:3000/verification?email=${email}" > http://localhost:3000/verification?email=${email} </a></div>
</div>
  `;
  return emailFormat;
};

export const emailTerminateContract = (motivoDeDespido) => {
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
  
    <div style=' font-size: 16px; color: black; white-space: pre-line;'>
        <pre style=' font-size: 16px; color: black; '>
            ${motivoDeDespido}
        </pre>
    </div>
    `;
  return emailFormat;
};


{/* <div>
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
      Costa Rica, San José ${fechaDeHoy}
      <br></br>
      <br></br>
      ${nombreEmpleador}
      <br></br>
      Dueño de ${nombreProyecto}
      <br></br>
      Teléfono ${numTelefono}
      <br></br>
      Apreciable ${nombreEmpleado} tengo el gusto de saludarle cordialmente.
      <br></br>
        ${motivoDeDespido}
    <br></br>
        Atentamente.
        <br></br>
        ${nombreEmpleador}
        <br></br>
        Dueño de ${nombreProyecto}
        <br></br>
    </div> */}
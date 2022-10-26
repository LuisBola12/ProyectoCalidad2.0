export const emailPDFTotalsReport = ( payRollConsecutive ) => {
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
     This email contains de report of the payRoll: ${payRollConsecutive} 
  </div>
  `;
  return emailFormat;
};
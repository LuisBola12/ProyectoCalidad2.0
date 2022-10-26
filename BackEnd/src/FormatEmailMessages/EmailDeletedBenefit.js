export const emailDeletedBenefit = (data) => {
  const { project, employer, employee, benefit } = data;
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
      Hello ${employee}!
      <br></br>
      <br></br>
      The following email is to notify you that the ${benefit} benefit is no longer
      offered in ${project},
      <br></br>
      if you are subscribed to this benefit, you will be automatically unsubscribed.
      <br></br>
      This benefit will not be reflected in your next payment.
      <br></br>
      <br></br>
      by ${employer}

    </div>
  `;
  return emailFormat;
};

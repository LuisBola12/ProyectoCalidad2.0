
export const  eliminateTimeFromDate = ( date ) => {
  let extractedDate = date;
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();
  extractedDate = new Date( year, month, day  , 0,0,0,0 );
  return extractedDate;
};

export const isInDateRange = ( initialDate, finalDate, dateToVerify ) =>{
  initialDate = eliminateTimeFromDate( initialDate );
  finalDate = eliminateTimeFromDate( finalDate );
  dateToVerify = eliminateTimeFromDate( dateToVerify );

  return ( initialDate <= dateToVerify <= finalDate );
};
export const calculateFullTimeWorkedHours = (  paymentPeriod, contractType ) => {
  let hoursWorkWeek = 40;
  if ( contractType === 'Medio Tiempo' ){
    hoursWorkWeek = 20;
  }
  let hoursWorked = null;
  switch ( paymentPeriod ) {
  case 'Quincenal':
    hoursWorked = hoursWorkWeek * 2;
    break;
  case 'Semanal':
    hoursWorked = hoursWorkWeek ;
    break;
  case 'Mensual':
    hoursWorked = hoursWorkWeek * 4 ;
    break;
  default:
    hoursWorked = null;
    break;
  }  
  return hoursWorked;
};
const validate = (values) => {
  const hours = parseInt(values);
  let error = false;
  if (hours) {
    if (hours < 0) {
      document.getElementById('calendar_hours').style.borderColor = 'red';
      document.getElementById('calendar_error_name').innerHTML = 'Cant be a negative number';
      error = true;
    } else {
      document.getElementById('calendar_error_name').innerHTML = '';
      document.getElementById('calendar_hours').style.borderColor = 'gray';
      error = false;
      if (hours >= 12) {
        document.getElementById('calendar_hours').style.borderColor = 'red';
        document.getElementById('calendar_error_name').innerHTML = 'Cant be largar than 12';
        error = true;
      } else {
        document.getElementById('calendar_error_name').innerHTML = '';
        document.getElementById('calendar_hours').style.borderColor = 'gray';
        error = false;
      }
    }
  } else {
    document.getElementById('calendar_hours').style.borderColor = 'red';
    document.getElementById('calendar_error_name').innerHTML = 'Please enter hours.';
    error = true;
  }
  return error;
}

export default validate;
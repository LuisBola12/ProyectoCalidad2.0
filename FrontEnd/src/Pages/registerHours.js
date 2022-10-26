import React from 'react';
import { CalendarComp } from '../Components/CalendarComp/Calendar';
import { Navbar } from '../Components/Navbar/Navbar';

export const RegisterHours = () => {
  return (
    <> 
      <div className='sticky-navbar'>
        <Navbar />
      </div>
      <div className='page-content'>
        {<CalendarComp/>}
      </div>
      <footer>&copy; Sele Miracle Run - UCR</footer>
    </>
  );
};
import React from 'react';
import { Navbar } from '../Components/Navbar/Navbar';
import { ViewPayroll } from '../Components/ViewPayrolls/ViewPayroll';
import '../App.css';

export const Payroll = () => {
  return (
    <>
      <div className='sticky-navbar'>
        <Navbar />
      </div>
      <div className='page-content'>
        <ViewPayroll/>
      </div>
      <footer>&copy; Sele Miracle Run - UCR</footer>
    </>
  );
};

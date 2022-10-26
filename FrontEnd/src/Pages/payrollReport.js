import React from 'react';
import '../App.css';
import { Navbar } from '../Components/Navbar/Navbar';
import { PayrollReportComp } from '../Components/PayrollReportComp/PayrollReportComp';

export const PayrollReport = () => {
  return (
    <>
      <div className='sticky-navbar'>
        <Navbar />
      </div>
      <div className='page-content'>
        <PayrollReportComp/>
      </div>
      <footer>&copy; Sele Miracle Run - UCR</footer>
    </>
  );
};
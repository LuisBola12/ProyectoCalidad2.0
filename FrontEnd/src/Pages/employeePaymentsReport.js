import React from 'react';
import '../App.css';
import { Navbar } from '../Components/Navbar/Navbar';
import { EmployeePaymentsReports } from '../Components/EmployeePayments/EmployeePaymentsReports';

export const EmployeePaymentsReport = () => {
  return (
    <>
      <div className='sticky-navbar'>
        <Navbar />
      </div>
      <div className='page-content'>
        <EmployeePaymentsReports />
      </div>
      <footer>&copy; Sele Miracle Run - UCR</footer>
    </>
  );
};
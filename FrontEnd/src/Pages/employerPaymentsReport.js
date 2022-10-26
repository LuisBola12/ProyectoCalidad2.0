import React from 'react';
import '../App.css';
import { Navbar } from '../Components/Navbar/Navbar';
import { EmployerPaymentsReports } from '../Components/EmployerPayments/EmployerPaymentsReports';

export const EmployerPaymentsReport = () => {
  return (
    <>
      <div className='sticky-navbar'>
        <Navbar />
      </div>
      <div className='page-content'>
        <EmployerPaymentsReports />
      </div>
      <footer>&copy; Sele Miracle Run - UCR</footer>
    </>
  );
};

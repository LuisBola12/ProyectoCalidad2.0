import React from 'react';
import { Navbar } from '../Components/Navbar/Navbar';
import { EmployeePayments } from '../Components/EmployeePayments/EmployeePayments';
export const EmployeeMyPayments = () => {
  return (
    <>
      <div className='sticky-navbar'>
        <Navbar />
      </div>
      <div className='page-content'>
        <EmployeePayments></EmployeePayments>
      </div>
      <footer>&copy; Sele Miracle Run - UCR</footer>
    </>
  );
};

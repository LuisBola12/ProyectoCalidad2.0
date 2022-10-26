import React from 'react';
import { PayslipReportComp } from '../Components/EmployeePayments/EmployeePayslipReport';
import { Navbar } from '../Components/Navbar/Navbar';

export const PayslipReport = () => {
  return (
    <>
      <div className='sticky-navbar'>
        <Navbar />
      </div>
      <div className='page-content'>
        <PayslipReportComp/>
      </div>
      <footer>&copy; Sele Miracle Run - UCR</footer>
    </>
  )
}

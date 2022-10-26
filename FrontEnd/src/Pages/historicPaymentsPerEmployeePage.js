import React from 'react';
import { Navbar } from '../Components/Navbar/Navbar';
import { HistoricPaymentsMadeByEmployer } from '../Components/HistoricPayments/HistoricPaymentsMadeByEmployer.js';
export const HistoricPaymentsPerEmployeePage = () => {
  return (
    <>
      <div className='sticky-navbar'>
        <Navbar />
      </div>
      <div className='page-content'>
        <HistoricPaymentsMadeByEmployer></HistoricPaymentsMadeByEmployer>
      </div>
      <footer>&copy; Sele Miracle Run - UCR</footer>
    </>
  );
};

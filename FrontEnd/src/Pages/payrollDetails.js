import React from 'react';
import { Navbar } from '../Components/Navbar/Navbar';
import { PayrollDetails } from './../Components/PayrollDetails/PayrollDetails';
import '../App.css';

export const PayrollDetailsPage = () => {
  return (
    <>
      <div className='sticky-navbar'>
        <Navbar />
      </div>
      <div className='page-content'>
        <PayrollDetails/>
      </div>
      <footer>&copy; Sele Miracle Run - UCR</footer>
    </>
  );
};
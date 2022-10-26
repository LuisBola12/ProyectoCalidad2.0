import React from 'react';
import '../App.css';
import { Navbar } from '../Components/Navbar/Navbar';
import { EmployeeVoluntaryDeductions } from '../Components/EmployeeVoluntaryDeductions/EmployeeVoluntaryDeductions';

export const EmployeesVoluntaryDeductions = () => {
  return (
    <>
      <div className='sticky-navbar'>
        <Navbar />
      </div>
      <div className='page-content'>
        {<EmployeeVoluntaryDeductions />}
      </div>
      <footer>&copy; Sele Miracle Run - UCR</footer>
    </>
  );
};

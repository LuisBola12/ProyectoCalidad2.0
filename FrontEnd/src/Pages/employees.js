import React from 'react';
import { Navbar } from '../Components/Navbar/Navbar';
import { CrudEmployee } from '../Components/CrudEmployees/CrudEmployee';
import '../App.css';

export const Employees = () => {
  return (
    <>
      <div className='sticky-navbar'>
        <Navbar />
      </div>
      <div className='page-content'>
        {<CrudEmployee/>}
      </div>
      <footer>&copy; Sele Miracle Run - UCR</footer> 
    </>
  );
};
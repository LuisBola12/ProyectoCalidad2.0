import React from 'react';
import { HireContract } from '../Components/HireEmployees/HireContract';
import { Navbar } from '../Components/Navbar/Navbar';

export const HireEmployee = () => {
  return (
    <> 
      <div className='sticky-navbar'>
        <Navbar />
      </div>
      <div className='page-content'>
        <HireContract/>
      </div>
      <footer>&copy; Sele Miracle Run - UCR</footer>
    </>
  );
};

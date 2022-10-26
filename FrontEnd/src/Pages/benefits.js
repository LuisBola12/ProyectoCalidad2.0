import React from 'react';
import '../App.css';
import { CrudBenefits } from '../Components/CrudBenefits/CrudBenefits';
import { Navbar } from '../Components/Navbar/Navbar';

export const Benefits = () => {
  return (
    <>
      <div className='sticky-navbar'>
        <Navbar />
      </div>
      <div className='page-content'>
        {<CrudBenefits />}
      </div>
      <footer>&copy; Sele Miracle Run - UCR</footer>
    </>
  );
};
import React from 'react';
import '../App.css';
import { EditBenefit } from '../Components/EditBenefit/EditBenefit';
import { Navbar } from '../Components/Navbar/Navbar';

export const EditBenefits = () => {
  return (
    <>
      <div className='sticky-navbar'>
        <Navbar />
      </div>
      <div className='page-content'>
        {<EditBenefit />}
      </div>
      <footer>&copy; Sele Miracle Run - UCR</footer>
    </>
  );
};

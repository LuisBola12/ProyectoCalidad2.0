import React from 'react';
import '../App.css';
import { CreateBenefit } from '../Components/CreateBenefit/CreateBenefit';
import { Navbar } from '../Components/Navbar/Navbar';

export const CreateNewBenefit = () => {
  return (
    <>
      <div className='sticky-navbar'>
        <Navbar />
      </div>
      <div className='page-content'>
        {<CreateBenefit />}
      </div>
      <footer>&copy; Sele Miracle Run - UCR</footer>
    </>
  );
};

import React from 'react';
import '../App.css';
import { EditVoluntaryDeduction } from '../Components/EditVoluntaryDeduction/EditVoluntaryDeduction';
import { Navbar } from '../Components/Navbar/Navbar';

export const EditVoluntaryDeductions = () => {
  return (
    <>
      <div className='sticky-navbar'>
        <Navbar />
      </div>
      <div className='page-content'>
        {<EditVoluntaryDeduction />}
      </div>
      <footer>&copy; Sele Miracle Run - UCR</footer>
    </>
  );
};

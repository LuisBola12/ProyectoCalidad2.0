import React from 'react';
import '../App.css';
import { CreateVoluntaryDeduction } from '../Components/CreateVoluntaryDeduction/CreateVoluntaryDeduction';
import { Navbar } from '../Components/Navbar/Navbar';

export const CreateNewVoluntaryDeduction= () => {
  return (
    <>
      <div className='sticky-navbar'>
        <Navbar />
      </div>
      <div className='page-content'>
        {<CreateVoluntaryDeduction />}
      </div>
      <footer>&copy; Sele Miracle Run - UCR</footer>
    </>
  );
};

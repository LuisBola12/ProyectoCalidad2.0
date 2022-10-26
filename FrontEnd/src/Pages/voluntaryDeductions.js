import React from 'react';
import '../App.css';
import { CrudVoluntaryDeductions } from '../Components/CrudVoluntaryDeductions/CrudVoluntaryDeductions';
import { Navbar } from '../Components/Navbar/Navbar';

export const  VoluntaryDeductions = () => {
  return (
    <>
      <div className='sticky-navbar'>
        <Navbar />
      </div>
      <div className = 'page-content'>
        { <CrudVoluntaryDeductions/> }
      </div>
      <footer>&copy; Sele Miracle Run - UCR</footer> 
    </>
  );
};  
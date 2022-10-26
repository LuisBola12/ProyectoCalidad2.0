import React from 'react';
import '../App.css';
import { CreateEmployee } from '../Components/CreateEmployee/CreateEmployee';
import { Navbar } from './../Components/Navbar/Navbar';

export const CreateNewEmployee = () => {
  return (
    <>
      <div className='sticky-navbar'>
        <Navbar />
      </div>
      <div className='page-content'>
        <CreateEmployee/>
      </div>
      <footer>&copy; Sele Miracle Run - UCR</footer> 
    </>
  );
};

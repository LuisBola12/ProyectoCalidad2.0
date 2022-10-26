import React from 'react';
import { Navbar } from '../Components/Navbar/Navbar';
import '../App.css';

export const Contracts = () => {
  return (
    <>
      <div className='sticky-navbar'>
        <Navbar />
      </div>
      <div className='page-content'>
        <h1>Welcome to GeeksforGeeks Events</h1>
      </div>
      <footer>&copy; Sele Miracle Run - UCR</footer> 
    </>
  );
};
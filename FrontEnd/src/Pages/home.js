import React from 'react';
import { Navbar } from '../Components/Navbar/Navbar';
import '../App.css';

export const Home = () => {
  return (
    <>
      <div className='sticky-navbar'>
        <Navbar />
      </div>
      <div className='page-content'>
        <h1>Esto es el home page de la App</h1>
      </div>
      <footer>&copy; Sele Miracle Run - UCR</footer> 
    </>
  );
};
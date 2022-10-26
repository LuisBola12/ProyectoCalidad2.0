import React from 'react';
import '../App.css';
import { Navbar } from '../Components/Navbar/Navbar';
import { DashBoardComp } from '../Components/DashBoardComp/DashBoardComp';

export const DashBoard = () => {
  return (
    <>
      <div className='sticky-navbar'>
        <Navbar />
      </div>
      <div className='page-content' style={{'boxShadow':'none'}}>
        <DashBoardComp/>
      </div>
      <footer>&copy; Sele Miracle Run - UCR</footer>
    </>
  );
};
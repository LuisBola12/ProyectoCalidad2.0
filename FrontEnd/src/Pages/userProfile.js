import React from 'react';
import { Navbar } from '../Components/Navbar/Navbar';
import { UserProfile } from '../Components/UserProfile/UserProfile';
import '../App.css';

export const UserPage = () => {
  return (
    <>
      <div className='sticky-navbar'>
        <Navbar />
      </div>
      <div className='page-content'>
        <UserProfile/>
      </div>
      <footer>&copy; Sele Miracle Run - UCR</footer>
    </>
  );
};

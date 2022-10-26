import React from 'react';
import { Navbar } from '../Components/Navbar/Navbar';
import { UserProfile } from '../Components/UserProfile/UserProfile';
import '../App.css';
import { ProjectInfo } from '../Components/ProjectsComponents/ProjectInfo';

export const EditProjectPage = () => {
  return (
    <>
      <div className='sticky-navbar'>
        <Navbar />
      </div>
      <div className='page-content'>
        <ProjectInfo/>
        
      </div>
      <footer>&copy; Sele Miracle Run - UCR</footer>
    </>
  );
};
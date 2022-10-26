import React from 'react';
import { CrudHire } from '../Components/HireEmployees/CrudHire';
import { Navbar } from '../Components/Navbar/Navbar';

export const HireAEmployee = () => {
  return (
    <> 
      <div className='sticky-navbar'>
        <Navbar />
      </div>
      <div className='page-content'>
        <CrudHire/>
      </div>
      <footer>&copy; Sele Miracle Run - UCR</footer>
    </>
  )
}

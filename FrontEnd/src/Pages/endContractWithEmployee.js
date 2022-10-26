import React from 'react';
import { Navbar } from '../Components/Navbar/Navbar';
import { TerminateContract } from '../Components/TerminateContract/TerminateContract';

export const EndContractWithEmployee = () => {
  return (
    <>
      <div className='sticky-navbar'>
        <Navbar />
      </div>
      <div className='page-content'>
        <TerminateContract/>
      </div>
      <footer>&copy; Sele Miracle Run - UCR</footer>
    </>
  )
}

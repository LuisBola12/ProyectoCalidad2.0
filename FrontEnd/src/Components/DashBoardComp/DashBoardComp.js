import React from 'react';
import './DashBoardCompStyle.scss';
import { BenefitsGraphic } from '../DasboardGraphics/BenefitsGraphic';
import { VoluntaryDeductionsGraphic } from '../DasboardGraphics/VoluntaryDeductionsGraphic';
import { PayrrollGraphic } from '../DasboardGraphics/PayrrollGraphics';
import { EmployeeTypeGraphic } from '../DasboardGraphics/EmployeeTypeGraphic.js';

export const DashBoardComp = () => {
  return (
    <div className='parent'>
      <div className='div1'> <VoluntaryDeductionsGraphic/> </div>
      <div className='div2'> <BenefitsGraphic/></div>
      <div className='div3'> <EmployeeTypeGraphic/></div>
      <div className='div4'> <PayrrollGraphic/></div>
    </div>
  );
};

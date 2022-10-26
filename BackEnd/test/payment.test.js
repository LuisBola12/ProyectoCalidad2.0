import { isInDateRange,calculateFullTimeWorkedHours} from '../src/utils/dateManager';
import { calculateNetSalary,calculateAmount,estimateIncomeTax } from '../src/utils/estimateCalculator';

test( 'Verify date in range', () => {
  const initialDate = new Date();
  const dateToVerify = new Date();
  const finalDate = new Date();
  expect( isInDateRange( initialDate,finalDate, dateToVerify ) ).toBe ( true );
} );
test( 'Validate that the estimate of a net salary is correct', () => {
  const grossSalary = 800000;
  const mandatoryDeductions = 120000;
  const voluntaryDeductions = 56000;
  expect( calculateNetSalary( grossSalary,mandatoryDeductions, voluntaryDeductions ) ).toBe ( 624000 );
} );
test( `Verify that the gross salary multiplied by a percentage is correct, 
this is used in the estimate of total of mandatory deductions`, () => {
  const grossSalary = 800000;
  const percentage = 8;
  expect(calculateAmount( grossSalary,percentage)).toBe(64000);
} );
test( 'Validate the estimate of income tax based on the salary of a person and the amount of times is paid in a month', () => {
  const grossSalary = 800000;
  const timesPaidInAMonth = 2;
  expect( estimateIncomeTax(grossSalary,timesPaidInAMonth)).toBe(91900);
} );

test( 'Validate the estimate of income tax based on the salary of a person and the amount of times is paid in a month', () => {
  const contractType = 'Medio Tiempo'
  const paymentPeriod = 'Quincenal'
  expect( calculateFullTimeWorkedHours(paymentPeriod,contractType)).toBe(40);
} );


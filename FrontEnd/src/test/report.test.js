import { estimateTotalEmployerCost } from "../Utils/PayRollReport/sumTotalEmployerCost";
import { sumTotalSalaries } from './../Utils/PayRollReport/sumTotalSalarys';
import { sumTotalBenefits } from './../Utils/PayRollReport/sumTotalBenefits';

//PASS
test( 'Validate the total employer cost', () => {
    const grossSalary =  2000000;
    const mandatoryDeductions = 430000;
    const benefits = 261000;
    expect(estimateTotalEmployerCost(grossSalary,mandatoryDeductions,benefits)).toBe(2691000);
  });
//FAILS
test( 'Params must be numbers', () => {
    const grossSalary =  'hola';
    const mandatoryDeductions = 430000;
    const benefits = 261000;
    expect(estimateTotalEmployerCost(grossSalary,mandatoryDeductions,benefits)).toBe("hola430000261000");
});


//PASS
test( 'Get the sum of a group of salaries', () => {
    const salaries = [{tipo:'Medio Tiempo',salario:2400000},{tipo:'Tiempo Completo',salario:1400000},{tipo:'Por Horas',salario:2001000}]
    expect(sumTotalSalaries(salaries)).toBe(5801000);
});
//FAILS
test( 'Fails because array has different object keys', () => {
  const salaries = [{tipo:'Medio Tiempo',monto:2400000},{tipo:'Tiempo Completo',monto:1400000},{tipo:'Por Horas',monto:2001000}]
  expect(sumTotalSalaries(salaries)).toBe(NaN);
});



//PASS
test( 'Get the sum of a group of benefits', () => {
  const benefits = [{tipo:'Almuerzos',Monto:20000},{tipo:'Cine',Monto:15000},{tipo:'Cuidador De Perros',Monto:55000}]
  expect(sumTotalBenefits(benefits)).toBe(90000);
});
//FAILS
test( 'Fails because the keys of the object have a respective name', () => {
  const benefits = [{tipo:'Almuerzos',monto:20000},{tipo:'Cine',monto:15000},{tipo:'Cuidador De Perros',monto:55000}]
  expect(sumTotalBenefits(benefits)).toBe(NaN);
});

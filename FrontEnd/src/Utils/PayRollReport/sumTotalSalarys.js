export const sumTotalSalaries = (salaries) =>{
    let total = 0;
    salaries.forEach((element) => {
        total += element.salario;
      });
    return total;
}
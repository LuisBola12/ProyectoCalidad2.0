export const sumTotalBenefits = (benefits) =>{
    let total = 0;
    benefits.forEach((element) => {
        total += element.Monto;
      });
    return total;
}
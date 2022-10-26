export const getOblDeductionsOfAPayslip = async(consecutivoPago)=>{
    const url = `${process.env.REACT_APP_BACKEND_LOCALHOST}payslipOblDeductions/${consecutivoPago}`
    const response = await fetch(url);
    const data = await response.json();
    if(data){
        return data;
    }
}
export const getVolDeductionsOfAPayslip = async(consecutivoPago)=>{
    const url = `${process.env.REACT_APP_BACKEND_LOCALHOST}payslipVolDeductions/${consecutivoPago}`
    const response = await fetch(url);
    const data = await response.json();
    if(data){
        return data;
    }
}
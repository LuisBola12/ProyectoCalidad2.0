import React from 'react';
import '../../App.css';
import { transformCost } from '../../shared/moneyFormatTransform';
import { useGetOfferedVoluntaryDeductions } from '../../Utils/VoluntaryDeductions/useGetOfferedVoluntaryDeductions';
import { useGetEmployeeVoluntaryDeductions } from '../../Utils/VoluntaryDeductions/useGetEmployeeVoluntaryDeductions';
import { usePostToVoluntaryDeductions } from '../../Utils/VoluntaryDeductions/usePostToVoluntaryDeductions';
import { usePutToVoluntaryDeductions } from '../../Utils/VoluntaryDeductions/usePutToVoluntaryDeductions';
import Swal from 'sweetalert2';
export const EmployeeVoluntaryDeductions = () => {
  const { offeredVoluntaryDeductions, offeredInfo, setofferedInfo } = useGetOfferedVoluntaryDeductions();
  const { EmployeeVoluntaryDeductions, EmployeeInfo, setEmployeeInfo } = useGetEmployeeVoluntaryDeductions();
  const { submitVoluntaryDeductionToEmployee } = usePostToVoluntaryDeductions();
  const { unlinkEmployeeToVoluntaryDeduction } = usePutToVoluntaryDeductions();
  const handleAddButton = (element) => {
    submitVoluntaryDeductionToEmployee(element.Nombre);
    Swal.fire({
      icon: 'success',
      title: 'subscribed',
      text: `You subscribed to ${element.Nombre}`,
      confirmButtonColor: 'darkgreen'
    });
    setofferedInfo(false);
    setEmployeeInfo(false);
  };

  const handleDeleteButton = (element) => {
    unlinkEmployeeToVoluntaryDeduction(element.NombreDeduccionVoluntaria);
    Swal.fire({
      icon: 'success',
      title: 'Unsubscribed',
      text: `You unsubscribed to ${element.NombreDeduccionVoluntaria} successfully`,
      confirmButtonColor: 'darkgreen'
    });
    setofferedInfo(false);
    setEmployeeInfo(false);
  };
  return (
    <>
      {!EmployeeInfo ? <div className='loader' ></div > : (
        <>
          <h2 className='navigate-title'>My Voluntary Deductions</h2>
          <table className='Table'>
            <thead>
              <tr className='table-header'>
                <th className='table-left-border left-td'>Deduction</th>
                <th className='left-td'>Description</th>
                <th className='right-td'>Cost</th>
                <th className='table-right-border right-td'>Delete</th>
              </tr>
            </thead>
            <tbody>
              {EmployeeVoluntaryDeductions.map((element) => (
                <tr key={element.NombreDeduccionVoluntaria}>
                  <td className='left-td table-left-border voluntaryDeduction-name'>{element.NombreDeduccionVoluntaria}</td>
                  <td className='description-cell left-td'>{((element.Descripcion) ? element.Descripcion : 'No description')}</td>
                  <td className='right-td'>₡{transformCost(element.Costo)}</td>
                  <td className='right-button table-right-border'>
                    <button className='button cancel-button' onClick={() => handleDeleteButton(element)}> Delete </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <label className='Empty-message'>{(EmployeeVoluntaryDeductions.length === 0) ? 'No voluntary deductions selected added yet' : ''}</label>
        </>)}

      {!offeredInfo ? (<div className='loader' ></div >) : (
        <>
          <h2 className='offer-voluntaryDeductions'> Offered Voluntary Deductions</h2>
          <table className='Table'>
            <thead>
              <tr className='table-header'>
                <th className='table-left-border left-td'>Deduction</th>
                <th className='left-td'>Description</th>
                <th className='right-td'>Cost</th>
                <th className='table-right-border right-td'>Add</th>
              </tr>
            </thead>
            <tbody>
              {offeredVoluntaryDeductions.map((element) => (
                <tr key={element.Nombre}>
                  <>
                    <td className='left-td table-left-border voluntaryDeduction-name'>{element.Nombre}</td>
                    <td className='description-cell left-td'>{((element.Descripcion) ? element.Descripcion : 'No description')}</td>
                    <td className='right-td'>₡{transformCost(element.Costo)}</td>
                    <td className='right-button table-right-border'>
                      <button className='button add-button' onClick={() => handleAddButton(element)}> Add</button>
                    </td>
                  </>
                </tr>
              ))}
            </tbody>
          </table>
          <label className='Empty-message'>{(offeredVoluntaryDeductions.length === 0) ? 'No voluntary deductions added added yet' : ''}</label>
        </>)}
    </>
  );
};
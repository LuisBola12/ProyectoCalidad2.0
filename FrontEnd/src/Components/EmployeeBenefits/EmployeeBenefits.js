import React from 'react';
import '../../App.css';
import { transformCost } from '../../shared/moneyFormatTransform';
import { useGetOfferedBenefits } from '../../Utils/Benefits/useGetOfferedBenefits';
import { useGetEmployeeBenefits } from '../../Utils/Benefits/useGetEmployeeBenefits';
import { usePostToBenefits } from '../../Utils/Benefits/usePostToBenefits.js';
import { usePutToBenefits } from '../../Utils/Benefits/usePutToBenefits';
import useValidateBenefitSubscription from '../../Utils/Benefits/useValidateBenefitSubscription';
import Swal from 'sweetalert2';

export const EmployeeBenefits = () => {
  const { submitBenefitToEmployee } = usePostToBenefits();
  const { offeredBenefits, offeredInfo, setofferedInfo } = useGetOfferedBenefits();
  const { EmployeeBenefits, EmployeeInfo, setEmployeeInfo } = useGetEmployeeBenefits();
  const { unlinkEmployeeToBenefit } = usePutToBenefits();
  const { canSuscribe } = useValidateBenefitSubscription();

  const handleAddButton = async (element) => {
    const allowedToSubsribe = await canSuscribe(element.Nombre);
    console.log(allowedToSubsribe);

    if (allowedToSubsribe) {
      await submitBenefitToEmployee(element.Nombre);
      setofferedInfo(false);
      setEmployeeInfo(false);
    }


  };

  const handleDeleteButton = (element) => {
    unlinkEmployeeToBenefit(element.NombreBeneficio);
    Swal.fire({
      icon: 'success',
      title: 'Unsubscribed',
      text: `You unsubscribed to ${element.NombreBeneficio} successfully`,
      confirmButtonColor: 'darkgreen'
    });
    setofferedInfo(false);
    setEmployeeInfo(false);
  };
  return (
    <>
      {!EmployeeInfo ? (<div className='loader' ></div >) : (
        <>
          <h2 className='navigate-title'>My Benefits</h2>
          <table className='Table'>
            <thead>
              <tr className='table-header'>
                <th className='table-left-border left-td'>Benefit</th>
                <th className='left-td'>Description</th>
                <th className='right-td'>Actual Cost</th>
                <th className='table-right-border right-td'>Delete</th>
              </tr>
            </thead>
            <tbody>
              {EmployeeBenefits.map((element) => (
                <tr key={element.NombreBeneficio}>
                  <td className='left-td table-left-border benefit-name'>{element.NombreBeneficio}</td>
                  <td className='description-cell left-td'>{((element.Descripción) ? element.Descripción : 'No description')}</td>
                  <td className='right-td'>₡{transformCost(element.CostoActual)}</td>
                  <td className='right-button table-right-border'>
                    <button className='button cancel-button' onClick={() => handleDeleteButton(element)}> Delete </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <label className='Empty-message'>{(EmployeeBenefits.length === 0) ? 'No benefits selected added yet' : ''}</label>
        </>)}

      {!offeredInfo ? (<div className='loader' ></div >) : (
        <>
          <h2 className='ofer-benefits'>Offered Benefits</h2>
          <table className='Table'>
            <thead>
              <tr className='table-header'>
                <th className='table-left-border left-td'>Benefit</th>
                <th className='left-td'>Description</th>
                <th className='right-td'>Actual Cost</th>
                <th className='table-right-border right-td'>Add</th>
              </tr>
            </thead>
            <tbody>
              {offeredBenefits.map((element) => (
                <tr key={element.Nombre}>
                  <>
                    <td className='left-td table-left-border benefit-name'>{element.Nombre}</td>
                    <td className='description-cell left-td'>{((element.Descripción) ? element.Descripción : 'No description')}</td>
                    <td className='right-td'>₡{transformCost(element.CostoActual)}</td>
                    <td className='right-button table-right-border'>
                      <button className='button add-button' onClick={() => handleAddButton(element)}> Add</button>
                    </td>
                  </>
                </tr>
              ))}
            </tbody>
          </table>
          <label className='Empty-message'>{(offeredBenefits.length === 0) ? 'No benefits added added yet' : ''}</label>
        </>)}
    </>
  );
};
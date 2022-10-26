import React from 'react';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useGetBenefitsFromDatabase } from '../../Utils/Benefits/useGetBenefitsFromDatabase';
import { useNavigate } from 'react-router-dom';
import { transformCost } from '../../shared/moneyFormatTransform';
import { usePutToBenefits } from '../../Utils/Benefits/usePutToBenefits';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';

export const CrudBenefits = () => {
  const navigate = useNavigate();
  const { deactivateBenefit } = usePutToBenefits();
  const activeProject = useSelector((state) => state.activeProject.projectName);
  const handleCreateClick = () => {
    navigate( '/benefits/CreateBenefit' );
  };
  const handleEditClick = ( element ) => {
    navigate( '/benefits/editBenefit', { state: element } );
  };
  const handleDeleteClick = ( element ) => {
    Swal.fire( {
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'darkgreen',
      cancelButtonColor: 'darkred',
      confirmButtonText: 'Yes, delete it!'
    } ).then( ( result ) => {
      if ( result.isConfirmed ) {
        deactivateBenefit( element.Nombre );
        setInfoReceived( false );
        Swal.fire( {
          title: 'Deleted!',
          text: `The benefit ${element.Nombre} has been deleted.`,
          icon: 'success',
          confirmButtonColor: 'darkgreen',
        } );
      }
    } );
  };
  const { projectBenefits, infoReceived, setInfoReceived } = useGetBenefitsFromDatabase();
  return !infoReceived ? <div className='loader' ></div > : (
    <>
      <h2 className='navigate-title'>{activeProject} Benefits</h2>
      <div className='table-button'>
        <button className='create-button'
          onClick={handleCreateClick}
        >Create New Benefit</button>
      </div>
      <table className='Table'>
        <thead>
          <tr className='table-header'>
            <th className='table-left-border left-td'>Benefit</th>
            <th className='left-td'>Description</th>
            <th className='right-td'>Actual Cost</th>
            <th className='right-td'>Edit</th>
            <th className='table-right-border right-td'>Delete</th>
          </tr>
        </thead>
        <tbody>
          {projectBenefits.map( ( element ) => (
            <tr key={element.Nombre}>
              <td className='left-td table-left-border'>{element.Nombre}</td>
              <td className='description-cell left-td '>{( ( element.Descripción ) ? element.Descripción : 'No description' )}</td>
              <td className='right-td'>₡{transformCost( element.CostoActual )}</td>
              <td className='right-button'>
                <button className='button' onClick={() => handleEditClick( element )}> Edit </button>
              </td>
              <td className='right-button table-right-border'>
                <button className='button cancel-button' onClick={() => handleDeleteClick( element )}> Delete </button>
              </td>
            </tr>
          ) )}
        </tbody>
      </table>
      <label className='Empty-message'>{( projectBenefits.length === 0 ) ? 'No benefits added yet' : ''}</label>
    </>
  );
};

import React from 'react';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useGetVoluntaryDeductionsFromDatabase } from '../../Utils/VoluntaryDeductions/useGetVoluntaryDeductionsFromDatabase';
import { useNavigate } from 'react-router-dom';
import { transformCost } from '../../shared/moneyFormatTransform';
import { usePutToVoluntaryDeductions } from '../../Utils/VoluntaryDeductions/usePutToVoluntaryDeductions';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';

export const CrudVoluntaryDeductions = () => {
  const activeProject = useSelector((state) => state.activeProject.projectName);
  const navigate = useNavigate();
  const { deactivateVoluntaryDeduction } = usePutToVoluntaryDeductions();
  const handleCreateClick = () => {
    navigate('/voluntaryDeductions/CreateVoluntaryDeductions');
  };
  const handleEditClick = (element) => {
    navigate('/voluntaryDeductions/editVoluntaryDeduction', { state: element });
  };
  const handleDeleteClick = (element) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'darkgreen',
      cancelButtonColor: 'darkred',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deactivateVoluntaryDeduction(element.Nombre);
        setInfoReceived(false);
        Swal.fire({
          title: 'Deleted!',
          text: `The voluntary deduction ${element.Nombre} has been deleted.`,
          icon: 'success',
          confirmButtonColor: 'darkgreen',
        })
      }
    })
  };
  const { projectVoluntaryDeductions, infoReceived, setInfoReceived } = useGetVoluntaryDeductionsFromDatabase();
  return !infoReceived ? <div className='loader' ></div > : (
    <>
    <h2 className='navigate-title'>{activeProject} Voluntary Deductions</h2>
      <div className='table-button'>
        <button className='create-button'
          onClick={handleCreateClick}
        >Create New Voluntary Deduction</button>
      </div>
      <table className='Table'>
        <thead>
          <tr className='table-header'>
            <th className='table-left-border left-td'>Voluntary Deduction</th>
            <th className='left-td'>Description</th>
            <th className='right-td'>Cost</th>
            <th className='right-td'>Edit</th>
            <th className='table-right-border right-td'>Delete</th>
          </tr>
        </thead>
        <tbody>
          {projectVoluntaryDeductions.map((element) => (
            <tr key={element.Nombre}>
              <td className='left-td'>{element.Nombre}</td>
              <td className='description-cell left-td'>{((element.Descripcion) ? element.Descripcion : 'No description')}</td>
              <td className='right-td'>₡{transformCost(element.Costo)}</td>
              <td className='right-button'>
                <button className=' button' onClick={() => handleEditClick(element)}> Edit </button>
              </td>
              <td className='right-button'>
                <button className=' button cancel-button' onClick={() => handleDeleteClick(element)}> Delete </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <label className='Empty-message'>{(projectVoluntaryDeductions.length === 0) ? 'No voluntary deductions added yet' : ''}</label>
    </>
  );
};

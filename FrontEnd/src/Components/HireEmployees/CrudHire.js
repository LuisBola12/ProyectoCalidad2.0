import React from 'react';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useGetEmployeesToHire } from '../../Utils/HireAEmployee/useGetToHireEmployees';
import { useNavigate } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { FaArrowLeft } from 'react-icons/fa';

export const CrudHire = () => {
  const navigate = useNavigate();
  const handleHireEmployee = (element) => {
    navigate('hire', { state: element });
  };
  const back = () => {
    navigate(-1);
  }
  const { employeesToHire, infoReceived } = useGetEmployeesToHire();
  return !infoReceived ? <div className='loader' ></div > : (
    <>
      <div className='navigate-title'>
        <IconContext.Provider value={{ color: 'gray', className: 'global-class-name', size: '2.6rem' }}>
          <button className='back-arrow-button' onClick={() => { back(); }}>
            <FaArrowLeft />
          </button>
          <h2 className='navigate-title'>Employees To hire</h2>
        </IconContext.Provider>
      </div>
      <table className='Table'>
        <thead>
          <tr className='table-header'>
            <th className='table-left-border left-td'>Id</th>
            <th className='left-td'>Name</th>
            <th className='left-td'>First lastname</th>
            <th className='left-td'>Second lastname</th>
            <th className='table-right-border center-td'></th>
            
          </tr>
        </thead>
        <tbody>
          {employeesToHire.filter((v,i,a)=>a.findIndex(v2=>(v2.Cedula===v.Cedula))===i).map((element) => (
            <tr key={element.Cedula}>
              <td className='left-td table-left-border'>{element.Cedula}</td>
              <td className='left-td'>{element.Nombre}</td>
              <td className='left-td'>{element.Apellido1}</td>
              <td className='left-td'>{element.Apellido2}</td>
              <td className='center-button'>
                <button className='button' onClick={() => handleHireEmployee(element)}> Hire </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <label className='Empty-message'>{(employeesToHire.length === 0) ? 'There are no employees to hire' : ''}</label>
    </>
  );
};
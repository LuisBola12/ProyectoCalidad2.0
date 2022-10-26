import React from 'react';
import { useState, useEffect } from 'react';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';
import { getAnEntity } from './../../Utils/getAnEntity';
import { useNavigate } from 'react-router-dom';

export const CrudEmployee = () => {
  const [infoReceived, setInfoReceived] = useState(false);
  const activeProject = useSelector((state) => state.activeProject.projectName);
  const [data, setData] = useState();
  const handleEndContract = (element) => {
    navigate('terminateContract', { state: element });
  }
  const navigate = useNavigate();
  useEffect(() => {
    const getData = async () => {
      const newData = await getAnEntity('employee/', activeProject);
      setData(newData);
      setInfoReceived(true);
    };
    getData();
  }, []);

  return !infoReceived ? <div className='loader'></div> : (
    <>
      <h2 className='navigate-title'>{activeProject} Employees</h2>
      <div className='table-button'>
        <button className='create-button' onClick=
          {() => {
            navigate('createEmployee')
          }}>
          {' '}
          Create New Employee
        </button>
        <button className='hire-button' onClick={
          () => {
            navigate('hireAEmployee')
          }
        }>Hire Employee From Other Project</button>
      </div>
      <table className='Table'>
        <thead>
          <tr className='table-header'>
            <th className='table-left-border left-td'>Name</th>
            <th className='left-td'>Last Name</th>
            <th className='left-td'>Second Last Name</th>
            <th className='left-td'>Id</th>
            <th className='left-td'>Email</th>
            <th className='left-td'>Contract</th>
            <th className='table-right-border right-td'>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map((element) => (
            <tr key={element.Nombre}>
              <td className='table-left-border left-td'>{element.Nombre}</td>
              <td className='left-td'>{element.Apellido1}</td>
              <td className='left-td'>{element.Apellido2}</td>
              <td className='left-td'>{element.Cedula}</td>
              <td className='left-td'>{element.Email}</td>
              <td className='left-td'>{element.TipoContrato}</td>
              <td className='table-right-border right-button'>
                <button className='end-contract-button' onClick={()=>handleEndContract(element)}
                > End Contract </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <label className='Empty-message'>{(data.length === 0) ? 'No employees added yet' : ''}</label>
    </>
  );

};
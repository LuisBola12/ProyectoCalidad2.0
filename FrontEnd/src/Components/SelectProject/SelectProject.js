import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../../App.css';
import './SelectProject.scss';
import { useProjectsData } from '../../Utils/PayrollProjects/useProjectsData';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../Slices/user/userSlice';
import usePost from '../../shared/hooks/usePost';



export const SelectProjectComp = () => {
  const navigate = useNavigate();
  const { projects, handleProjectSelection, loading, setNeedToRefresh } = useProjectsData();
  const activeProject = useSelector((state) => state.activeProject.projectName);
  const rolFromUser = useSelector((state) => state.user.user.Roles);
  const dispatch = useDispatch();
  const [isDeletingProject, setIsDeletingProject] = useState(false);

  const { post, postError } = usePost(process.env.REACT_APP_BACKEND_LOCALHOST + 'logicEliminateProject', 'PUT');

  const proceedToEliminate = async (projectName) => {

    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'darkgreen',
      cancelButtonColor: 'darkred',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(`Eliminating: ${projectName}`);
        console.log('proceding eliminate project From database ');
        let string = '';
        string = JSON.stringify({
          Nombre: projectName,
        });
        post(string);
        if (postError) {
          console.log('Error Trying to delete');
        }
        setNeedToRefresh(true);
        Swal.fire({
          title: 'Deleted!',
          text: `The Project ${projectName} has been deleted.`,
          icon: 'success',
          confirmButtonColor: 'darkgreen',
        });
      }
    });
  };

  const eliminateProject = async (projectName) => {
    try {
      const activeEmployeesApiResponse = await fetch(process.env.REACT_APP_BACKEND_LOCALHOST + `getEmployeesInfo/${projectName}`);
      const activeEmployees = await activeEmployeesApiResponse.json();
      if (activeEmployees.length == 0) {
        proceedToEliminate(projectName);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops... Can\'t Delete Project',
          text: 'This project have active Employees',
          confirmButtonColor: 'darkgreen',
        });


        console.log('NO se puede eliminar: El proyecto Tiene empleados');
      } console.log('entra');

    } catch (error) {
      console.log(`Error en la solicitud de base de datos: ${error}`);
    }

  };

  const handleProjectClick = (projectName) => {
    if (isDeletingProject) {
      eliminateProject(projectName);
    }
    else {
      handleProjectSelection(projectName);
    }
  };


  return (
    < div className='project-style'>
      <div className='project-header'>
        <div className='project-logo'></div>
        <button className='project-backButton' onClick={() => {
          if (activeProject === '') {
            dispatch(logout());
            navigate('/');
          } else {
            rolFromUser === 'admin' ?
              (navigate('/dashBoard')) :
              (navigate('/myPayments'));
          }
        }}
        >
          X</button>
      </div>

      <div className='project-projectsRow'>
        {!loading ?
          projects.map((project) => {
            return (
              <div key={project.Nombre} className='project-projectBox'>
                {
                  (isDeletingProject) ? <button className='eliminateMinus-button' onClick={() => eliminateProject(project.Nombre)}>-</button> : <></>

                }
                <button
                  onClick={() => handleProjectClick(project.Nombre)} className='project-projectLogo'>
                  {project.Nombre.charAt(0).toLocaleUpperCase()}
                </button>
                <div className='project-projectName'>{project.Nombre}</div>
              </div>
            );
          })
          : null
        }

        {rolFromUser === 'admin' ? (
          <div>
            <button centered='true' className='project-buttonCreate' onClick={() => navigate('/newProjectForm')}>+</button >
            <p className='project-AddNewProjectText'>Add new Project</p>
          </div>
        ) : (<></>)}
      </div>
      {isDeletingProject && rolFromUser === 'admin' ? <button onClick={() => setIsDeletingProject(false)}  >cancel</button> : <></>}
      <div>
        <footer className='project-footerCopyRights'> &copy; SeleMiracleRun </footer>
      </div>
    </div >
  );
};

import { useSelector } from 'react-redux';

export const usePutToVoluntaryDeductions = () => {
  const activeProject = useSelector((state) => state.activeProject.projectName);
  const employeeEmail = useSelector((state) => state.user.user.Email);
  const unlinkVoluntaryDeductionApi = process.env.REACT_APP_BACKEND_LOCALHOST + 'myVoluntaryDeductions'
  const apiVoluntaryDeductions = process.env.REACT_APP_BACKEND_LOCALHOST + 'voluntaryDeductions'
  const employerId = useSelector((state) => state.user.user.Cedula);

  const updateVoluntaryDeduction = async (name, cost, description, apiVoluntaryDeductions) => {
    const newCost = cost.split(' ').join('');
    const postFetch = await fetch(apiVoluntaryDeductions, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        Nombre: name,
        NombreProyecto: activeProject,
        CedulaEmpleador: employerId,
        Costo: parseInt(newCost),
        Descripcion: description,
      }),
    });
    console.log(postFetch);
  };

  const unlinkEmployeeToVoluntaryDeduction = async (name) => {
    const postFetch = await fetch(unlinkVoluntaryDeductionApi, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        Email: employeeEmail,
        Proyecto: activeProject,
        NombreDeduccionVoluntaria: name
      }),
    });
    console.log(postFetch);
  };

  const deactivateVoluntaryDeduction = async (name) => {
    const postFetch = await fetch(apiVoluntaryDeductions, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        Nombre: name,
        NombreProyecto: activeProject,
        CedulaEmpleador: employerId
      }),
    });
    console.log(postFetch);
  };

  const reactivateVoluntaryDeduction = async ( name, reactivateVoluntaryDeductionApi ) => {
    const postFetch = await fetch( reactivateVoluntaryDeductionApi, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify( {
        Nombre: name,
        NombreProyecto: activeProject,
        CedulaEmpleador: employerId
      } ),
    } );
    console.log( postFetch );
  };

  return {
    updateVoluntaryDeduction, unlinkEmployeeToVoluntaryDeduction, deactivateVoluntaryDeduction, reactivateVoluntaryDeduction
  };
};
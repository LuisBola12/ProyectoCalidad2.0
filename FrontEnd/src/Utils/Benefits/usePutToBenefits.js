import { useSelector } from 'react-redux';

export const usePutToBenefits = () => {
  const activeProject = useSelector( ( state ) => state.activeProject.projectName );
  const employeeEmail = useSelector( ( state ) => state.user.user.Email );
  const unlinkBenefitApi = process.env.REACT_APP_BACKEND_LOCALHOST + 'myBenefits';
  const apiBenefits = process.env.REACT_APP_BACKEND_LOCALHOST + 'benefits';
  const employerId = useSelector( ( state ) => state.user.user.Cedula );
  const updateBenefit = async ( name, cost, description, apiBenefits ) => {
    const newCost = cost.split( ' ' ).join( '' );
    const postFetch = await fetch( apiBenefits, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify( {
        Nombre: name,
        NombreProyecto: activeProject,
        CedulaEmpleador: employerId,
        CostoActual: parseInt( newCost ),
        Descripción: description,
      } ),
    } );
    console.log( postFetch );
  };

  const unlinkEmployeeToBenefit = async ( name ) => {
    const postFetch = await fetch( unlinkBenefitApi, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify( {
        Email: employeeEmail,
        Proyecto: activeProject,
        NombreBeneficio: name
      } ),
    } );
    console.log( postFetch );
  };

  const deactivateBenefit = async ( name ) => {
    const postFetch = await fetch( apiBenefits, {
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

  const reactivateBenefit = async ( name, reactivateBenefitApi ) => {
    const postFetch = await fetch( reactivateBenefitApi, {
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
    updateBenefit, unlinkEmployeeToBenefit, deactivateBenefit, reactivateBenefit
  };
};
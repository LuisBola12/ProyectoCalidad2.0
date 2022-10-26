import { useSelector } from 'react-redux';

export const usePostToBenefits = () => {
  const activeProject = useSelector( ( state ) => state.activeProject.projectName );
  const apiBenefits = process.env.REACT_APP_BACKEND_LOCALHOST + 'benefits';
  const apiBenefitsToEmplyee = process.env.REACT_APP_BACKEND_LOCALHOST + 'myBenefits';
  const employeeEmail = useSelector( ( state ) => state.user.user.Email );
  const employerId = useSelector( ( state ) => state.user.user.Cedula );
  const submitBenefit = async ( name, cost, description ) => {
    const newCost = cost.split( ' ' ).join( '' );
    const postFetch = await fetch( apiBenefits, {
      method: 'POST',
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

  const submitBenefitToEmployee = async ( benefitName ) => {
    const postFetch = await fetch( apiBenefitsToEmplyee, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify( {
        Email: employeeEmail,
        NombreProyecto: activeProject,
        NombreBeneficio: benefitName,
      } ),
    } );
    console.log( postFetch );
  };

  return {
    submitBenefit, submitBenefitToEmployee
  };
};
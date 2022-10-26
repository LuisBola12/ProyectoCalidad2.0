
import { useSelector, useDispatch } from 'react-redux';
import usePost from '../../shared/hooks/usePost';
import Swal from 'sweetalert2';
import { updateActiveProject } from '../../Slices/projectSlice/activeProjectSlice';
import { useNavigate } from 'react-router-dom';

export const useProjectManagement = () => {
  const navigate = useNavigate();
  const { post: eliminateProjectFromDatabase, postError: eliminateProjectFromDatabaseError } = usePost( process.env.REACT_APP_BACKEND_LOCALHOST + 'logicEliminateProject', 'PUT' );
  const dispatch = useDispatch();
  const employerID = useSelector( ( state ) => state.user.user.Cedula );

  const eliminateProject = async ( projectName ) => {
    try {
      Swal.fire( {
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'darkgreen',
        cancelButtonColor: 'darkred',
        confirmButtonText: 'Yes, delete it!'
      } ).then( async ( result ) => {

        if ( result.isConfirmed ) {
          const activeEmployeesApiResponse = await fetch( process.env.REACT_APP_BACKEND_LOCALHOST + `getEmployeesInfo/${projectName}` );
          const activeEmployees = await activeEmployeesApiResponse.json();
          console.log( activeEmployees );
          if ( activeEmployees.length > 0 ) {
            Swal.fire( {
              title: 'Confirmation',
              text: 'This project has active employees, do you want to eliminate it and notify all employees',
              icon: 'info',
              showCancelButton: true,
              confirmButtonColor: 'darkgreen',
              cancelButtonColor: 'darkred'
            } ).then( ( result ) => {
              if ( result.isConfirmed ){
                try {
                  let string = '';
                  string = JSON.stringify( { projectName: projectName, employerID: employerID } );
                  eliminateProjectFromDatabase( string );

                  Swal.fire( {
                    title: 'Deleted!',
                    text: `The Project ${projectName} has been deleted.`,
                    icon: 'success',
                    confirmButtonColor: 'darkgreen',
                    cancelButtonColor: 'darkred'
                  } );
                  dispatch( updateActiveProject( '' ) );
                  navigate( '/' );
                } catch ( error ) {
                  Swal.fire( {
                    icon: 'error',
                    title: 'Error...',
                    text: 'There was an error connecting to database',
                    confirmButtonColor: 'darkgreen'
                  } );
                  console.log( `Error: ${error}\n databaseError:${eliminateProjectFromDatabaseError} ` );
                }
              }
            } );
          } else {
            let string = '';
            string = JSON.stringify( { projectName: projectName, employerID: employerID } );
            eliminateProjectFromDatabase( string );
            Swal.fire( {
              title: 'Deleted!',
              text: `The Project ${projectName} has been deleted.`,
              icon: 'success',
              confirmButtonColor: 'darkgreen',
              cancelButtonColor: 'darkred'
            } );
            dispatch( updateActiveProject( '' ) );
            navigate( '/' );
          }
        }
      } );
    } catch ( error ) {
      console.log( `Error: ${error}` );
    }
  };

  return {
    eliminateProject
  };
};

export default useProjectManagement;

import { useState, useEffect } from 'react';
export const useGetTypeOfContracts = () => {
  const [ typeOfContracts, setTypeOfContracts ] = useState();
  const [ contractsReceived, setContractsReceived ] = useState( false );

  useEffect( () => {
    const fetchTypeContracts = async () => {
      const seleUrl = process.env.REACT_APP_BACKEND_LOCALHOST + 'typeContracts';
      try {
        const response = await fetch( seleUrl );
        const newData = await response.json();
        setTypeOfContracts( newData );
        setContractsReceived( true );
      } catch ( error ) {
        console.log( error );
      }
    };
    fetchTypeContracts();
  }, [] );
  return {
    typeOfContracts,
    contractsReceived,
  };
};

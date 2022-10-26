import React from 'react';
import './pagination.scss';
import { useState } from 'react';
import { IconContext } from 'react-icons';
import { MdOutlineArrowForwardIos, MdOutlineArrowBackIos } from 'react-icons/md';

export const Pagination = ( { page,setPage,maxPage } ) => {
  const [ pageInput, setPageInput ] = useState( 1 );

  const handleNext = () => {
    setPage( page + 1 );
    setPageInput( page + 1 );
  };

  const handlePrev = () => {
    setPage( page - 1 );
    setPageInput( page - 1 );
  };

  const onInputEnter = ( e ) => {
    if ( e.keyCode === 13 ) {
      if ( e.target.value >= 1 && e.target.value <= maxPage && !e.target.value.includes( ',' ) 
        && !e.target.value.includes( '.' ) ){
        setPage( e.target.value );
      }
    }
  };

  const onInputChange = ( e ) => {
    setPageInput( e.target.value );
  };
  return (
    <div className='pagination-comp'>
      <IconContext.Provider value={{ className:'pagination-button-icon' }}>
        <button 
          className='pagination-button' 
          onClick={handlePrev}
          disabled={page == 1}
        >
          <MdOutlineArrowBackIos/> 
        </button>
      </IconContext.Provider>
      <input 
        type={'number'} 
        className='page-input'
        value={pageInput}
        onKeyDown={onInputEnter}
        onChange={onInputChange}
      >
      </input>
      <label> of {maxPage}</label>
      <IconContext.Provider value={{ className:'pagination-button-icon' }}>
        <button
          className='pagination-button' 
          onClick={handleNext}
          disabled={page == maxPage}
        > 
          <MdOutlineArrowForwardIos/> 
        </button>
      </IconContext.Provider>
      
    </div>
  );
};

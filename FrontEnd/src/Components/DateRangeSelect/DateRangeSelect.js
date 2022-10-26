import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { DateRange } from 'react-date-range';
import format from 'date-fns/format';
import '../../App.css';
import 'react-date-range/dist/styles.css';
import './DateRange.css';

export const DateRangeSelect = ( { range, setRange, filterSwitch, setFilterSwitch } ) => {


  const [ open, setOpen ] = useState( false );

  const refOne = useRef( null );

  useEffect( () => {
    document.addEventListener( 'keydown', hideOnEscape, true );
    document.addEventListener( 'click', hideOnClickOutside, true );
  }, [] );

  const hideOnEscape = ( e ) => {
    if ( e.key === 'Escape' ) {
      setOpen( false );
    }
  };

  const hideOnClickOutside = ( e ) => {
    if ( refOne.current && !refOne.current.contains( e.target ) ) {
      setOpen( false );
    }
  };

  const handleFilterClick = () => {
    setFilterSwitch( !filterSwitch );
  };

  return (
    <div className="calendarWrap">

      <input
        value={`${format( range[0].startDate, 'dd/MM/yyyy' )} to ${format( range[0].endDate, 'dd/MM/yyyy' )}`}
        readOnly
        className="project-date-filter"
        onClick={() => setOpen( open => !open )}
      />

      <div ref={refOne}>
        {open &&
          <>
            <DateRange
              onChange={item => setRange( [ item.selection ] )}
              editableDateInputs={true}
              moveRangeOnFirstSelection={false}
              ranges={range}
              months={2}
              direction="horizontal"
              className="calendarElement"
              maxDate={new Date()}
              fixedHeight={true}
            />
            <button className='calendarButton' onClick={handleFilterClick}> Filter </button>
          </>
        }
      </div>

    </div>
  );
};

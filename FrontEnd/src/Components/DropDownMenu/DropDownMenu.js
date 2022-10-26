import './DropDownMenu.css';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../Slices/user/userSlice';
import { resetProject } from '../../Slices/projectSlice/activeProjectSlice';

export const Menu = ( props ) => {
  const [ open, setOpen ] = useState( false );
  return (

    <li className='sidebar-component'>
      <a className='sidebar-dropdown-icon' onClick={() => setOpen( !open )}>
        {props.icon}
      </a>
      {open && props.children}
    </li>
  );
};

export const DropdownMenu = () => {
  const navigate = useNavigate();
  const activeMenu = 'main';
  const [ menuHeight, setMenuHeight ] = useState( null );
  const dropdownRef = useRef( null );
  const rolFromUser = useSelector( ( state ) => state.user.user.Roles );
  const dispatch = useDispatch();
  const redirectToProjectSelecion = () => {
    navigate( '/' );
  };

  useEffect( () => {
    setMenuHeight( dropdownRef.current?.firstChild.offsetHeight );
  }, [] );

  function calcHeight( el ) {
    const height = el.offsetHeight;

    setMenuHeight( height );
  }
  const redirectToProfile = () => {
    navigate( '/userProfile' );
  };
  const redirectToLogIn = () => {
    dispatch( logout() );
    dispatch( resetProject() );
    navigate( '/' );
  };


  return (
    <div className='sidebar-dropdown' style={{ height: menuHeight }} ref={dropdownRef}>
      <CSSTransition
        in={activeMenu === 'main'}
        timeout={500}
        unmountOnExit
        onEnter={calcHeight}>
        <div className='sidebar-menu'>
          <button onClick={redirectToProfile} className='sidebar-button' >
            Profile
          </button>
          {
            rolFromUser === 'emp' ? (
              <button onClick={() => { navigate( '/PaymentsReport' ); }} className='sidebar-button' >
                My Payments Reports
              </button>
            ) :
              null
          }
          <button onClick={redirectToProjectSelecion} className='sidebar-button' >
            Select Project
          </button>
          {
            rolFromUser === 'admin' && (
              <>
                <button onClick={() => { navigate( '/projectSettings' ); }} className='sidebar-button' >
                  Project Configuration
                </button>

                <button onClick={() => { navigate( '/paymentsPerEmployee' ); }} className='sidebar-button' >
                  Payments Per Employee
                </button>

                <button onClick={() => { navigate( '/paymentsReport' ); }} className='sidebar-button' >
                  Payments Reports
                </button>
              </>
            )
          }
          <button onClick={redirectToLogIn} className='sidebar-button' >
            Sign Out
          </button>
        </div>
      </CSSTransition >
    </div >
  );
};

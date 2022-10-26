import React from 'react';
import { useSelector } from 'react-redux';
import { Nav, NavLink, NavMenu } from './NavbarElements';
import { DropdownMenu, Menu } from '../DropDownMenu/DropDownMenu';
import { ReactComponent as ListIcon } from '../DropDownMenu/icons/list.svg';
import './Navbar.css';

export const Navbar = () => {
  const activeProject = useSelector((state) => state.activeProject.projectName);
  const user = useSelector((state) => state.user.user);
  return (
    <>
      <div>
        <Nav>
          <div className='navBar-logo'></div>
          <NavMenu>
            {user.Roles === 'admin' &&
              <>
                <NavLink to="/dashBoard" activestyle='true'>
                  DashBoard
                </NavLink>
                <NavLink to='/payroll' activestyle='true'>
                  Payroll
                </NavLink>
                <NavLink to='/employees' activestyle='true'>
                  Employees
                </NavLink>
                <NavLink to='/benefits' activestyle='true'>
                  Benefits
                </NavLink>
                <NavLink to='/voluntaryDeductions' activestyle='true'>
                  Voluntary Deductions
                </NavLink>
              </>
            }
            {user.Roles === 'emp' &&
              <>
                <NavLink to="/myPayments" activestyle='true'>
                  My Payments
                </NavLink>
                <NavLink to='/myBenefits' activestyle='true'>
                  My Benefits
                </NavLink>
                <NavLink to="/myVoluntaryDeductions" activestyle='true'>
                  My Voluntary Deductions
                </NavLink>
                { user.TipoContrato === 'Por Horas' && 
                  <NavLink to="/registerHours" activestyle='true'>
                  Hours
                 </NavLink>
                }
              </>
            }
          </NavMenu>
          <div className='navbar-corner'>
            <div className='navbar-project-user'>
              <div className='activeProject'>{activeProject}</div>
              <div className='activeUser'>{user.Email.charAt(0).toLocaleUpperCase()}</div>
            </div>
            <Menu icon={<ListIcon />}>
              <DropdownMenu></DropdownMenu>
            </Menu>
          </div>

        </Nav>

      </div>
    </>
  );
};
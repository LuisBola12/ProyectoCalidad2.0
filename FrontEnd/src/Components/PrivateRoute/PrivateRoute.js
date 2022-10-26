import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoute = ({
  children,
  redirectPath = '/',
  allowedRoles,
})  => {
  const userState = useSelector((state) => state.user);
 

  if (!userState.userIsLoggedIn) {
    return <Navigate to={redirectPath} replace />;
  }

  if (userState.user.Roles !== allowedRoles[0]) {
    return <Navigate to={'/no-autorizado'} replace />;
  }

  if (userState.user.Roles === null) {
    return <Navigate to={'/no-autorizado'} replace />;
  }

  return children || <Outlet />;
}
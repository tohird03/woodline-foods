import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import {ROUTES} from '../constants/router';

type Props = {
  isAuth: boolean | null;
};

export const PrivateRoute = ({isAuth}: Props) =>
  isAuth
    ? <Outlet />
    : <Navigate to={ROUTES.login} />;

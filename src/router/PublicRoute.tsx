import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import {ROUTES} from '../constants/router';
import {AuthProps} from './types';

export const PublicRoutes = ({isAuth}: AuthProps) =>
  isAuth
    ? <Navigate to={ROUTES.home} />
    : <Outlet />;

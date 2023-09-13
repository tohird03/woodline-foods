import React, {Suspense} from 'react';
import {Navigate, useRoutes} from 'react-router-dom';
import {observer} from 'mobx-react';
import {Loading} from '../components/Loading';
import {ROUTES} from '../constants/router';
import DashboardLayout from '../layouts/dashboard';
import SimpleLayout from '../layouts/simple';
import {
  AddFoods,
  Foods,
  NotFound,
  Order,
  Organisation,
  PhoneLogin,
  Products,
  Users,
} from './lazy';
import {PrivateRoute} from './PrivateRoute';
import {PublicRoutes} from './PublicRoute';
import {AuthProps} from './types';

export const Router = observer(({isAuth}: AuthProps) => {
  const routes = useRoutes([
    {
      path: ROUTES.home,
      element: <Suspense fallback={<Loading />}><DashboardLayout /></Suspense>,
      children: [
        {
          element: <Navigate to={ROUTES.users} />,
          index: true,
        },
        {
          path: ROUTES.users,
          element: <Suspense fallback={<Loading />}><Users /></Suspense>,
        },
        {
          path: ROUTES.product, element: <Suspense fallback={<Loading />}><Products /></Suspense>,
        },
        {
          path: ROUTES.food,
          element: <Suspense fallback={<Loading />}><Foods /></Suspense>,
        },
        {
          path: ROUTES.org,
          element: <Suspense fallback={<Loading />}><Organisation /></Suspense>,
        },
        {
          path: ROUTES.order,
          element: <Suspense fallback={<Loading />}><Order /></Suspense>,
        },
        {
          path: ROUTES.addFood,
          element: <Suspense fallback={<Loading />}><AddFoods /></Suspense>,
        },
      ],
    },
    {
      path: ROUTES.login,
      element: <Suspense fallback={<Loading />}><PhoneLogin />  </Suspense>,
    },
    {
      element: <SimpleLayout />,
      children: [
        {element: <Navigate to="/dashboard/app" />, index: true},
        {path: '404', element: <NotFound />},
        {path: '*', element: <Navigate to="/404" />},
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
});

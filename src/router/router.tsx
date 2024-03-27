import React, {Suspense} from 'react';
import {Navigate, useRoutes} from 'react-router-dom';
import {observer} from 'mobx-react';
import {Loading} from '../components/Loading';
import {ROUTES} from '../constants/router';
import DashboardLayout from '../layouts/dashboard';
import SimpleLayout from '../layouts/simple';
import {
  AddFoods,
  Admin,
  Dashboard,
  EditFoods,
  Foods,
  FoodsOneFood,
  GetRoles,
  History,
  Lunch,
  LunchBase,
  LunchBaseProduct,
  MealPoll,
  NotFound,
  Order,
  Organisation,
  Payments,
  PhoneLogin,
  ProductLogs,
  Products,
  SingleUser,
  Users,
} from './lazy';
import {PrivateRoute} from './PrivateRoute';
import {PublicRoutes} from './PublicRoute';
import {RoleChecker} from './RoleChecker';
import {AuthProps} from './types';

export const Router = observer(({isAuth}: AuthProps) => {
  const routes = useRoutes([
    {
      path: ROUTES.home,
      element: <PrivateRoute isAuth={isAuth} />,
      children: [
        {
          path: ROUTES.home,
          element: <DashboardLayout />,
          children: [
            {
              element: (
                <RoleChecker
                  page={<Suspense fallback={<Loading />}><Dashboard /></Suspense>}
                  path={ROUTES.home}
                />),
              index: true,
            },
            {
              path: ROUTES.users,
              element: (
                <RoleChecker page={<Suspense fallback={<Loading />}><Users /></Suspense>} path={ROUTES.users} />
              ),
            },
            {
              path: ROUTES.userOrders,
              element: (
                <RoleChecker page={<Suspense fallback={<Loading />}><SingleUser /></Suspense>} path={ROUTES.users} />
              ),
            },
            {
              path: ROUTES.roles,
              element: (
                <RoleChecker page={<Suspense fallback={<Loading />}><GetRoles /></Suspense>} path={ROUTES.roles} />
              ),
            },
            {
              path: ROUTES.updateRole,
              element: (
                <RoleChecker page={<Suspense fallback={<Loading />}><GetRoles /></Suspense>} path={ROUTES.roles} />
              ),
            },
            {
              path: ROUTES.product,
              element: (
                <RoleChecker page={<Suspense fallback={<Loading />}><Products /></Suspense>} path={ROUTES.product} />
              ),
            },
            {
              path: ROUTES.food,
              element: (
                <RoleChecker page={<Suspense fallback={<Loading />}><Foods /></Suspense>} path={ROUTES.food} />
              ),
            },
            {
              path: ROUTES.org,
              element: (
                <RoleChecker page={<Suspense fallback={<Loading />}><Organisation /></Suspense>} path={ROUTES.org} />
              ),
            },
            {
              path: ROUTES.order,
              element: (
                <RoleChecker page={<Suspense fallback={<Loading />}><Order /></Suspense>} path={ROUTES.order} />
              ),
            },
            {
              path: ROUTES.addFood,
              element: (
                <RoleChecker page={<Suspense fallback={<Loading />}><AddFoods /></Suspense>} path={ROUTES.addFood} />
              ),
            },
            {
              path: ROUTES.lunch,
              element: (
                <RoleChecker page={<Suspense fallback={<Loading />}><Lunch /></Suspense>} path={ROUTES.lunch} />
              ),
            },
            {
              path: ROUTES.lunchBase,
              element: (
                <RoleChecker page={<Suspense fallback={<Loading />}><LunchBase /></Suspense>} path={ROUTES.lunchBase} />
              ),
            },
            // {
            //   path: ROUTES.lunchAdd,
            //   element: (
            //     <RoleChecker page={<Suspense fallback={<Loading />}><AddLunch /></Suspense>} path={ROUTES.lunch} />
            //   ),
            // },
            {
              path: ROUTES.admins,
              element: (
                <RoleChecker page={<Suspense fallback={<Loading />}><Admin /></Suspense>} path={ROUTES.admins} />
              ),
            },
            {
              path: ROUTES.history,
              element: (
                <RoleChecker page={<Suspense fallback={<Loading />}><History /></Suspense>} path={ROUTES.admins} />
              ),
            },
            {
              path: ROUTES.payments,
              element: (
                <RoleChecker page={<Suspense fallback={<Loading />}><Payments /></Suspense>} path={ROUTES.admins} />
              ),
            },
            {
              path: ROUTES.productLogs,
              element: (
                <RoleChecker page={<Suspense fallback={<Loading />}><ProductLogs /></Suspense>} path={ROUTES.admins} />
              ),
            },
            {
              path: ROUTES.foodEdit,
              element: (
                <RoleChecker page={<Suspense fallback={<Loading />}><EditFoods /></Suspense>} path={ROUTES.admins} />
              ),
            },
            {
              path: ROUTES.LunchBaseProduct,
              element: (
                <RoleChecker
                  page={
                    <Suspense fallback={<Loading />}>
                      <LunchBaseProduct />
                    </Suspense>
                  } path={ROUTES.admins}
                />
              ),
            },
            {
              path: ROUTES.foodProduct,
              element: (
                <RoleChecker
                  page={
                    <Suspense fallback={<Loading />}>
                      <FoodsOneFood />
                    </Suspense>
                  } path={ROUTES.admins}
                />
              ),
            },
            {
              path: ROUTES.mealPoll,
              element: (
                <RoleChecker
                  page={
                    <Suspense fallback={<Loading />}>
                      <MealPoll />
                    </Suspense>
                  } path={ROUTES.admins}
                />
              ),
            },
          ],
        },
      ],
    },
    {
      path: ROUTES.login,
      element: <PublicRoutes isAuth={isAuth} />,
      children: [
        {
          path: ROUTES.login,
          element: <Suspense fallback={<Loading />}><PhoneLogin />  </Suspense>,
        },
      ],
    },
    {
      element: <SimpleLayout />,
      children: [
        {element: <Navigate to="/dashboard/app" />, index: true},
        {path: '404', element: <Suspense fallback={<Loading />}><NotFound /></Suspense>},
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

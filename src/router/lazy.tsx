import {lazy} from 'react';
import {Loading} from '../components/Loading';

const handleCatchChunkError = () => {
  window.location.reload();

  return {default: Loading};
};

export const Users = lazy(() =>
  import('../pages/Users')
    .then(({Users}) => ({default: Users}))
    .catch(handleCatchChunkError));

export const NotFound = lazy(() =>
  import('../pages/NotFound')
    .then(({NotFound}) => ({default: NotFound}))
    .catch(handleCatchChunkError));

export const PhoneLogin = lazy(() =>
  import('../pages/Login')
    .then(({PhoneLogin}) => ({default: PhoneLogin}))
    .catch(handleCatchChunkError));

export const Products = lazy(() =>
  import('../pages/Products')
    .then(({Products}) => ({default: Products}))
    .catch(handleCatchChunkError));

export const Foods = lazy(() =>
  import('../pages/Foods')
    .then(({Foods}) => ({default: Foods}))
    .catch(handleCatchChunkError));

export const Organisation = lazy(() =>
  import('../pages/Organisation')
    .then(({Organisation}) => ({default: Organisation}))
    .catch(handleCatchChunkError));

export const Order = lazy(() =>
  import('../pages/Order')
    .then(({Order}) => ({default: Order}))
    .catch(handleCatchChunkError));

export const AddFoods = lazy(() =>
  import('../pages/Foods/AddFoods')
    .then(({AddFoods}) => ({default: AddFoods}))
    .catch(handleCatchChunkError));

export const Dashboard = lazy(() =>
  import('../pages/Dashboard')
    .then(({Dashboard}) => ({default: Dashboard}))
    .catch(handleCatchChunkError));

export const Lunch = lazy(() =>
  import('../pages/Lunch')
    .then(({Lunch}) => ({default: Lunch}))
    .catch(handleCatchChunkError));

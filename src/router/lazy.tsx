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

export const SingleUser = lazy(() =>
  import('../pages/Users/SingleUser')
    .then(({SingleUser}) => ({default: SingleUser}))
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

export const GetRoles = lazy(() =>
  import('../pages/Roles')
    .then(({Roles}) => ({default: Roles}))
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

export const LunchBase = lazy(() =>
  import('../pages/Lunch/LunchBase')
    .then(({LunchBase}) => ({default: LunchBase}))
    .catch(handleCatchChunkError));

export const AddLunch = lazy(() =>
  import('../pages/Lunch/AddLunch')
    .then(({AddLunch}) => ({default: AddLunch}))
    .catch(handleCatchChunkError));

export const Admin = lazy(() =>
  import('../pages/Admin')
    .then(({Admin}) => ({default: Admin}))
    .catch(handleCatchChunkError));

export const History = lazy(() =>
  import('../pages/History')
    .then(({History}) => ({default: History}))
    .catch(handleCatchChunkError));

export const Payments = lazy(() =>
  import('../pages/Payments')
    .then(({Payments}) => ({default: Payments}))
    .catch(handleCatchChunkError));

export const ProductLogs = lazy(() =>
  import('../pages/ProductLogs')
    .then(({ProductLogs}) => ({default: ProductLogs}))
    .catch(handleCatchChunkError));

export const EditFoods = lazy(() =>
  import('../pages/Foods/EditFoods')
    .then(({EditFoods}) => ({default: EditFoods}))
    .catch(handleCatchChunkError));

export const LunchBaseProduct = lazy(() =>
  import('../pages/Lunch/LunchBase/LunchaBaseOneLunch')
    .then(({LunchBaseProduct}) => ({default: LunchBaseProduct}))
    .catch(handleCatchChunkError));

export const FoodsOneFood = lazy(() =>
  import('../pages/Foods/FoodsOneFood')
    .then(({FoodsOneFood}) => ({default: FoodsOneFood}))
    .catch(handleCatchChunkError));

export const MealPoll = lazy(() =>
  import('../pages/MealPoll')
    .then(({MealPoll}) => ({default: MealPoll}))
    .catch(handleCatchChunkError));

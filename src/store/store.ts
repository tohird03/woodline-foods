import {appStore} from './app';
import {authStore} from './auth';
import {lunchStore} from './lunch';
import {orderStore} from './order';
import {organisationStore} from './organisation';
import {productStore} from './products';
import {usersStore} from './users';

export const store = {
  authStore,
  usersStore,
  productStore,
  appStore,
  organisationStore,
  orderStore,
  lunchStore,
};

export const resetStores = () => {
  authStore.reset();
  usersStore.reset();
  productStore.reset();
  appStore.reset();
  organisationStore.reset();
  orderStore.reset();
  lunchStore.reset();
};

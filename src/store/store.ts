import {appStore} from './app';
import {authStore} from './auth';
import {dashboardStore} from './dashboard';
import {lunchStore} from './lunch';
import {orderStore} from './order';
import {organisationStore} from './organisation';
import {productStore} from './products';
import {usersStore} from './users';

export const store = {
  appStore,
  authStore,
  dashboardStore,
  lunchStore,
  orderStore,
  organisationStore,
  productStore,
  usersStore,
};

export const resetStores = () => {
  appStore.reset();
  authStore.reset();
  dashboardStore.reset();
  lunchStore.reset();
  orderStore.reset();
  organisationStore.reset();
  productStore.reset();
  usersStore.reset();
};

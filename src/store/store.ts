import {adminStore} from './admin';
import {appStore} from './app';
import {authStore} from './auth';
import {dashboardStore} from './dashboard';
import {historyStore} from './history';
import {lunchStore} from './lunch';
import {orderStore} from './order';
import {organisationStore} from './organisation';
import {productStore} from './products';
import {usersStore} from './users';

export const store = {
  adminStore,
  appStore,
  authStore,
  dashboardStore,
  lunchStore,
  orderStore,
  organisationStore,
  productStore,
  usersStore,
  historyStore,
};

export const resetStores = () => {
  adminStore.reset();
  appStore.reset();
  authStore.reset();
  dashboardStore.reset();
  lunchStore.reset();
  orderStore.reset();
  organisationStore.reset();
  productStore.reset();
  usersStore.reset();
  historyStore.reset();
};

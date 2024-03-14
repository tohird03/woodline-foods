import {adminStore} from './admin';
import {appStore} from './app';
import {authStore} from './auth';
import {dashboardStore} from './dashboard';
import {historyStore} from './history';
import {lunchStore} from './lunch';
import {orderStore} from './order';
import {organisationStore} from './organisation';
import {paymentStore} from './payment';
import {productLogsStore} from './productLogs';
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
  paymentStore,
  productLogsStore,
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
  paymentStore.reset();
  productLogsStore.reset();
};

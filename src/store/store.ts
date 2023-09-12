import {authStore} from './auth';
import {productStore} from './products';
import {usersStore} from './users';

export const store = {
  authStore,
  usersStore,
  productStore,
};

export const resetStores = () => {
  authStore.reset();
  usersStore.reset();
  productStore.reset();
};

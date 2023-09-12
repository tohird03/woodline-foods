import {authStore} from './auth';
import {usersStore} from './users';

export const store = {
  authStore,
  usersStore,
};

export const resetStores = () => {
  authStore.reset();
  usersStore.reset();
};

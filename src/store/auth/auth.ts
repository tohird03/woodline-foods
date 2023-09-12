import {makeAutoObservable} from 'mobx';

class AuthStore {
  token = '';
  constructor() {
    makeAutoObservable(this);
  }

  reset() {
    this.token = '';
  }
}

export const authStore = new AuthStore();

import {makeAutoObservable} from 'mobx';
import {IPagination} from '../../api/types';
import {usersApi} from '../../api/users';
import {IUsers} from '../../api/users/types';
import {addAxiosErrorNotification} from '../../utils/notification';

class UsersStore {
  users: IUsers[] = [];
  constructor() {
    makeAutoObservable(this);
  }

  getUsers = (params: IPagination) =>
    usersApi.getUsers(params)
      .then(res => {
        if (res) {
          this.setUsers(res);
        }
      })
      .catch(addAxiosErrorNotification);

  setUsers = (users: IUsers[]) => {
    this.users = users;
  };

  reset() {
    this.users = [];
  }
}

export const usersStore = new UsersStore();

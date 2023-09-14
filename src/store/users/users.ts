import {makeAutoObservable} from 'mobx';
import {IPagination} from '../../api/types';
import {usersApi} from '../../api/users';
import {IUsers} from '../../api/users/types';
import {addAxiosErrorNotification, successNotification} from '../../utils/notification';

class UsersStore {
  users: IUsers[] = [];
  totalUsers = 0;
  page = 1;
  size = 10;

  constructor() {
    makeAutoObservable(this);
  }

  getUsers = (params: IPagination) =>
    usersApi.getUsers(params)
      .then(res => {
        if (res) {
          this.setUsers(res?.data);
          this.setTotalUsers(res?.totalUsers);
        }
      })
      .catch(addAxiosErrorNotification);

  userStatusChange = (id: string) =>
    usersApi.changeUserStatus(id)
      .then((res) => {
        successNotification('Success status change');
        this.getUsers({
          page: this.page,
          size: this.size,
        });

        return res;
      })
      .catch(addAxiosErrorNotification);

  setUsers = (users: IUsers[]) => {
    this.users = users;
  };

  setTotalUsers = (total: number) => {
    this.totalUsers = total;
  };

  setPage = (page: number) => {
    this.page = page;
  };

  setSize = (size: number) => {
    this.size = size;
  };

  reset() {
    this.users = [];
    this.totalUsers = 0;
    this.page = 1;
    this.size = 10;
  }
}

export const usersStore = new UsersStore();

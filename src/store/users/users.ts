import {makeAutoObservable} from 'mobx';
import {IPagination} from '../../api/types';
import {usersApi} from '../../api/users';
import {IChangeOrganisation, IChangeStatus, IOrganisation, IUsers} from '../../api/users/types';
import {addAxiosErrorNotification, successNotification} from '../../utils/notification';

class UsersStore {
  users: IUsers[] = [];
  totalUsers = 0;
  isOpenOrganisationModal = false;
  organisations: IOrganisation[] = [];
  page = 1;
  size = 10;
  singleUser: IUsers | null = null;
  isOpenBalanceModal = false;

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

  userStatusChange = (params: IChangeStatus) =>
    usersApi.changeUserStatus(params)
      .then((res) => {
        successNotification('Success status change');
        this.getUsers({
          page: this.page,
          size: this.size,
        });

        return res;
      })
      .catch(addAxiosErrorNotification);

  getOrganisation = (params: IPagination) =>
    usersApi.getOrganisation(params)
      .then(res => {
        if (res) {
          this.setOrganisation(res?.data);
        }

        return res;
      })
      .catch(addAxiosErrorNotification);

  changeOrganisation = (params: IChangeOrganisation) =>
    usersApi.changeOrganisation(params)
      .then(res => {
        successNotification('Success organisation change');

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

  setIsOpenOrganisationModal = (isOpen: boolean) => {
    this.isOpenOrganisationModal = isOpen;
  };

  setOrganisation = (organisation: IOrganisation[]) => {
    this.organisations = organisation;
  };

  setSingleUser = (singleUser: IUsers | null) => {
    this.singleUser = singleUser;
  };

  setIsOpenBalanceModal = (isOpen: boolean) => {
    this.isOpenBalanceModal = isOpen;
  };

  reset() {
    this.users = [];
    this.totalUsers = 0;
    this.page = 1;
    this.size = 10;
    this.isOpenOrganisationModal = false;
  }
}

export const usersStore = new UsersStore();

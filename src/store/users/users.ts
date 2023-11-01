import {makeAutoObservable} from 'mobx';
import {IPagination} from '../../api/types';
import {usersApi} from '../../api/users';
import {
  IChangeOrganisation,
  IChangeRole,
  IChangeStatus,
  IGetUserOrders,
  IOrganisation,
  IUserOrders,
  IUserOrdersFoods,
  IUserParams,
  IUsers,
  TransactionParams,
} from '../../api/users/types';
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
  isOpenChangeRoleModal = false;
  search = '';
  totalUserOrder = 0;
  userOrders: IGetUserOrders[] = [];
  orderPage = 1;
  orderSize = 10;
  isOpenOrderProductModal = false;
  foods: IUserOrdersFoods[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  getUsers = (params: IUserParams) =>
    usersApi.getUsers(params)
      .then(res => {
        if (res) {
          this.setUsers(res?.data);
          this.setTotalUsers(res?.totalUsers);
        }
      })
      .catch(addAxiosErrorNotification);

  getUserOrder = (params: IUserOrders) =>
    usersApi.getUserOrders(params)
      .then(res => {
        if (res) {
          this.setUserOrder(res?.data);
          this.setTotalUserOrders(res?.totalOrders);
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

  changeUserVerify = (id: string) =>
    usersApi.changeVerifyUser(id)
      .then(res => {
        successNotification('Success user verify');

        this.getUsers({
          page: this.page,
          size: this.size,
        });

        return res;
      })
      .catch(addAxiosErrorNotification);

  addBalance = (params: TransactionParams) =>
    usersApi.addBalance(params)
      .then(res => {
        if (res) {
          successNotification('Success balance change');
          this.getUsers({
            page: this.page,
            size: this.size,
          });

          return res;
        }
      })
      .catch(addAxiosErrorNotification);

  changeRole = (params: IChangeRole) =>
    usersApi.changeRole(params)
      .then(res => {
        if (res) {
          successNotification('Success user change role');
          this.getUsers({
            page: this.page,
            size: this.size,
          });
          this.setSingleUser(res);

          return res;
        }
      })
      .catch(addAxiosErrorNotification);

  setUsers = (users: IUsers[]) => {
    this.users = users;
  };

  setUserOrder = (orders: IGetUserOrders[]) => {
    this.userOrders = orders;
  };

  setTotalUserOrders = (totalOrder: number) => {
    this.totalUserOrder = totalOrder;
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

  setOrderPage = (page: number) => {
    this.orderPage = page;
  };

  setOrderSize = (size: number) => {
    this.orderSize = size;
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

  setIsOpenChangeRoleModal = (isOpen: boolean) => {
    this.isOpenChangeRoleModal = isOpen;
  };

  setSearch = (search: string) => {
    this.search = search;
  };

  setIsOpenOrderProductModal = (isOpen: boolean) => {
    this.isOpenOrderProductModal = isOpen;
  };

  setFoods = (foods: IUserOrdersFoods[]) => {
    this.foods = foods;
  };

  reset() {
    this.users = [];
    this.totalUsers = 0;
    this.page = 1;
    this.size = 10;
    this.isOpenOrganisationModal = false;
    this.organisations = [];
    this.singleUser = null;
    this.isOpenBalanceModal = false;
  }
}

export const usersStore = new UsersStore();

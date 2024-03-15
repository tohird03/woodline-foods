import {makeAutoObservable} from 'mobx';
import {IPagination} from '../../api/types';
import {usersApi} from '../../api/users';
import {
  IChangeOrganisation,
  IChangeRole,
  IChangeStatus,
  IGetUserOrders,
  IOrganisation,
  IUserAnaliticData,
  IUserAnaliticParams,
  IUserAnaliticType,
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
  singleUserId: string | null = null;
  isOpenBalanceModal = false;
  isOpenChangeRoleModal = false;
  isOpenDeleteUserModal = false;
  search = '';
  totalUserOrder = 0;
  userOrders: IGetUserOrders[] = [];
  orderPage = 1;
  orderSize = 10;
  isOpenOrderProductModal = false;
  foods: IUserOrdersFoods[] = [];
  userAnalitic: IUserAnaliticData | null = null;
  userPaymentAnalitic: IUserAnaliticData | null = null;
  time: IUserAnaliticType = IUserAnaliticType.Day;
  start: string | null = null;
  end: string | null = null;
  org: string | null = null;
  startPay: string | null = null;
  endPay: string | null = null;
  orgPay: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  getUsers = (params: IUserParams) =>
    usersApi.getUsers(params)
      .then(res => {
        if (res) {
          this.setUsers(res?.userList);
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

  userStatusChange = (id: string, isActive: boolean) =>
    usersApi.changeUserStatus(id, isActive)
      .then((res) => {
        successNotification('Success status change');
        this.getUsers({
          page: this.page,
          size: this.size,
        });

        return res;
      })
      .catch(addAxiosErrorNotification);

  getOrganisation = () =>
    usersApi.getOrganisation()
      .then(res => {
        if (res) {
          this.setOrganisation(res?.orgList);
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

  // changeUserVerify = (id: string) =>
  //   usersApi.changeVerifyUser(id)
  //     .then(res => {
  //       successNotification('Success user verify');

  //       this.getUsers({
  //         page: this.page,
  //         size: this.size,
  //       });

  //       return res;
  //     })
  //     .catch(addAxiosErrorNotification);

  changeUserVerify = (id: string, isVerified: boolean) =>
    usersApi.changeVerifyUser(id, isVerified)
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

  getUserAnalitic = (params: IUserAnaliticParams) =>
    usersApi.getUserAnalitic(params)
      .then(res => {
        if (res) {
          this.setUserAnalitic(res);

          return res;
        }
      })
      .catch(addAxiosErrorNotification);

  getUserPaymentAnalitic = (params: IUserAnaliticParams) =>
    usersApi.getUserPaymentAnalitic(params)
      .then(res => {
        if (res) {
          this.setUserPaymentAnalitic(res);

          return res;
        }
      })
      .catch(addAxiosErrorNotification);

  setUsers = (users: IUsers[]) => {
    this.users = users;
  };

  setSingleUserId = (id: string | null) => {
    this.singleUserId = id;
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

  setIsOpenDeleteUserModal = (isOpen: boolean) => {
    this.isOpenDeleteUserModal = isOpen;
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

  setUserAnalitic = (userAnalitic: IUserAnaliticData) => {
    this.userAnalitic = userAnalitic;
  };

  setUserPaymentAnalitic = (userAnalitic: IUserAnaliticData) => {
    this.userPaymentAnalitic = userAnalitic;
  };

  setTime = (time: IUserAnaliticType) => {
    this.time = time;
  };

  setStart = (startDate: string | null) => {
    this.start = startDate;
  };

  setEnd = (endDate: string | null) => {
    this.end = endDate;
  };

  setOrg = (org: string | null) => {
    this.org = org;
  };

  setStartPay = (startDate: string | null) => {
    this.startPay = startDate;
  };

  setEndPay = (endDate: string | null) => {
    this.endPay = endDate;
  };

  setOrgPay = (org: string | null) => {
    this.orgPay = org;
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

import {makeAutoObservable} from 'mobx';
import dayjs from 'dayjs';
import {dashboardApi} from '../../api/dashboard';
import {
  AnalyticsType,
  EAnaliticType,
  FilterTime,
  IDailyProductsSum,
  IProductAnalitic,
  IProductAnaliticParams,
  IUsersAnalitic,
  IUsersAnaliticParams,
  IUsersDailyProductsSum,
} from '../../api/dashboard/types';
import {addAxiosErrorNotification} from '../../utils/notification';


class DashboardStore {
  org = 'all';
  productOrg: string | null = null;
  pageNumber = 1;
  pageSize = 10;
  startDate: string = dayjs().format('YYYY-MM-DD');
  endDate: string = dayjs().format('YYYY-MM-DD');
  type: AnalyticsType = AnalyticsType.Trade;
  time: FilterTime = FilterTime.DAY;
  dailyAnalitic: IDailyProductsSum | null = null;
  productAnalitic: IProductAnalitic[] = [];
  productAnaliticTab: EAnaliticType = EAnaliticType.Expense;

  usersDailyAnalitic: IUsersDailyProductsSum | null = null;
  usersStartDate: string = dayjs().format('YYYY-MM-DD');
  usersEndDate: string = dayjs().format('YYYY-MM-DD');
  usersType: AnalyticsType = AnalyticsType.Trade;
  usersAnaliticTab: EAnaliticType = EAnaliticType.Expense;
  usersAnalitic: IUsersAnalitic[] = [];
  totalUsersAnalitic = 0;
  usersAnaliticPageNumber = 1;
  usersAnaliticPageSize = 10;
  userOrg: string | null = null;
  userId: string | null = null;
  searchUser: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  getDailyAnalitic = () =>
    dashboardApi.getDailyStatistic()
      .then(res => {
        if (res) {
          this.setDailyAnalitic(res);
        }

        return res;
      })
      .catch(addAxiosErrorNotification);

  getUsersDailyAnalitic = () =>
    dashboardApi.getUsersDailyStatistic()
      .then(res => {
        if (res) {
          this.setUsersDailyAnalitic(res);
        }

        return res;
      })
      .catch(addAxiosErrorNotification);

  getProductAnalitic = (params: IProductAnaliticParams) =>
    dashboardApi.getAllAnaliticProducts(params)
      .then(res => {
        if (res) {
          this.setProductAnalitic(res);
        }

        return res;
      })
      .catch(addAxiosErrorNotification);

  getUsersAnalitic = (params: IUsersAnaliticParams) =>
    dashboardApi.getAllAnaliticUsers(params)
      .then(res => {
        if (res) {
          this.setUsersAnalitic(res?.orders);
          this.setTotalUsersAnalitic(res?.totalCount);
        }

        return res;
      })
      .catch(addAxiosErrorNotification);

  setProductOrg = (productOrg: string | null) => {
    this.productOrg = productOrg;
  };

  setPageNumber = (pageNumber: number) => {
    this.pageNumber = pageNumber;
  };

  setPageSize = (pageSize: number) => {
    this.pageSize = pageSize;
  };

  setStartDate = (startDate: string) => {
    this.startDate = startDate;
  };

  setEndDate = (endDate: string) => {
    this.endDate = endDate;
  };

  setUsersStartDate = (usersStartDate: string) => {
    this.usersStartDate = usersStartDate;
  };

  setUsersEndDate = (usersEndDate: string) => {
    this.usersEndDate = usersEndDate;
  };

  setUsersType = (usersType: AnalyticsType) => {
    this.usersType = usersType;
  };

  setDailyAnalitic = (analitic: IDailyProductsSum | null) => {
    this.dailyAnalitic = analitic;
  };

  setUsersDailyAnalitic = (analitic: IUsersDailyProductsSum | null) => {
    this.usersDailyAnalitic = analitic;
  };

  setProductAnalitic = (productAnalitic: IProductAnalitic[]) => {
    this.productAnalitic = productAnalitic;
  };

  setUsersAnalitic = (usersAnalitic: IUsersAnalitic[]) => {
    this.usersAnalitic = usersAnalitic;
  };

  setOrg = (org: string) => {
    this.org = org;
  };

  setType = (type: AnalyticsType) => {
    this.type = type;
  };

  setTime = (time: FilterTime) => {
    this.time = time;
  };

  setProductAnaliticTab = (productAnaliticTab: EAnaliticType) => {
    this.productAnaliticTab = productAnaliticTab;
  };

  setUsersAnaliticTab = (usersAnaliticTab: EAnaliticType) => {
    this.usersAnaliticTab = usersAnaliticTab;
  };

  setTotalUsersAnalitic = (totalUsersAnalitic: number) => {
    this.totalUsersAnalitic = totalUsersAnalitic;
  };

  setUsersAnaliticPageNumber = (usersAnaliticPageNumber: number) => {
    this.usersAnaliticPageNumber = usersAnaliticPageNumber;
  };

  setUsersAnaliticPageSize = (usersAnaliticPageSize: number) => {
    this.usersAnaliticPageSize = usersAnaliticPageSize;
  };

  setUserOrg = (userOrg: string | null) => {
    this.userOrg = userOrg;
  };

  setUserId = (userId: string | null) => {
    this.userId = userId;
  };

  setSearchUser = (searchUser: string | null) => {
    this.searchUser = searchUser;
  };

  reset() {
    this.org = 'all';
    this.type = AnalyticsType.Trade;
    this.time = FilterTime.DAY;
  }
}

export const dashboardStore = new DashboardStore();

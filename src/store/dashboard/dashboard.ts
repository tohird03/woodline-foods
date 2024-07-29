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

  getProductAnalitic = (params: IProductAnaliticParams) =>
    dashboardApi.getAllAnaliticProducts(params)
      .then(res => {
        if (res) {
          this.setProductAnalitic(res);
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

  setDailyAnalitic = (analitic: IDailyProductsSum | null) => {
    this.dailyAnalitic = analitic;
  };

  setProductAnalitic = (productAnalitic: IProductAnalitic[]) => {
    this.productAnalitic = productAnalitic;
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

  reset() {
    this.org = 'all';
    this.type = AnalyticsType.Trade;
    this.time = FilterTime.DAY;
  }
}

export const dashboardStore = new DashboardStore();

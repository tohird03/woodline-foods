import {makeAutoObservable} from 'mobx';
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

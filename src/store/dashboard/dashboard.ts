import {makeAutoObservable} from 'mobx';
import {AnalyticsType, FilterTime} from '../../api/dashboard/types';

class DashboardStore {
  org = 'all';
  type: AnalyticsType = AnalyticsType.Trade;
  time: FilterTime = FilterTime.DAY;

  constructor() {
    makeAutoObservable(this);
  }

  setOrg = (org: string) => {
    this.org = org;
  };

  setType = (type: AnalyticsType) => {
    this.type = type;
  };

  setTime = (time: FilterTime) => {
    this.time = time;
  };

  reset() {
    this.org = 'all';
    this.type = AnalyticsType.Trade;
    this.time = FilterTime.DAY;
  }
}

export const dashboardStore = new DashboardStore();

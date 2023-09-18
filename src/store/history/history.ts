import {makeAutoObservable} from 'mobx';
import {historyApi} from '../../api/history/history';
import {IHistory} from '../../api/history/types';
import {IPagination} from '../../api/types';
import {addAxiosErrorNotification} from '../../utils/notification';

class HistoryStore {
  history: IHistory[] = [];
  page = 1;
  size = 10;
  totalHistory = 0;

  constructor() {
    makeAutoObservable(this);
  }

  getHostory = (params: IPagination) =>
    historyApi.getHistory(params)
      .then(res => {
        if (res?.data) {
          this.setHistory(res?.data);
          this.setTotalHistory(res?.totalTrips);
        }
      })
      .catch(addAxiosErrorNotification);

  setHistory = (history: IHistory[]) => {
    this.history = history;
  };

  setPage = (page: number) => {
    this.page = page;
  };

  setSize = (size: number) => {
    this.size = size;
  };

  setTotalHistory = (totalHistory: number) => {
    this.totalHistory = totalHistory;
  };

  reset() {
    this.history = [];
  }
}

export const historyStore = new HistoryStore();

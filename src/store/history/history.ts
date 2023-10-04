import {makeAutoObservable} from 'mobx';
import {historyApi} from '../../api/history/history';
import {IHistory, IHistoryUsers} from '../../api/history/types';
import {IPagination} from '../../api/types';
import {addAxiosErrorNotification} from '../../utils/notification';

class HistoryStore {
  history: IHistory[] = [];
  page = 1;
  size = 10;
  totalHistory = 0;
  isOpenUsersModal = false;
  users: IHistoryUsers[] = [];

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

  setIsOpenUsersModal = (isOpen: boolean) => {
    this.isOpenUsersModal = isOpen;
  };

  setUsers = (users: IHistoryUsers[]) => {
    this.users = users;
  };

  reset() {
    this.history = [];
  }
}

export const historyStore = new HistoryStore();

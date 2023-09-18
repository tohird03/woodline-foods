import {makeAutoObservable} from 'mobx';

class HistoryStore {
  history = [];
  page = 1;
  size = 10;
  totalHistory = 0;

  constructor() {
    makeAutoObservable(this);
  }

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

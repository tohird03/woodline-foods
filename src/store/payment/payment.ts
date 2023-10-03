import {makeAutoObservable} from 'mobx';

class PaymentsStore {
  payments = [];
  page = 1;
  size = 10;
  totalPayments = 0;

  constructor() {
    makeAutoObservable(this);
  }

  setPage = (page: number) => {
    this.page = page;
  };

  setSize = (size: number) => {
    this.size = size;
  };

  reset() {
    this.payments = [];
  }
}

export const paymentStore = new PaymentsStore();

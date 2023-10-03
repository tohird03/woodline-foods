import {makeAutoObservable} from 'mobx';
import {paymentApi} from '../../api/payment';
import {IPayments} from '../../api/payment/types';
import {addAxiosErrorNotification} from '../../utils/notification';

class PaymentsStore {
  payments: IPayments[] = [];
  page = 1;
  size = 10;
  totalPayments = 0;

  constructor() {
    makeAutoObservable(this);
  }

  getPayments = () =>
    paymentApi.getPayments({
      page: this.page,
      size: this.size,
    })
      .then(res => {
        if (res) {
          this.setPayments(res?.data);
          this.setTotalPayments(res?.totalPayments);
        }
      })
      .catch(addAxiosErrorNotification);

  setPayments = (payments: IPayments[]) => {
    this.payments = payments;
  };

  setTotalPayments = (totalPayments: number) => {
    this.totalPayments = totalPayments;
  };

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

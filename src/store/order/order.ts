import {makeAutoObservable} from 'mobx';
import {orderApi} from '../../api/order';
import {IOrder} from '../../api/order/types';
import {IPagination} from '../../api/types';
import {addAxiosErrorNotification} from '../../utils/notification';

class OrderStore {
  orders: IOrder[] = [];
  totalOrder = 0;
  page = 1;
  size = 10;

  constructor() {
    makeAutoObservable(this);
  }

  getOrder = (params: IPagination) =>
    orderApi.getOrder(params)
      .then(res => {
        if (res?.data) {
          this.setOrders(res?.data);
          this.setTotalOrder(res?.totalorders);
        }
      })
      .catch(addAxiosErrorNotification);

  setOrders = (orders: IOrder[]) => {
    this.orders = orders;
  };

  setPage = (page: number) => {
    this.page = page;
  };

  setSize = (size: number) => {
    this.size = size;
  };

  setTotalOrder = (total: number) => {
    this.totalOrder = total;
  };

  reset() {
    this.orders = [];
  }
}

export const orderStore = new OrderStore();

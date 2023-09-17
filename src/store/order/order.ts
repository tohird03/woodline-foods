import {makeAutoObservable} from 'mobx';
import {orderApi} from '../../api/order';
import {IOrder, IOrderFoods} from '../../api/order/types';
import {IPagination} from '../../api/types';
import {addAxiosErrorNotification} from '../../utils/notification';

class OrderStore {
  orders: IOrder[] = [];
  totalOrder = 0;
  page = 1;
  size = 10;
  isOpenOrderProductModal = false;
  foods: IOrderFoods[] = [];

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

  setIsOpenOrderProductModal = (isOpen: boolean) => {
    this.isOpenOrderProductModal = isOpen;
  };

  setFoods = (foods: IOrderFoods[]) => {
    this.foods = foods;
  };

  reset() {
    this.orders = [];
    this.totalOrder = 0;
    this.page = 1;
    this.size = 10;
    this.isOpenOrderProductModal = false;
    this.foods = [];
  }
}

export const orderStore = new OrderStore();

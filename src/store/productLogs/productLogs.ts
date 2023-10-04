import {makeAutoObservable} from 'mobx';
import {productLogsApi} from '../../api/productLogs';
import {IGetProductLogs} from '../../api/productLogs/types';
import {addAxiosErrorNotification} from '../../utils/notification';

class ProductLogsStore {
  productLogs: IGetProductLogs[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  getProducts = () =>
    productLogsApi.getProductLogs()
      .then(res => {
        if (res) {
          this.setProductsLogs(res);
        }
      })
      .catch(addAxiosErrorNotification);

  setProductsLogs = (products: IGetProductLogs[]) => {
    this.productLogs = products;
  };

  reset() {
    this.productLogs = [];
  }
}

export const productLogsStore = new ProductLogsStore();

import {makeAutoObservable} from 'mobx';
import {productLogsApi} from '../../api/productLogs';
import {IGetProductLogs} from '../../api/productLogs/types';
import {IPagination} from '../../api/types';
import {addAxiosErrorNotification} from '../../utils/notification';

class ProductLogsStore {
  productLogs: IGetProductLogs[] = [];
  totalProduct = 0;
  page = 1;
  limit = 10;

  constructor() {
    makeAutoObservable(this);
  }

  getProducts = (params: IPagination) =>
    productLogsApi.getProductLogs(params)
      .then(res => {
        if (res) {
          this.setProductsLogs(res?.data);
          this.setTotal(res?.totalProductLog);
        }
      })
      .catch(addAxiosErrorNotification);

  setProductsLogs = (products: IGetProductLogs[]) => {
    this.productLogs = products;
  };

  setTotal = (total: number) => {
    this.totalProduct = total;
  };

  setPage = (page: number) => {
    this.page = page;
  };

  setLimit = (limit: number) => {
    this.limit = limit;
  };

  reset() {
    this.productLogs = [];
  }
}

export const productLogsStore = new ProductLogsStore();

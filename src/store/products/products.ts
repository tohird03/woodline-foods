import {makeAutoObservable} from 'mobx';
import {productApi} from '../../api/products';
import {IProducts} from '../../api/products/types';
import {addAxiosErrorNotification} from '../../utils/notification';

class ProductsStore {
  products: IProducts[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  getProducts = () =>
    productApi.getProducts()
      .then(res => {
        if (res) {
          this.setProducts(res);
        }
      })
      .catch(addAxiosErrorNotification);

  setProducts = (products: IProducts[]) => {
    this.products = products;
  };

  reset() {
    this.products = [];
  }
}

export const productStore = new ProductsStore();

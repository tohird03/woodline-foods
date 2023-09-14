import {makeAutoObservable} from 'mobx';
import {IOrganisation} from '../../api/organisation/types';
import {productApi} from '../../api/products';
import {IAddNewProduct, IProducts} from '../../api/products/types';
import {IPagination} from '../../api/types';
import {addAxiosErrorNotification, successNotification} from '../../utils/notification';

class ProductsStore {
  products: IProducts[] = [];
  totalProducts = 0;
  organisations: IOrganisation[] = [];
  isOpenProductModal = false;
  page = 1;
  size = 10;

  constructor() {
    makeAutoObservable(this);
  }

  getProducts = (params: IPagination) =>
    productApi.getProducts(params)
      .then(res => {
        if (res) {
          this.setProducts(res?.data);
          this.setTotalProducts(res?.totalProducts);
        }
      })
      .catch(addAxiosErrorNotification);

  getOrganisation = () =>
    productApi.getOrganisation()
      .then(res => {
        if (res) {
          this.setOrganisation(res?.data);
        }

        return res;
      })
      .catch(addAxiosErrorNotification);

  addProducts = (params: IAddNewProduct) =>
    productApi.addNewProduct(params)
      .then(res => {
        if (res) {
          successNotification('Success add new product');
        }

        return res;
      })
      .catch(addAxiosErrorNotification);

  setProducts = (products: IProducts[]) => {
    this.products = products;
  };

  setIsOpenProductModal = (isOpen: boolean) => {
    this.isOpenProductModal = isOpen;
  };

  setOrganisation = (organisation: IOrganisation[]) => {
    this.organisations = organisation;
  };

  setTotalProducts = (total: number) => {
    this.totalProducts = total;
  };

  setPage = (page: number) => {
    this.page = page;
  };

  setSize = (size: number) => {
    this.size = size;
  };

  reset() {
    this.products = [];
    this.totalProducts = 0;
    this.organisations = [];
    this.isOpenProductModal = false;
    this.page = 1;
    this.size = 10;
  }
}

export const productStore = new ProductsStore();

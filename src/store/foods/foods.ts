import {makeAutoObservable} from 'mobx';
import {foodsApi} from '../../api/foods';
import {IFoods, IOrganisation, IProducts} from '../../api/foods/types';
import {IPagination} from '../../api/types';
import {addAxiosErrorNotification} from '../../utils/notification';

class FoodsStore {
  foods: IFoods[] = [];
  totalFoods = 0;
  page = 1;
  size = 10;
  organisations: IOrganisation[] = [];
  products: IProducts[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  getFoods = (params: IPagination) =>
    foodsApi.getFoods(params)
      .then(res => {
        if (res) {
          this.setFoods(res?.data);
          this.setTotalFoods(res?.totalFoods);
        }
      })
      .catch(addAxiosErrorNotification);

  getOrganisation = () =>
    foodsApi.getOrganisation()
      .then(res => {
        if (res) {
          this.setOrganisation(res?.data);
        }

        return res;
      })
      .catch(addAxiosErrorNotification);

  getProducts = () =>
    foodsApi.getProducts()
      .then(res => {
        if (res) {
          this.setProducts(res?.data);
        }

        return res;
      })
      .catch(addAxiosErrorNotification);

  setFoods = (foods: IFoods[]) => {
    this.foods = foods;
  };

  setTotalFoods = (total: number) => {
    this.totalFoods = total;
  };

  setOrganisation = (organisation: IOrganisation[]) => {
    this.organisations = organisation;
  };

  setProducts = (products: IProducts[]) => {
    this.products = products;
  };

  setPage = (page: number) => {
    this.page = page;
  };

  setSize = (size: number) => {
    this.size = size;
  };

  reset() {
    this.foods = [];
    this.totalFoods = 0;
    this.page = 1;
    this.size = 10;
    this.organisations = [];
    this.products = [];
  }
}

export const foodsStore = new FoodsStore();

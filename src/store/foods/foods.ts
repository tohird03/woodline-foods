import {makeAutoObservable} from 'mobx';
import {foodsApi} from '../../api/foods';
import {
  IChangeVerify,
  IFoods,
  IFoodsProducts,
  IGetFoodsParams,
  IImgChange,
  IOrganisation,
  IProducts,
} from '../../api/foods/types';
import {addAxiosErrorNotification, successNotification} from '../../utils/notification';

class FoodsStore {
  foods: IFoods[] = [];
  totalFoods = 0;
  page = 1;
  size = 10;
  organisations: IOrganisation[] = [];
  products: IProducts[] = [];
  singleFoodProduct: IFoodsProducts[] = [];
  isOpenSingleFoodProductModal = false;
  isOpenImgUpload = false;
  foodId: string | null = null;
  search: string | null = null;
  singleFood: IFoods | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  getFoods = (params: IGetFoodsParams) =>
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

  imgChangeFood = (params: IImgChange) =>
    foodsApi.imgChangeFood(params)
      .then(res => {
        if (res) {
          this.getFoods({
            page: this.page,
            size: this.size,
          });
          this.setIsOpenImgUpload(false);
        }

        return res;
      })
      .catch(addAxiosErrorNotification);

  changeVerify = (params: IChangeVerify) =>
    foodsApi.changeVerify(params)
      .then(res => {
        if (res) {
          successNotification('Success change is active');
          this.getFoods({
            page: this.page,
            size: this.size,
          });
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

  setSingleFoodProducts = (singleProducts: IFoodsProducts[]) => {
    this.singleFoodProduct = singleProducts;
  };

  setIsOpenFoodProductModal = (isOpen: boolean) => {
    this.isOpenSingleFoodProductModal = isOpen;
  };

  setIsOpenImgUpload = (isOpen: boolean) => {
    this.isOpenImgUpload = isOpen;
  };

  setFoodId = (id: string | null) => {
    this.foodId = id;
  };

  setSearch = (search: string) => {
    this.search = search;
  };

  setSingleFood = (singleFood: IFoods) => {
    this.singleFood = singleFood;
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

import {makeAutoObservable} from 'mobx';
import {foodsApi} from '../../api/foods';
import {
  IAddOneFoodProduct,
  IChangeVerify,
  IFoods,
  IFoodsProducts,
  IGetFoodsParams,
  IGetOneFoodProduct,
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
  getOneFoodProduct: IGetOneFoodProduct[] = [];
  isOneFoodProductAddModal= false;
  isOneFoodProductEditModal = false;
  isSingleFoodProduct: IGetOneFoodProduct | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  getFoods = (params: IGetFoodsParams) =>
    foodsApi.getFoods(params)
      .then(res => {
        if (res) {
          this.setFoods(res?.foodList);
          this.setTotalFoods(res?.count);
        }
      })
      .catch(addAxiosErrorNotification);

  getOneFood = (id: string) =>
    foodsApi.getFoodOne(id)
      .then((res) => {
        if (res) {
          this.setOneFoodProduct(res.products);
        }

        return res;
      })
      .catch(addAxiosErrorNotification);

  getOrganisation = () =>
    foodsApi.getOrganisation()
      .then(res => {
        if (res) {
          this.setOrganisation(res?.orgList);
        }

        return res;
      })
      .catch(addAxiosErrorNotification);

  getProducts = (orgId: string) =>
    foodsApi.getProducts(orgId)
      .then(res => {
        if (res) {
          this.setProducts(res?.productList);
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

  // getProductsByOrganisation = (organisationId: string) =>
  //   this.products.filter(product => product?.org?._id === organisationId);

  setIsOneFoodProductEditModal = (isOpen: boolean) => {
    this.isOneFoodProductEditModal = isOpen;
  };

  setIsSingleFoodProduct = (singleProduct: IGetOneFoodProduct | null) => {
    this.isSingleFoodProduct = singleProduct;
  };

  setIsOneFoodProductAddModal = (isOpen: boolean) => {
    this.isOneFoodProductAddModal = isOpen;
  };

  setOneFoodProduct = (oneFoodProduct: IGetOneFoodProduct[]) => {
    this.getOneFoodProduct = oneFoodProduct;
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

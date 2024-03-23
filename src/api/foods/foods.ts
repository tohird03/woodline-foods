import {Endpoints} from '../endpoints';
import {Instance} from '../instance';
import {INetworkConfig} from '../types';
import {
  IAddFoodParams,
  IAddOneFoodProduct,
  IChangeVerify,
  IFoods,
  IGetFoods,
  IGetFoodsParams,
  IGetOneFood,
  IGetOrganisation,
  IGetProducts,
  IImgChange,
} from './types';

const config: INetworkConfig = {
  baseURL: Endpoints.Base,
};

class FoodsApi extends Instance {
  constructor(config: INetworkConfig) {
    super(config);
  }

  getFoods = (params: IGetFoodsParams): Promise<IGetFoods> =>
    this.get(Endpoints.Foods, {params});

  getFoodOne = (id: string): Promise<IGetOneFood> =>
    this.get(`${Endpoints.Foods}/${id}`);

  getOrganisation = (): Promise<IGetOrganisation> =>
    this.get(Endpoints.Organisation, {
      params: {
        page: 1,
        size: 1000,
      },
    });

  getProducts = (orgId: string): Promise<IGetProducts> =>
    this.get(Endpoints.Products, {
      params: {
        page: 1,
        size: 1000,
        org: orgId,
      },
    });

  addFoods = (params: any): Promise<IAddFoodParams> =>
    this.post(Endpoints.Foods, params);

  addOneFoodProduct = (params: IAddOneFoodProduct): Promise<IAddOneFoodProduct> =>
    this.post(`/food/products/${params.id}`, {
      id: params.id,
      product: params.product,
      amount: params.amount,
    });

  deleteFoodProduct = (id: string, product: string): Promise<IAddOneFoodProduct> =>
    this.delete(`food/products/${id}/${product}`);

  updateFoodProduct = (params: IAddOneFoodProduct): Promise<IAddOneFoodProduct> =>
    this.patch(`food/products/${params.id}`, {
      product: params.product,
      amount: params.amount,
    });

  imgChangeFood = (params: IImgChange): Promise<IFoods> =>
    this.patch(Endpoints.Foods, params);

  changeVerify = (params: IChangeVerify): Promise<IFoods> =>
    this.patch(`${Endpoints.Foods}/${params?.id}`, params);

  changeFoods = (params: any): Promise<IFoods> =>
    this.patch(`${Endpoints.FoodUpdate}/${params?.id}`, params);

  // deleteLunchBase= (id: string): Promise<ILunchsProduct> =>
  // this.delete(`${Endpoints.Lunchs}/${id}`);

  deleteFood = (id: string): Promise<IFoods> =>
    this.delete(`food/${id}`);

}

export const foodsApi = new FoodsApi(config);

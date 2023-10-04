import {Endpoints} from '../endpoints';
import {Instance} from '../instance';
import {INetworkConfig} from '../types';
import {IAddFoodParams, IFoods, IGetFoods, IGetFoodsParams, IGetOrganisation, IGetProducts, IImgChange} from './types';

const config: INetworkConfig = {
  baseURL: Endpoints.Base,
};

class FoodsApi extends Instance {
  constructor(config: INetworkConfig) {
    super(config);
  }

  getFoods = (params: IGetFoodsParams): Promise<IGetFoods> =>
    this.get(Endpoints.Foods, {params});

  getOrganisation = (): Promise<IGetOrganisation> =>
    this.get(Endpoints.Organisation, {
      params: {
        page: 1,
        size: 1000,
      },
    });

  getProducts = (): Promise<IGetProducts> =>
    this.get(Endpoints.Products, {
      params: {
        page: 1,
        size: 1000,
      },
    });

  addFoods = (params: any): Promise<IAddFoodParams> =>
    this.post(Endpoints.Foods, params);

  imgChangeFood = (params: IImgChange): Promise<IFoods> =>
    this.patch(Endpoints.Foods, params);
}

export const foodsApi = new FoodsApi(config);

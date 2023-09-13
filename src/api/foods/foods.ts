import {Endpoints} from '../endpoints';
import {Instance} from '../instance';
import {INetworkConfig, IPagination} from '../types';
import {IAddFoodParams, IGetFoods, IGetOrganisation, IGetProducts} from './types';

const config: INetworkConfig = {
  baseURL: Endpoints.Base,
};

class FoodsApi extends Instance {
  constructor(config: INetworkConfig) {
    super(config);
  }

  getFoods = (params: IPagination): Promise<IGetFoods> =>
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
}

export const foodsApi = new FoodsApi(config);

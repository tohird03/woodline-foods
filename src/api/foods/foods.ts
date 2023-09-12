import {Endpoints} from '../endpoints';
import {Instance} from '../instance';
import {INetworkConfig, IPagination} from '../types';
import {IFoods} from './types';

const config: INetworkConfig = {
  baseURL: Endpoints.Base,
};

class FoodsApi extends Instance {
  constructor(config: INetworkConfig) {
    super(config);
  }

  getFoods = (params: IPagination): Promise<IFoods[]> =>
    this.get(Endpoints.Foods, {params});
}

export const foodsApi = new FoodsApi(config);

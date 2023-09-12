import {Endpoints} from '../endpoints';
import {Instance} from '../instance';
import {INetworkConfig} from '../types';
import {IProducts} from './types';

const config: INetworkConfig = {
  baseURL: '',
};

class ProductApi extends Instance {
  constructor(config: INetworkConfig) {
    super(config);
  }

  getProducts = (): Promise<IProducts[]> =>
    this.get(Endpoints.Products);
}

export const productApi = new ProductApi(config);

import {Instance} from '../instance';
import {INetworkConfig} from '../types';

const config: INetworkConfig = {
  baseURL: '',
};

class ProductApi extends Instance {
  constructor(config: INetworkConfig) {
    super(config);
  }
}

export const productApi = new ProductApi(config);

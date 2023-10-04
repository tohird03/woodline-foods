import {Endpoints} from '../endpoints';
import {Instance} from '../instance';
import {INetworkConfig} from '../types';
import {IGetProductLogs} from './types';

const config: INetworkConfig = {
  baseURL: Endpoints.Base,
};

class ProductLogsApi extends Instance {
  constructor(config: INetworkConfig) {
    super(config);
  }

  getProductLogs = (): Promise<IGetProductLogs[]> =>
    this.get(Endpoints.ProductLogs);
}

export const productLogsApi = new ProductLogsApi(config);

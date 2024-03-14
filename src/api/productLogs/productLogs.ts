import {Endpoints} from '../endpoints';
import {Instance} from '../instance';
import {INetworkConfig, IPagination} from '../types';
import {IProductLogs} from './types';

const config: INetworkConfig = {
  baseURL: Endpoints.Base,
};

class ProductLogsApi extends Instance {
  constructor(config: INetworkConfig) {
    super(config);
  }

  getProductLogs = (params: IPagination): Promise<IProductLogs> =>
    this.get(Endpoints.ProductLogs, {params});
}

export const productLogsApi = new ProductLogsApi(config);

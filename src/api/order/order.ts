import {Endpoints} from '../endpoints';
import {Instance} from '../instance';
import {INetworkConfig, IPagination} from '../types';
import {IGetOrder} from './types';

const config: INetworkConfig = {
  baseURL: Endpoints.Base,
};

class OrderApi extends Instance {
  constructor(config: INetworkConfig) {
    super(config);
  }

  getOrder = (params: IPagination): Promise<IGetOrder> =>
    this.get(Endpoints.Order, {params});
}

export const orderApi = new OrderApi(config);

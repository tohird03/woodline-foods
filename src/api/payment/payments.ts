import {Endpoints} from '../endpoints';
import {Instance} from '../instance';
import {INetworkConfig, IPagination} from '../types';
import {IGetPayments} from './types';

const config: INetworkConfig = {
  baseURL: Endpoints.Base,
};

class PaymentApi extends Instance {
  constructor(config: INetworkConfig) {
    super(config);
  }

  getPayments = (params: IPagination): Promise<IGetPayments> =>
    this.get(Endpoints.Payment, {params});
}

export const paymentApi = new PaymentApi(config);

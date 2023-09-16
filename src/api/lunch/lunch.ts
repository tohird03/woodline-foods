import {Endpoints} from '../endpoints';
import {Instance} from '../instance';
import {INetworkConfig, IPagination} from '../types';
import {IAddLunch, IGetLunchs, ILunchs} from './types';

const config: INetworkConfig = {
  baseURL: Endpoints.Base,
};

class LunchApi extends Instance {
  constructor(config: INetworkConfig) {
    super(config);
  }

  getLunchs = (params: IPagination): Promise<IGetLunchs> =>
    this.get(Endpoints.Lunch, {params});

  addLunch = (params: IAddLunch): Promise<ILunchs> =>
    this.post(Endpoints.Lunch, params);
}

export const lunchApi = new LunchApi(config);

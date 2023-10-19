import {Endpoints} from '../endpoints';
import {Instance} from '../instance';
import {INetworkConfig, IPagination} from '../types';
import {IAddLunch, IAddLunchBaseParams, IAddLunchProducts, IGetLunchBase, IGetLunchs, ILunchs} from './types';

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

  getLunchBase = (id: string): Promise<IGetLunchBase[]> =>
    this.get(`${Endpoints.Lunchs}/${id}`);

  addLunchBase = (params: IAddLunchBaseParams) =>
    this.post(`${Endpoints.Lunchs}/${params?.id}`, params);

  addLunchProducts = (params: IAddLunchProducts): Promise<ILunchs> =>
    this.patch(`${Endpoints.AddLunchProduct}/${params?.id}`, params);
}

export const lunchApi = new LunchApi(config);

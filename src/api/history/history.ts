import {Endpoints} from '../endpoints';
import {Instance} from '../instance';
import {INetworkConfig, IPagination} from '../types';
import {IGetHistory} from './types';

const config: INetworkConfig = {
  baseURL: Endpoints.Base,
};

class HistoryApi extends Instance {
  constructor(config: INetworkConfig) {
    super(config);
  }

  getHistory = (params: IPagination): Promise<IGetHistory> =>
    this.get(Endpoints.History, {params});
}

export const historyApi = new HistoryApi(config);

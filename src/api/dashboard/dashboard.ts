import {Endpoints} from '../endpoints';
import {Instance} from '../instance';
import {INetworkConfig} from '../types';
import {IDailyProductsSum, IProductAnalitic, IProductAnaliticParams} from './types';

const config: INetworkConfig = {
  baseURL: Endpoints.Base,
};

class DashboadApi extends Instance {
  constructor(config: INetworkConfig) {
    super(config);
  }

  getDailyStatistic = (): Promise<IDailyProductsSum> =>
    this.get(Endpoints.DailyAnalitic);

  getAllAnaliticProducts = (params: IProductAnaliticParams): Promise<IProductAnalitic[]> =>
    this.get(Endpoints.AnaliticProducts, {params});

  getAllAnaliticProductsExel = (params: IProductAnaliticParams): Promise<any> =>
    this.getExel(Endpoints.AnaliticProductsExel, {params});
}

export const dashboardApi = new DashboadApi(config);

import {Endpoints} from '../endpoints';
import {Instance} from '../instance';
import {INetworkConfig} from '../types';
import {
  IDailyProductsSum,
  IProductAnalitic,
  IProductAnaliticParams,
  IUsersAnaliticData,
  IUsersAnaliticParams,
  IUsersDailyProductsSum,
} from './types';

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

  getAllAnaliticUsers = (params: IUsersAnaliticParams): Promise<IUsersAnaliticData> =>
    this.get(Endpoints.AnaliticUsers, {params});


  getUsersDailyStatistic = (): Promise<IUsersDailyProductsSum> =>
    this.get(Endpoints.UsersDailyAnalitic);

  getAllAnaliticUsersExel = (params: IUsersAnaliticParams): Promise<any> =>
    this.getExel(Endpoints.AnaliticUsersExel, {params});
}

export const dashboardApi = new DashboadApi(config);

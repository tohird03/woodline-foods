import {Endpoints} from '../endpoints';
import {Instance} from '../instance';
import {INetworkConfig, IPagination} from '../types';
import {IAddNewProduct, IGetOrganisation, IGetProducts, IProducts} from './types';

const config: INetworkConfig = {
  baseURL: '',
};

class ProductApi extends Instance {
  constructor(config: INetworkConfig) {
    super(config);
  }

  getProducts = (params: IPagination): Promise<IGetProducts> =>
    this.get(Endpoints.Products, {params});

  getOrganisation = (): Promise<IGetOrganisation> =>
    this.get(Endpoints.Organisation, {
      params: {
        page: 1,
        size: 1000,
      },
    });

  addNewProduct = (params: IAddNewProduct): Promise<IProducts> =>
    this.post(Endpoints.Products, params);
}

export const productApi = new ProductApi(config);

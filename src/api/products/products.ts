import {Endpoints} from '../endpoints';
import {Instance} from '../instance';
import {INetworkConfig} from '../types';
import {
  IAddAmountProduct,
  IAddNewProduct,
  IGetOrganisation,
  IGetProducts,
  IGetProductsParams,
  IProducts,
} from './types';

const config: INetworkConfig = {
  baseURL: '',
};

class ProductApi extends Instance {
  constructor(config: INetworkConfig) {
    super(config);
  }

  getProducts = (params: IGetProductsParams): Promise<IGetProducts> =>
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

  productAmountChange = (params: IAddAmountProduct): Promise<IProducts> =>
    this.patch(Endpoints.ProductAmount, params);
}

export const productApi = new ProductApi(config);

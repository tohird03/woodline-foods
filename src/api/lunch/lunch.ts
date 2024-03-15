import {Endpoints} from '../endpoints';
import {Instance} from '../instance';
import {INetworkConfig, IPagination} from '../types';
import {
  IAddLunch,
  IAddLunchBaseParams,
  IAddLunchProducts,
  IDeletLunchProducts,
  IEditedLunchProducts,
  IGetLunchBase,
  IGetLunchList,
  IGetLunchs,
  IGetOneLunch,
  ILunchs,
  ILunchUpdate,
} from './types';

const config: INetworkConfig = {
  baseURL: Endpoints.Base,
};

class LunchApi extends Instance {
  constructor(config: INetworkConfig) {
    super(config);
  }

  getLunchs = (params: IPagination): Promise<IGetLunchs> =>
    this.get(Endpoints.Lunch, {params});

  getOneLunch = (id: string): Promise<IGetOneLunch> =>
    this.get(`lunch/${id}`);

  addLunch = (params: IAddLunch): Promise<ILunchs> =>
    this.post(Endpoints.Lunch, params);

  getLunchBase = (): Promise<IGetLunchList> =>
    this.get(`${Endpoints.Lunchs}`);

  addLunchBase = (params: IAddLunchBaseParams) =>
    this.post(`${Endpoints.Lunchs}`, {
      name: params?.name,
      cost: params?.cost,
      lunchbase: params?.lunchbase,
      org: '65f18126ee40d8f2e55dea59',
      // id: params?.id,
      // percent_cook: params?.percent_cook,
      products: params?.products,
    });

  addLunchProducts = (params: IAddLunchProducts): Promise<ILunchs> =>
    this.post(`${Endpoints.AddLunchProduct}/${params?.id}`, {
      products: params?.products,
    });

  getSingleLunch = (id: string): Promise<ILunchs> =>
    this.get(`${Endpoints.GetLunchProducts}/${id}`);

  editedProduct = (params: IEditedLunchProducts): Promise<ILunchs> =>
    this.patch(`${Endpoints.AddLunchProduct}/${params?.lunchId}`, {products: params?.products});

  updatedLunchProduct = (params: ILunchUpdate): Promise<ILunchs> =>
    this.patch(`lunch/${params.id}`, {
      name: params?.name,
      // products: params?.products,
      // cost: params?.cost,
      // percent_cook: params?.percent_cook,
    });

  deleteProduct = (params: IDeletLunchProducts): Promise<ILunchs> =>
    this.delete(`/lunch/${params?.lunchId}/products/${params?.productId}`);
}

export const lunchApi = new LunchApi(config);

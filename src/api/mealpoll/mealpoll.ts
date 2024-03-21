import {Endpoints} from '../endpoints';
import {Instance} from '../instance';
import {INetworkConfig, IPagination} from '../types';
import {IGetMealPoll} from './types';

const config: INetworkConfig = {
  baseURL: Endpoints.Base,
};

class MealPollApi extends Instance {
  constructor(config: INetworkConfig) {
    super(config);
  }


  getMealPoll = (params: IPagination): Promise<IGetMealPoll> =>
    this.get(Endpoints.MealPoll, {params});

  // getLunchs = (params: IPagination): Promise<IGetLunchs> =>
  //   this.get(Endpoints.Lunch, {params});

  // getOneLunch = (id: string): Promise<IGetOneLunch> =>
  //   this.get(`lunch/${id}`);

  // addLunch = (params: IAddLunch): Promise<ILunchs> =>
  //   this.post(Endpoints.Lunch, params);

  // editLunch = (params: ILunchEdit): Promise<ILunchs> =>
  //   this.patch(`${Endpoints.Lunch}/${params.id}`, params);

  // getLunchBase = (params: IGetLunchBaseListParams): Promise<IGetLunchList> =>
  //   this.get(`${Endpoints.Lunchs}`, {params});


  // changeVerify = (params: IChangeVerify): Promise<IGetLunchBase> =>
  //   this.patch(`${Endpoints.Lunchs}/${params?._id}`, params);

  // changeVerifyBase = (params: IChangeVerify): Promise<ILunchs> =>
  //   this.patch(`lunch-base/${params?.id}`, params);


  // deleteLunchBase = (id: string): Promise<ILunchsProduct> =>
  //   this.delete(`${Endpoints.Lunchs}/${id}`);

  // deleteLunch = (id: string): Promise<ILunchs> =>
  //   this.delete(`lunch-base/${id}`);

  // addLunchBase = (params: IAddLunchBaseParams) =>
  //   this.post(`${Endpoints.Lunchs}`, {
  //     name: params?.name,
  //     cost: params?.cost,
  //     lunchbase: params?.lunchbase,
  //     org: params?.org,
  //     // id: params?.id,
  //     // percent_cook: params?.percent_cook,
  //     products: params?.products,
  //   });

  // addLunchProducts = (params: IAddLunchProducts): Promise<ILunchs> =>
  //   this.post(`${Endpoints.AddLunchProduct}/${params?.id}`, {
  //     products: params?.products,
  //   });

  // getSingleLunch = (id: string): Promise<ILunchs> =>
  //   this.get(`${Endpoints.GetLunchProducts}/${id}`);

  // editedProduct = (params: IEditedLunchProducts): Promise<ILunchs> =>
  //   this.patch(`${Endpoints.AddLunchProduct}/${params?.lunchId}`, {products: params?.products});

  // updatedLunchProduct = (params: ILunchUpdate): Promise<ILunchs> =>
  //   this.patch(`lunch/${params.id}`, {
  //     name: params?.name,
  //     // products: params?.products,
  //     // cost: params?.cost,
  //     // percent_cook: params?.percent_cook,
  //   });

  // deleteProduct = (params: IDeletLunchProducts): Promise<ILunchs> =>
  //   this.delete(`/lunch/${params?.lunchId}/products/${params?.productId}`);

  // addOneLunchProduct = (params: IAddOneLunchProduct): Promise<IAddOneLunchProduct> =>
  //   this.post(`/lunch/products/${params.id}`, {
  //     id: params.id,
  //     product: params.product,
  //     amount: params.amount,
  //   });

  // updateLunchProduct = (params: IAddOneLunchProduct): Promise<IAddOneLunchProduct> =>
  //   this.patch(`lunch/products/${params.id}`, {
  //     product: params.product,
  //     amount: params.amount,
  //   });

  // deleteLunchProduct = (id: string, product: string): Promise<IAddOneLunchProduct> =>
  //   this.delete(`lunch/products/${id}/${product}`);

}

export const mealPollApi = new MealPollApi(config);

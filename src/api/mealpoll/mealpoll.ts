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
}

export const mealPollApi = new MealPollApi(config);

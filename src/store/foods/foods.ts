import {makeAutoObservable} from 'mobx';
import {foodsApi} from '../../api/foods';
import {IFoods} from '../../api/foods/types';
import {IPagination} from '../../api/types';
import {addAxiosErrorNotification} from '../../utils/notification';

class FoodsStore {
  foods: IFoods[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  getFoods = (params: IPagination) =>
    foodsApi.getFoods(params)
      .then(res => {
        if (res) {
          this.setFoods(res);
        }
      })
      .catch(addAxiosErrorNotification);

  setFoods = (foods: IFoods[]) => {
    this.foods = foods;
  };

  reset() {
    this.foods = [];
  }
}

export const foodsStore = new FoodsStore();

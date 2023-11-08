import {makeAutoObservable} from 'mobx';
import {IFoodsProducts} from '../../api/foods/types';
import {lunchApi} from '../../api/lunch';
import {IAddLunch, IAddLunchBaseParams, IAddLunchProducts, IGetLunchBase, ILunchs} from '../../api/lunch/types';
import {IPagination} from '../../api/types';
import {addAxiosErrorNotification, successNotification} from '../../utils/notification';

class LunchStore {
  lunchs: ILunchs[] = [];
  page = 1;
  size = 10;
  totalLunchs = 0;
  isOpenAddLunchModal = false;
  lunchBases: IGetLunchBase[] = [];
  singleLunchId: string | null = null;
  isOpenLunchModal = false;
  singleFoodProduct: IFoodsProducts[] = [];
  isOpenSingleFoodProductModal = false;

  constructor(){
    makeAutoObservable(this);
  }

  getLunchs = (params: IPagination) =>
    lunchApi.getLunchs(params)
      .then(res => {
        if (res?.data) {
          this.setLunchs(res?.data);
          this.setTotalLunch(res?.totalLunchBases);
        }
      })
      .catch(addAxiosErrorNotification);

  addLunchs = (params: IAddLunch) =>
    lunchApi.addLunch(params)
      .then(res => {
        if (res) {
          successNotification('Success add new lunch');
          this.getLunchs({
            page: this.page,
            size: this.size,
          });
        }

        return res;
      })
      .catch(addAxiosErrorNotification);

  addLunchProducts = (params: IAddLunchProducts) =>
    lunchApi.addLunchProducts(params)
      .then(res => {
        if (res) {
          successNotification('Success add lunch products');
          this.getLunchs({
            page: this.page,
            size: this.size,
          });
        }

        return res;
      })
      .catch(addAxiosErrorNotification);

  getLunchBases = (id: string) =>
    lunchApi.getLunchBase(id)
      .then(res => {
        if (res) {
          this.setLunchBases(res);
        }

        return res;
      })
      .catch(addAxiosErrorNotification);

  getSingleLunch = (id: string) =>
    lunchApi.getSingleLunch(id)
      .then(res => res)
      .catch(addAxiosErrorNotification);

  addLunchBase = (params: IAddLunchBaseParams) =>
    lunchApi.addLunchBase(params)
      .then(res => {
        if (res) {
          successNotification('Success add new lunch');
          this.getLunchBases(this.singleLunchId!);
        }

        return res;
      })
      .catch(addAxiosErrorNotification);

  setLunchs = (lunchs: ILunchs[]) => {
    this.lunchs = lunchs;
  };

  setTotalLunch = (totalLunch: number) => {
    this.totalLunchs = totalLunch;
  };

  setPage = (page: number) => {
    this.page = page;
  };

  setSize = (size: number) => {
    this.size = size;
  };

  setIsOpenLunchModal = (isOpen: boolean) => {
    this.isOpenAddLunchModal = isOpen;
  };

  setLunchBases = (lunchBases: IGetLunchBase[]) => {
    this.lunchBases = lunchBases;
  };

  setSingleLunchId = (id: string | null) => {
    this.singleLunchId = id;
  };

  setIsOpenLunchBaseModal = (isOpen: boolean) => {
    this.isOpenLunchModal = isOpen;
  };

  setSingleFoodProducts = (singleProducts: IFoodsProducts[]) => {
    this.singleFoodProduct = singleProducts;
  };

  setIsOpenFoodProductModal = (isOpen: boolean) => {
    this.isOpenSingleFoodProductModal = isOpen;
  };

  reset() {
    this.lunchs = [];
    this.page = 1;
    this.size = 10;
    this.totalLunchs = 0;
    this.isOpenAddLunchModal = false;
  }
}

export const lunchStore = new LunchStore();

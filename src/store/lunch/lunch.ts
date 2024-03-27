import {makeAutoObservable} from 'mobx';
import {IFoodsProducts} from '../../api/foods/types';
import {lunchApi} from '../../api/lunch';
import {
  IAddLunch,
  IAddLunchBaseParams,
  IAddLunchProducts,
  IChangeVerify,
  IGetLunchBase,
  IGetLunchBaseListParams,
  IGetOneLunch,
  ILunchEdit,
  ILunchs,
  ILunchsProduct,
  ILunchUpdate,
  IOneProduct,
} from '../../api/lunch/types';
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
  isLunchEditModal = false;
  singleLunch: ILunchsProduct | null = null;
  lunchBaseProductAddEditModal = false;
  lunchOneProduct: IOneProduct[] = [];
  isOneLunchProductAddModal= false;
  isSingleLunchProduct: IOneProduct | null = null;
  isOneLunchProductEditModal = false;
  isOpenEditLunchModal = false;
  isSingleEditLunch: ILunchs | null = null;

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

        return res;
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

  editLunchs = (params: ILunchEdit) =>
    lunchApi.editLunch(params)
      .then(res => {
        if (res) {
          successNotification('Success update');
          this.getLunchs({
            page: this.page,
            size: this.size,
          });
        }

        return res;
      })
      .catch(addAxiosErrorNotification);

  updateLunchProduct = (params: ILunchUpdate) =>
    lunchApi.updatedLunchProduct(params)
      .then(res => {
        successNotification('Success edit new lunch');

        return res;
      })
      .catch(addAxiosErrorNotification);


  addLunchProducts = (params: IAddLunchProducts) =>
    lunchApi.addLunchProducts(params)
      .then(res => {
        successNotification('Success add lunch products');
        this.getLunchs({
          page: this.page,
          size: this.size,
        });

        return res;
      })
      .catch(addAxiosErrorNotification);

  getLunchBases = (params: IGetLunchBaseListParams) =>
    lunchApi.getLunchBase(params)
      .then(res => {
        if (res) {
          this.setLunchBases(res.lunchList);
        }

        return res;
      })
      .catch(addAxiosErrorNotification);

  getOneLunchProduct = (id: string) =>
    lunchApi.getOneLunch(id)
      .then((res) => {
        if (res) {
          this.setLunchOneProduct(res?.products);
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
          // this.getLunchBases(this.singleLunchId!);
        }

        return res;
      })
      .catch(addAxiosErrorNotification);

  changeVerify = (params: IChangeVerify) =>
    lunchApi.changeVerify(params)
      .then(res => {
        if (res) {
          successNotification('Success change is active');
          // this.getLunchBases({
          //   lunchbase:
          // });
        }

        return res;
      })
      .catch(addAxiosErrorNotification);

  changeVerifyBase = (params: IChangeVerify) =>
    lunchApi.changeVerifyBase(params)
      .then(res => {
        if (res) {
          successNotification('Success change is active');
          // this.getLunchBases({
          //   lunchbase:
          // });
        }

        return res;
      })
      .catch(addAxiosErrorNotification);


  getOneLunch = (id: string) =>
    lunchApi.getOneLunch(id)
      .then((res) => {
        if (res) {
          this.setLunchOneProduct(res.products);
        }

        return res;
      })
      .catch(addAxiosErrorNotification);

  setIsOpenEditLunchModal = (isOpen: boolean) => {
    this.isOpenEditLunchModal = isOpen;
  };

  setIsSingleEditLunch = (isSingle: ILunchs | null) => {
    this.isSingleEditLunch = isSingle;
  };

  setIsOneLunchProductAddModal = (isOpen: boolean) => {
    this.isOneLunchProductAddModal = isOpen;
  };

  setIsSingleLunchProduct = (singleProduct: IOneProduct | null) => {
    this.isSingleLunchProduct = singleProduct;
  };

  setIsOneLunchProductEditModal = (isOpen: boolean) => {
    this.isOneLunchProductEditModal = isOpen;
  };

  setLunchOneProduct = (lunchOneProduct: IOneProduct[]) => {
    this.lunchOneProduct = lunchOneProduct;
  };

  setLunchBaseProductAddEditModal = (isOpen: boolean) => {
    this.lunchBaseProductAddEditModal = isOpen;
  };

  setLunchEditModal = (isOpen: boolean) => {
    this.isLunchEditModal = isOpen;
  };

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

  setSingleLunch = (singleLunch: ILunchsProduct | null) => {
    this.singleLunch = singleLunch;
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

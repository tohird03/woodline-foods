import {makeAutoObservable} from 'mobx';
// import {IFoodsProducts} from '../../api/foods/types';
// import {lunchApi} from '../../api/lunch';
// import {
//   IAddLunch,
//   IAddLunchBaseParams,
//   IAddLunchProducts,
//   IChangeVerify,
//   IGetLunchBase,
//   IGetLunchBaseListParams,
//   IGetOneLunch,
//   IGetOneLunchProducts,
//   ILunchEdit,
//   ILunchs,
//   ILunchsProduct,
//   ILunchUpdate,
// } from '../../api/lunch/types';
import {mealPollApi} from '../../api/mealpoll';
import {IMealPollList} from '../../api/mealpoll/types';
import {IPagination} from '../../api/types';
import {addAxiosErrorNotification, successNotification} from '../../utils/notification';


class MealPollStore {
  page = 1;
  size = 10;
  totalMealPolls = 0;
  mealPolls: IMealPollList[] = [];

  constructor(){
    makeAutoObservable(this);
  }

  getMealPoll = (params: IPagination) =>
    mealPollApi.getMealPoll(params)
      .then(res => {
        if (res) {
          // this.setLunchs(res?.data);
          // this.setTotalLunch(res?.totalLunchBases);
          this.setMealPolls(res?.mealpollList);
        }

        return res;
      })
      .catch(addAxiosErrorNotification);

  setMealPolls = (mealPolls: IMealPollList[]) => {
    this.mealPolls = mealPolls;
  };

  setPage = (page: number) => {
    this.page = page;
  };

  setSize = (size: number) => {
    this.size = size;
  };

  // addLunchs = (params: IAddLunch) =>
  //   lunchApi.addLunch(params)
  //     .then(res => {
  //       if (res) {
  //         successNotification('Success add new lunch');
  //         this.getLunchs({
  //           page: this.page,
  //           size: this.size,
  //         });
  //       }

  //       return res;
  //     })
  //     .catch(addAxiosErrorNotification);

  // editLunchs = (params: ILunchEdit) =>
  //   lunchApi.editLunch(params)
  //     .then(res => {
  //       if (res) {
  //         successNotification('Success update');
  //         this.getLunchs({
  //           page: this.page,
  //           size: this.size,
  //         });
  //       }

  //       return res;
  //     })
  //     .catch(addAxiosErrorNotification);

  // updateLunchProduct = (params: ILunchUpdate) =>
  //   lunchApi.updatedLunchProduct(params)
  //     .then(res => {
  //       successNotification('Success edit new lunch');

  //       return res;
  //     })
  //     .catch(addAxiosErrorNotification);


  // addLunchProducts = (params: IAddLunchProducts) =>
  //   lunchApi.addLunchProducts(params)
  //     .then(res => {
  //       successNotification('Success add lunch products');
  //       this.getLunchs({
  //         page: this.page,
  //         size: this.size,
  //       });

  //       return res;
  //     })
  //     .catch(addAxiosErrorNotification);

  // getLunchBases = (params: IGetLunchBaseListParams) =>
  //   lunchApi.getLunchBase(params)
  //     .then(res => {
  //       if (res) {
  //         this.setLunchBases(res.lunchList);
  //       }

  //       return res;
  //     })
  //     .catch(addAxiosErrorNotification);

  // getOneLunchProduct = (id: string) =>
  //   lunchApi.getOneLunch(id)
  //     .then((res) => {
  //       if (res) {
  //         this.setLunchOneProduct(res?.products);
  //       }

  //       return res;
  //     })
  //     .catch(addAxiosErrorNotification);

  // getSingleLunch = (id: string) =>
  //   lunchApi.getSingleLunch(id)
  //     .then(res => res)
  //     .catch(addAxiosErrorNotification);

  // addLunchBase = (params: IAddLunchBaseParams) =>
  //   lunchApi.addLunchBase(params)
  //     .then(res => {
  //       if (res) {
  //         successNotification('Success add new lunch');
  //         // this.getLunchBases(this.singleLunchId!);
  //       }

  //       return res;
  //     })
  //     .catch(addAxiosErrorNotification);

  // changeVerify = (params: IChangeVerify) =>
  //   lunchApi.changeVerify(params)
  //     .then(res => {
  //       if (res) {
  //         successNotification('Success change is active');
  //         // this.getLunchBases({
  //         //   lunchbase:
  //         // });
  //       }

  //       return res;
  //     })
  //     .catch(addAxiosErrorNotification);

  // changeVerifyBase = (params: IChangeVerify) =>
  //   lunchApi.changeVerifyBase(params)
  //     .then(res => {
  //       if (res) {
  //         successNotification('Success change is active');
  //         // this.getLunchBases({
  //         //   lunchbase:
  //         // });
  //       }

  //       return res;
  //     })
  //     .catch(addAxiosErrorNotification);


  // getOneLunch = (id: string) =>
  //   lunchApi.getOneLunch(id)
  //     .then((res) => {
  //       if (res) {
  //         this.setLunchOneProduct(res.products);
  //       }

  //       return res;
  //     })
  //     .catch(addAxiosErrorNotification);

  // setIsOpenEditLunchModal = (isOpen: boolean) => {
  //   this.isOpenEditLunchModal = isOpen;
  // };

  // setIsSingleEditLunch = (isSingle: ILunchs | null) => {
  //   this.isSingleEditLunch = isSingle;
  // };

  // setIsOneLunchProductAddModal = (isOpen: boolean) => {
  //   this.isOneLunchProductAddModal = isOpen;
  // };

  // setIsSingleLunchProduct = (singleProduct: IGetOneLunchProducts | null) => {
  //   this.isSingleLunchProduct = singleProduct;
  // };

  // setIsOneLunchProductEditModal = (isOpen: boolean) => {
  //   this.isOneLunchProductEditModal = isOpen;
  // };

  // setLunchOneProduct = (lunchOneProduct: IGetOneLunchProducts[]) => {
  //   this.lunchOneProduct = lunchOneProduct;
  // };

  // setLunchBaseProductAddEditModal = (isOpen: boolean) => {
  //   this.lunchBaseProductAddEditModal = isOpen;
  // };

  // setLunchEditModal = (isOpen: boolean) => {
  //   this.isLunchEditModal = isOpen;
  // };

  // setLunchs = (lunchs: ILunchs[]) => {
  //   this.lunchs = lunchs;
  // };

  // setTotalLunch = (totalLunch: number) => {
  //   this.totalLunchs = totalLunch;
  // };

  // setPage = (page: number) => {
  //   this.page = page;
  // };

  // setSize = (size: number) => {
  //   this.size = size;
  // };

  // setIsOpenLunchModal = (isOpen: boolean) => {
  //   this.isOpenAddLunchModal = isOpen;
  // };

  // setLunchBases = (lunchBases: IGetLunchBase[]) => {
  //   this.lunchBases = lunchBases;
  // };

  // setSingleLunchId = (id: string | null) => {
  //   this.singleLunchId = id;
  // };

  // setIsOpenLunchBaseModal = (isOpen: boolean) => {
  //   this.isOpenLunchModal = isOpen;
  // };

  // setSingleFoodProducts = (singleProducts: IFoodsProducts[]) => {
  //   this.singleFoodProduct = singleProducts;
  // };

  // setIsOpenFoodProductModal = (isOpen: boolean) => {
  //   this.isOpenSingleFoodProductModal = isOpen;
  // };

  // setSingleLunch = (singleLunch: ILunchsProduct | null) => {
  //   this.singleLunch = singleLunch;
  // };

  reset() {}
}

export const mealPollStore = new MealPollStore();

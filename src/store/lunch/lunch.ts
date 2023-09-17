import {makeAutoObservable} from 'mobx';
import {lunchApi} from '../../api/lunch';
import {IAddLunch, ILunchs} from '../../api/lunch/types';
import {IPagination} from '../../api/types';
import {addAxiosErrorNotification, successNotification} from '../../utils/notification';

class LunchStore {
  lunchs: ILunchs[] = [];
  page = 1;
  size = 10;
  totalLunchs = 0;
  isOpenAddLunchModal = false;

  constructor(){
    makeAutoObservable(this);
  }

  getLunchs = (params: IPagination) =>
    lunchApi.getLunchs(params)
      .then(res => {
        if (res?.data) {
          this.setLunchs(res?.data);
          this.setTotalLunch(res?.totalLunches);
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

  reset() {
    this.lunchs = [];
    this.page = 1;
    this.size = 10;
    this.totalLunchs = 0;
    this.isOpenAddLunchModal = false;
  }
}

export const lunchStore = new LunchStore();

import {makeAutoObservable} from 'mobx';
import {adminApi} from '../../api/admin/admin';
import {IAddAdmin, IAdmins, IEditAdmin} from '../../api/admin/types';
import {addAxiosErrorNotification, successNotification} from '../../utils/notification';

class AdminStore {
  admins: IAdmins[] = [];
  isOpenNewAdminModal = false;
  isOpenEditAdminModal = false;

  constructor() {
    makeAutoObservable(this);
  }

  getAdmins = () =>
    adminApi.getAdmins()
      .then(res => {
        if (res) {
          this.setAdmins(res);
        }

        return res;
      })
      .catch(addAxiosErrorNotification);

  addAdmin = (params: IAddAdmin) =>
    adminApi.addAdmins(params)
      .then(res => {
        if (res) {
          successNotification('Success add new admin');

          this.getAdmins();
        }

        return res;
      })
      .catch(addAxiosErrorNotification);

  editAdmin = (params: IEditAdmin) =>
    adminApi.editAdmin(params)
      .then(res => {
        if (res) {
          successNotification('Admins edited successfully');
          this.getAdmins();
        }
      });


  setAdmins = (admins: IAdmins[]) => {
    this.admins = admins;
  };

  setIsOpenNewAdminModal = (isOpen: boolean) => {
    this.isOpenNewAdminModal = isOpen;
  };

  setIsOpenEditAdminModal = (isOpen: boolean) => {
    this.isOpenEditAdminModal = isOpen;
  };

  reset() {
    this.admins = [];
    this.isOpenNewAdminModal = false;
  }
}

export const adminStore = new AdminStore();

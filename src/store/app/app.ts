import {makeAutoObservable} from 'mobx';
import {appApi} from '../../api/app/app';
import {IMessageParams} from '../../api/app/types';
import {addAxiosErrorNotification, successNotification} from '../../utils/notification';

class AppStore {
  isOpenNotificationModal = false;

  constructor() {
    makeAutoObservable(this);
  }

  setIsOpenNotificationModal = (isOpen: boolean) => {
    this.isOpenNotificationModal = isOpen;
  };

  sendMessages = (params: IMessageParams) =>
    appApi.sendMessage(params)
      .then(res => {
        if (res?.status === 200) {
          successNotification('Success send messages');
        }
      })
      .catch(addAxiosErrorNotification);

  reset() {
    this.isOpenNotificationModal = false;
  }
}

export const appStore = new AppStore();

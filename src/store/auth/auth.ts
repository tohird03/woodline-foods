import {makeAutoObservable} from 'mobx';
import {authApi} from '../../api/auth/auth';
import {ILogin, ILoginResponse} from '../../api/auth/types';
import {addAxiosErrorNotification} from '../../utils/notification';

class AuthStore {
  token = '';
  isAuth = false;
  staffInfo: ILoginResponse | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  login = (params: ILogin) =>
    authApi.login(params)
      .then(res => {
        if (res?.accessToken) {
          this.setToken(res?.accessToken);
          this.setStaffInfo(res);
          this.setIsAuth(true);
        }

        return res;
      })
      .catch(addAxiosErrorNotification);

  setStaffInfo = (staffInfo: ILoginResponse | null) => {
    this.staffInfo = staffInfo;
  };

  setToken = (token: string) => {
    this.token = token;
  };

  setIsAuth = (isAuth: boolean) => {
    this.isAuth = isAuth;
  };

  reset() {
    this.token = '';
    this.isAuth = false;
  }
}

export const authStore = new AuthStore();

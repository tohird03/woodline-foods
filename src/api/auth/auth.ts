import {Endpoints} from '../endpoints';
import {Instance} from '../instance';
import {INetworkConfig} from '../types';
import {ILogin, ILoginResponse} from './types';

const config: INetworkConfig = {
  baseURL: Endpoints.Base,
};

class AuthApi extends Instance {
  constructor(config: INetworkConfig) {
    super(config);
  }

  login = (params: ILogin): Promise<ILoginResponse> =>
    this.post(Endpoints.Login, params);
}

export const authApi = new AuthApi(config);

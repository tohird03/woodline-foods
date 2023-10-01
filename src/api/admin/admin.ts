import {Endpoints} from '../endpoints';
import {Instance} from '../instance';
import {INetworkConfig} from '../types';
import {IAddAdmin, IAdmins} from './types';

const config: INetworkConfig = {
  baseURL: Endpoints.Base,
};

class AdminApi extends Instance {
  constructor(config: INetworkConfig) {
    super(config);
  }

  getAdmins = (): Promise<IAdmins[]> =>
    this.get(Endpoints.Admins);

  addAdmins = (params: IAddAdmin): Promise<IAdmins> =>
    this.post(Endpoints.Admins, params);
}

export const adminApi = new AdminApi(config);

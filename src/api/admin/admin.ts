import {Endpoints} from '../endpoints';
import {Instance} from '../instance';
import {INetworkConfig} from '../types';
import {IAddAdmin, IAdmins, IDeleteAdmin, IEditAdmin} from './types';

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

  editAdmin = (params: IEditAdmin): Promise<IAdmins> =>
    this.patch(`${Endpoints.Admins}/${params._id}`, params);

  deleteAdmin = (params: IDeleteAdmin): Promise<IAdmins> =>
    this.delete (`${Endpoints.AdminDelete}/${params._id}`);
}

export const adminApi = new AdminApi(config);

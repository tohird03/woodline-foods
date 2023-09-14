import {Endpoints} from '../endpoints';
import {Instance} from '../instance';
import {INetworkConfig, IPagination} from '../types';
import {IGetUser} from './types';

const config: INetworkConfig = {
  baseURL: Endpoints.Base,
};

class UsersApi extends Instance {
  constructor(config: INetworkConfig) {
    super(config);
  }

  getUsers = (params: IPagination): Promise<IGetUser> =>
    this.get(Endpoints.Users, {params});

  changeUserStatus = (id: string): Promise<any> =>
    this.put(`${Endpoints.UserStatus}/${id}`);
}

export const usersApi = new UsersApi(config);

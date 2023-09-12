import {Endpoints} from '../endpoints';
import {Instance} from '../instance';
import {INetworkConfig, IPagination} from '../types';
import {IUsers} from './types';

const config: INetworkConfig = {
  baseURL: Endpoints.Base,
};

class UsersApi extends Instance {
  constructor(config: INetworkConfig) {
    super(config);
  }

  getUsers = (params: IPagination): Promise<IUsers[]> =>
    this.get(Endpoints.Users, {params});
}

export const usersApi = new UsersApi(config);

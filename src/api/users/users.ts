import {Endpoints} from '../endpoints';
import {Instance} from '../instance';
import {INetworkConfig, IPagination} from '../types';
import {
  IChangeOrganisation,
  IChangeRole,
  IChangeStatus,
  IGetOrganisation,
  IGetUser,
  IUserParams,
  IUsers,
  TransactionParams,
} from './types';

const config: INetworkConfig = {
  baseURL: Endpoints.Base,
};

class UsersApi extends Instance {
  constructor(config: INetworkConfig) {
    super(config);
  }

  getUsers = (params: IUserParams): Promise<IGetUser> =>
    this.get(Endpoints.Users, {params});

  changeUserStatus = (params: IChangeStatus): Promise<null> =>
    this.put(`${Endpoints.UserStatus}/${params?.id}`, {is_active: params?.is_active});

  getOrganisation = (params: IPagination): Promise<IGetOrganisation> =>
    this.get(Endpoints.Organisation, {params});

  changeOrganisation = (params: IChangeOrganisation): Promise<any> =>
    this.put(`${Endpoints.UserOrganisation}/${params?.user}`, {org: params?.org});

  changeVerifyUser = (id: string): Promise<any> =>
    this.put(`${Endpoints.UserChangeVerify}/${id}`);

  addBalance = (params: TransactionParams): Promise<any> =>
    this.patch(Endpoints.UserPayment, params);

  changeRole = (params: IChangeRole): Promise<IUsers> =>
    this.patch(Endpoints.UserRole, params);
}

export const usersApi = new UsersApi(config);

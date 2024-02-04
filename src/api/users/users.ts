import { Endpoints } from '../endpoints';
import { Instance } from '../instance';
import { INetworkConfig, IPagination } from '../types';
import {
  IChangeOrganisation,
  IChangeRole,
  IChangeStatus,
  IDeleteUser,
  IGetOrganisation,
  IGetUser,
  IOrdersUsers,
  IUserAnaliticData,
  IUserAnaliticParams,
  IUserOrders,
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
    this.get(Endpoints.Users, { params });

  changeUserStatus = (params: IChangeStatus): Promise<null> =>
    this.put(`${Endpoints.UserStatus}/${params?.id}`, { is_active: params?.is_active });

  getOrganisation = (params: IPagination): Promise<IGetOrganisation> =>
    this.get(Endpoints.Organisation, { params });

  getUserOrders = (params: IUserOrders): Promise<IOrdersUsers> =>
    this.get(`${Endpoints.UserOrders}/${params?.id}`, { params });

  changeOrganisation = (params: IChangeOrganisation): Promise<any> =>
    this.patch(`${Endpoints.UserEdit}`, {
      id: params?.user,
      first_name: params?.first_name,
      last_name: params?.last_name,
      org: params?.org,
    });

  changeVerifyUser = (id: string): Promise<any> =>
    this.put(`${Endpoints.UserChangeVerify}/${id}`);

  addBalance = (params: TransactionParams): Promise<any> =>
    this.patch(Endpoints.UserPayment, params);

  changeRole = (params: IChangeRole): Promise<IUsers> =>
    this.patch(Endpoints.UserRole, params);

  getUserAnalitic = (params: IUserAnaliticParams): Promise<IUserAnaliticData> =>
    this.get(Endpoints.UserOrderAnalitic, {
      params:
        { user: params?.user, start: params?.start, end: params?.end, org: params?.org },
    });

  deleteUser = (params: IDeleteUser): Promise<IUsers> =>
    this.delete(`${Endpoints.Users}/${params?.userId}`);
}

export const usersApi = new UsersApi(config);

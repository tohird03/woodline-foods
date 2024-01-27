import {Endpoints} from '../endpoints';
import {Instance} from '../instance';
import {INetworkConfig} from '../types';
import {IAddRole, IGetRoleParams, IGetRoles, IRole, IRoleModule, IRoleModules, IUpdateRole} from './types';

const config: INetworkConfig = {
  baseURL: '',
};


class RoleApi extends Instance {
  constructor(config: INetworkConfig){
    super(config);
  }

  getRoles = (params: IGetRoleParams): Promise<IGetRoles> =>
    this.get(Endpoints.Roles, {params});

  addRole = (params: IAddRole): Promise<IAddRole> =>
    this.post(Endpoints.Roles, params);

  deleteRole = (params: IRole): Promise<IRole> =>
    this.delete(`${Endpoints.RoleDelete}/${params._id}`);

  updateRole = (params: IUpdateRole): Promise<IRole> =>
    this.put(`${Endpoints.RoleUpdate}/${params._id}`, params);

  getRoleModules = (params: IRoleModules): Promise<IRoleModules> =>
    this.get(Endpoints.RoleModules, params);

  addRoleModule = (params: IRoleModule): Promise<IRoleModule> =>
    this.post(Endpoints.RoleModules, params);

  updateRoleModule = (params: IRoleModule): Promise<IRoleModule> =>
    this.put(`${Endpoints.RoleModuleUpdate}/${params._id}`, params);

  deleteRoleModule = (params: {_id: string}): Promise<IRoleModule> =>
    this.delete(`${Endpoints.RoleModuleDelete}/${params._id}`);
}


export const roleApi = new RoleApi(config);

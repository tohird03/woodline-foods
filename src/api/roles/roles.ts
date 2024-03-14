import {Endpoints} from '../endpoints';
import {Instance} from '../instance';
import {INetworkConfig} from '../types';
import {
  IAddModuleAction,
  IAddRole,
  IAddRoleModule,
  IDeleteModuleAction,
  IGetRoles,
  IRole,
  IToggleRoleModule,
  IUpdateModuleActions,
  IUpdateRole,
  IUpdateRoleModule} from './types';

const config: INetworkConfig = {
  baseURL: '',
};


class RoleApi extends Instance {
  constructor(config: INetworkConfig){
    super(config);
  }

  getRoles = (): Promise<IGetRoles> =>
    this.get(Endpoints.Roles);

  addRole = (params: IAddRole): Promise<IAddRole> =>
    this.post(Endpoints.Roles, params);

  deleteRole = (params: IRole): Promise<IRole> =>
    this.delete(`${Endpoints.RoleDelete}/${params._id}`);

  updateRole = (params: IUpdateRole): Promise<IRole> =>
    this.put(`${Endpoints.RoleUpdate}/${params._id}`, params);

  addRoleModule = (params: IAddRoleModule): Promise<IAddRoleModule> =>
    this.post(Endpoints.RoleModules, params);

  updateRoleModule = (params: IUpdateRoleModule): Promise<IUpdateRoleModule> =>
    this.patch(Endpoints.RoleModuleUpdate, params);

  toggleRoleModule = (params: IToggleRoleModule): Promise<IToggleRoleModule> =>
    this.patch(Endpoints.RoleModuleToggle, params);

  // deleteRoleModule = (params: IDeleteRoleModule): Promise<IDeleteRoleModule> =>
  //   this.delete(Endpoints.RoleModuleDelete, params);

  addModuleAction = (params: IAddModuleAction): Promise<IAddModuleAction> =>
    this.post(Endpoints.ModuleAction, params);

  deleteModuleAction = (params: IDeleteModuleAction): Promise<IDeleteModuleAction> =>
    this.delete(Endpoints.ModuleAction, {
      params: {
        action_uri: params?.action_uri,
        module_uri: params?.module_uri,
      },
    });

  updateModuleActions = (params: IUpdateModuleActions): Promise<IUpdateModuleActions> =>
    this.patch(Endpoints.UpdateModuleAction, params);
}


export const roleApi = new RoleApi(config);

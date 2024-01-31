export interface IGetRoles {
  roles: IRole[];
}

export interface IRole {
  _id: string;
  title: string;
  modules: IRoleModule[];
}

export interface IAddRole {
  title: string;
}

export interface IUpdateRole{
  _id: string;
  title: string;
}

export interface IRoleModules {
  roleModules: IRoleModule[];
}

export interface IRoleModule {
  _id: string;
  uri: string;
  permission: boolean;
  actions: IRoleActions[];
}

export interface IAddRoleModule{
  module_uri: string;
}

export interface IRoleActions{
  _id: string;
  permission: boolean;
  uri: string;
}

export interface IUpdateModuleActions{
  role_id: string;
  module_id: string;
  action_id?: string;
}

export interface IAddModuleAction{
  module_uri: string;
  action_uri: string;
}

export interface IDeleteModuleAction{
  module_uri: string;
  action_uri: string;
}

export interface IGetRoleParams{
  roles: IRole[];
}

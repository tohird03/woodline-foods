export interface IGetRoles {
  data: IRole[];
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

export interface IRoleActions{
  _id: string;
  permission: boolean;
  uri: string;
}
export interface IGetRoleParams extends IGetRoles{
  search?: string;
  data: IRole[];

}

import { makeAutoObservable } from 'mobx';
import { roleApi } from '../../api/roles';
import {
  IAddRole,
  IGetRoleParams,
  IGetRoles,
  IRole,
  IRoleModule,
  IRoleModules,
  IUpdateRole,
} from '../../api/roles/types';
import { addAxiosErrorNotification, successNotification } from '../../utils/notification';

class RolesStore {
  data: IRole[] = [];
  title: string | null = null;
  modules: IRoleModule[] = [];
  isOpenCreateRoleModal = false;
  newRoleTitle: string | null = null;
  constructor() {
    makeAutoObservable(this);
  }

  getRoles = (params: IGetRoleParams) =>
    roleApi.getRoles(params)
      .then(res => {
        if (res) {
          this.setRoles(res.data);
        }
      })
      .catch(addAxiosErrorNotification);

  addRole = (params: IAddRole) =>
    roleApi.addRole(params)
      .then(res => {
        if (res) {
          successNotification('Role successfully added');
          this.getRoles({
            data: [],
          });
        }
      })
      .catch(addAxiosErrorNotification);

  updateRole = (params: IUpdateRole) =>
    roleApi.updateRole(params)
      .then(res => {
        if (res) {
          successNotification('Role successfully updated');
        }
      })
      .catch(addAxiosErrorNotification);

  getRoleModules = (params: IRoleModules) =>
    roleApi.getRoleModules(params)
      .then(res => {
        if (res) {
          this.setRoleModule(res.roleModules);
        }
      })
      .catch(addAxiosErrorNotification);

  addRoleModule = (params: IRoleModule) =>
    roleApi.addRoleModule(params)
      .then(res => {
        if (res) {
          this.setRoleModule([...this.modules, res]);
          successNotification('Role module successfully added');
        }
      })
      .catch(addAxiosErrorNotification);

  updateRoleModule = (params: IRoleModule) =>
    roleApi.updateRoleModule(params)
      .then(res => {
        if (res) {
          this.setRoleModule([...this.modules, res]);
          successNotification('Role module successfully updated');
        }
      })
      .catch(addAxiosErrorNotification);

  deleteRoleModule = (moduleId: string) =>
    roleApi.deleteRoleModule({ _id: moduleId })
      .then(res => {
        if (res) {
          this.setRoleModule([...this.modules, res]);
          successNotification('Role module successfully deleted');
        }
      })
      .catch(addAxiosErrorNotification);

  createRoleModalVisible = (isOpen: boolean) => {
    this.setCreateRoleModalVisible(isOpen);
  };

  setRoles = (role: IRole[]) => {
    this.data = role;
  };

  setCreateRoleModalVisible = (isOpen: boolean) => {
    this.isOpenCreateRoleModal = isOpen;
  };

  setRoleModule = (roleModules: IRoleModule[]) => {
    this.modules = roleModules;
  };

  setNewRoleTitle = (roleTitle: string) => {
    this.newRoleTitle = roleTitle;
  };

  reset() {
    this.data = [];
    this.modules = [];
  }
}

export const rolesStore = new RolesStore();

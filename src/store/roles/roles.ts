import {makeAutoObservable} from 'mobx';
import {roleApi} from '../../api/roles';
import {
  IAddModuleAction,
  IAddRole,
  IAddRoleModule,
  IDeleteModuleAction,
  IRole,
  IRoleModule,
  IUpdateModuleActions,
  IUpdateRole,
} from '../../api/roles/types';
import {addAxiosErrorNotification, successNotification} from '../../utils/notification';

class RolesStore {
  roles: IRole[] = [];
  title: string | null = null;
  modules: IRoleModule[] = [];
  isOpenCreateRoleModal = false;
  isOpenCreateRoleModuleModal = false;
  isOpenCreateModuleActionModal = false;
  newRoleTitle: string | null = null;
  constructor() {
    makeAutoObservable(this);
  }

  getRoles = () =>
    roleApi.getRoles()
      .then(res => {
        if (res) {
          this.setRoles(res.roles);
        }
      })
      .catch(addAxiosErrorNotification);

  addRole = (params: IAddRole) =>
    roleApi.addRole(params)
      .then(res => {
        if (res) {
          successNotification('Role successfully added');
          this.getRoles();
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

  addRoleModule = (params: IAddRoleModule) =>
    roleApi.addRoleModule(params)
      .then(res => {
        if (res) {
          successNotification('Role module successfully added');
          this.getRoles();
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
    roleApi.deleteRoleModule({_id: moduleId})
      .then(res => {
        if (res) {
          this.setRoleModule([...this.modules, res]);
          successNotification('Role module successfully deleted');
          this.getRoles();
        }
      })
      .catch(addAxiosErrorNotification);

  addModuleAction = (params: IAddModuleAction) =>
    roleApi.addModuleAction(params)
      .then(res => {
        if (res){
          successNotification('Module action successfully added');
          this.getRoles();
        }
      })
      .catch(addAxiosErrorNotification);

  deleteModuleAction = (params: IDeleteModuleAction) =>
    roleApi.deleteModuleAction(params)
      .then(res => {
        if (res){
          successNotification('Action deleted');
          this.getRoles();
        }
      })
      .catch(addAxiosErrorNotification);

  updateModuleAction = (params: IUpdateModuleActions) =>
    roleApi.updateModuleActions(params)
      .then(res => {
        if (res){
          this.getRoles();
        }
      })
      .catch(addAxiosErrorNotification);

  setRoles = (role: IRole[]) => {
    this.roles = role;
  };

  setCreateRoleModalVisible = (isOpen: boolean) => {
    this.isOpenCreateRoleModal = isOpen;
  };

  setCreateRoleModuleModalVisible = (isOpen: boolean) => {
    this.isOpenCreateRoleModuleModal = isOpen;
  };

  setCreateModuleActionModalVisible = (isOpen: boolean) => {
    this.isOpenCreateModuleActionModal = isOpen;
  };

  setRoleModule = (roleModules: IRoleModule[]) => {
    this.modules = roleModules;
  };

  setNewRoleTitle = (roleTitle: string) => {
    this.newRoleTitle = roleTitle;
  };

  reset() {
    this.roles = [];
    this.modules = [];
  }
}

export const rolesStore = new RolesStore();

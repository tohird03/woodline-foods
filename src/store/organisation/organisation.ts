import {makeAutoObservable} from 'mobx';
import {organisationApi} from '../../api/organisation';
import {IAddOrganization, IChangeGroup, IOrganisation} from '../../api/organisation/types';
import {IPagination} from '../../api/types';
import {addAxiosErrorNotification, successNotification} from '../../utils/notification';

class OrganisationStore {
  organisations: IOrganisation[] = [];
  isOpenAddOrganisation = false;
  totalOrgs = 0;
  page = 1;
  size = 10;
  isOpenGroupChangeModal = false;
  singleOrganisation: IOrganisation | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  getOrganisation = (params: IPagination) =>
    organisationApi.getOrganisation(params)
      .then(res => {
        if (res) {
          this.setOrganisation(res?.orgList);
          this.setTotalOrg(res?.count);
        }

        return res;
      })
      .catch(addAxiosErrorNotification);

  addOrganisation = (params: IAddOrganization) =>
    organisationApi.addOrganisation(params)
      .then(res => {
        if (res) {
          successNotification('Success add new organisation');
          this.getOrganisation({
            page: this.page,
            size: this.size,
          });
        }

        return res;
      })
      .catch(addAxiosErrorNotification);

  organisationGroupChange = (params: IChangeGroup) =>
    organisationApi.organisationGroupChange(params)
      .then(res => {
        if (res) {
          successNotification('Success change group');
          this.getOrganisation({
            page: this.page,
            size: this.size,
          });
        }

        return res;
      })
      .catch(addAxiosErrorNotification);

  setOrganisation = (organisation: IOrganisation[]) => {
    this.organisations = organisation;
  };

  setIsOpenAddOrganisation = (isOpen: boolean) => {
    this.isOpenAddOrganisation = isOpen;
  };

  setTotalOrg = (total: number) => {
    this.totalOrgs = total;
  };

  setPage = (page: number) => {
    this.page = page;
  };

  setSize = (size: number) => {
    this.size = size;
  };

  setIsOpenChangeGroupModal = (isOpen: boolean) => {
    this.isOpenGroupChangeModal = isOpen;
  };

  setSingleOrganisation = (singleOrganisation: IOrganisation | null) => {
    this.singleOrganisation = singleOrganisation;
  };

  reset() {
    this.organisations = [];
    this.isOpenAddOrganisation = false;
    this.totalOrgs = 0;
    this.page = 1;
    this.size = 10;
  }
}

export const organisationStore = new OrganisationStore();

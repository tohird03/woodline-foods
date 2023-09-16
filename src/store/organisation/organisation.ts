import {makeAutoObservable} from 'mobx';
import {organisationApi} from '../../api/organisation';
import {IOrganisation} from '../../api/organisation/types';
import {IPagination} from '../../api/types';
import {addAxiosErrorNotification, successNotification} from '../../utils/notification';

class OrganisationStore {
  organisations: IOrganisation[] = [];
  isOpenAddOrganisation = false;
  totalOrgs = 0;
  page = 1;
  size = 10;

  constructor() {
    makeAutoObservable(this);
  }

  getOrganisation = (params: IPagination) =>
    organisationApi.getOrganisation(params)
      .then(res => {
        if (res) {
          this.setOrganisation(res?.data);
          this.setTotalOrg(res?.totalOrgs);
        }

        return res;
      })
      .catch(addAxiosErrorNotification);

  addOrganisation = (params: string) =>
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

  reset() {
    this.organisations = [];
    this.isOpenAddOrganisation = false;
    this.totalOrgs = 0;
    this.page = 1;
    this.size = 10;
  }
}

export const organisationStore = new OrganisationStore();

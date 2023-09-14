import {makeAutoObservable} from 'mobx';
import {organisationApi} from '../../api/organisation';
import {IOrganisation} from '../../api/organisation/types';
import {IPagination} from '../../api/types';
import {addAxiosErrorNotification, successNotification} from '../../utils/notification';

class OrganisationStore {
  organisations: IOrganisation[] = [];
  isOpenAddOrganisation = false;

  constructor() {
    makeAutoObservable(this);
  }

  getOrganisation = (params: IPagination) =>
    organisationApi.getOrganisation(params)
      .then(res => {
        if (res) {
          this.setOrganisation(res?.data);
        }
      })
      .catch(addAxiosErrorNotification);

  addOrganisation = (params: string) =>
    organisationApi.addOrganisation(params)
      .then(res => {
        if (res) {
          successNotification('Success add new organisation');
          this.getOrganisation({
            page: 1,
            size: 10,
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

  reset() {
    this.organisations = [];
  }
}

export const organisationStore = new OrganisationStore();

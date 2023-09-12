import {makeAutoObservable} from 'mobx';
import {organisationApi} from '../../api/organisation';
import {IOrganisation} from '../../api/organisation/types';
import {IPagination} from '../../api/types';
import {addAxiosErrorNotification} from '../../utils/notification';

class OrganisationStore {
  organisations: IOrganisation[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  getOrganisation = (params: IPagination) =>
    organisationApi.getOrganisation(params)
      .then(res => {
        if (res) {
          this.setOrganisation(res);
        }
      })
      .catch(addAxiosErrorNotification);

  setOrganisation = (organisation: IOrganisation[]) => {
    this.organisations = organisation;
  };

  reset() {
    this.organisations = [];
  }
}

export const organisationStore = new OrganisationStore();

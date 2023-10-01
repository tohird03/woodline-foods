import {Endpoints} from '../endpoints';
import {Instance} from '../instance';
import {INetworkConfig, IPagination} from '../types';
import {IChangeGroup, IGetOrganisation, IOrganisation} from './types';

const config: INetworkConfig = {
  baseURL: Endpoints.Base,
};

class OrganisationApi extends Instance {
  constructor(config: INetworkConfig) {
    super(config);
  }

  getOrganisation = (params: IPagination): Promise<IGetOrganisation> =>
    this.get(Endpoints.Organisation, {params});

  addOrganisation = (params: string): Promise<IOrganisation> =>
    this.post(Endpoints.Organisation, {name_org: params});

  organisationGroupChange = (params: IChangeGroup): Promise<IOrganisation> =>
    this.patch(Endpoints.OrganisationGroup, params);
}

export const organisationApi = new OrganisationApi(config);

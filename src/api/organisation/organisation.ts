import {Endpoints} from '../endpoints';
import {Instance} from '../instance';
import {INetworkConfig, IPagination} from '../types';
import {IOrganisation} from './types';

const config: INetworkConfig = {
  baseURL: Endpoints.Base,
};

class OrganisationApi extends Instance {
  constructor(config: INetworkConfig) {
    super(config);
  }

  getOrganisation = (params: IPagination): Promise<IOrganisation[]> =>
    this.get(Endpoints.Organisation, {params});
}

export const organisationApi = new OrganisationApi(config);

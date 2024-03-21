import {Endpoints} from '../endpoints';
import {Instance} from '../instance';
import {INetworkConfig, IPagination} from '../types';
import {IAddOrganization, IChangeGroup, IGetOrganisation, IOrganisation} from './types';

const config: INetworkConfig = {
  baseURL: Endpoints.Base,
};

class OrganisationApi extends Instance {
  constructor(config: INetworkConfig) {
    super(config);
  }

  getOrganisation = (params: IPagination): Promise<IGetOrganisation> =>
    this.get(Endpoints.Organisation, {params});

  addOrganisation = (params: IAddOrganization): Promise<IOrganisation> =>
    this.post(Endpoints.Organisation, {
      name_org: params.name_org,
      group_a_id: params.group_a_id,
      group_b_id: params.group_b_id,
      trip_timeout: params.trip_timeout,
    });

  organisationGroupChange = (params: IChangeGroup): Promise<IOrganisation> =>
    this.patch(`${Endpoints.OrganisationGroup}/${params?.org}`, params);

  deleteOrganization = (id: string): Promise<IOrganisation> =>
    this.delete(`${Endpoints.OrganizationDelete}/${id}`);
}

export const organisationApi = new OrganisationApi(config);

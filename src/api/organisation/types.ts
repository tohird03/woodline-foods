export interface IGetOrganisation {
  data: IOrganisation[];
  totalOrgs: number;
}

export interface IOrganisation {
  _id: string;
  name_org: string;
  is_active: boolean;
  is_deleted: boolean;
  createdAt: string;
  group_a_id: number;
  group_b_id: number;
}

export enum Category {
  DRINKS = 'drinks',
  SNAKCS = 'snacks',
  DESSERT = 'dessert',
}

export interface IChangeGroupForm {
  group_a_id: string;
  group_b_id: string;
  trip_timeout?: number;
}

export interface IChangeGroup extends IChangeGroupForm {
  org: string;
}

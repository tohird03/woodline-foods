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
}

export enum Category {
  DRINKS = 'drinks',
  SNAKCS = 'snacks',
  DESSERT = 'dessert',
}

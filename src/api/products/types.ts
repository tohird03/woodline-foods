export interface IGetProducts {
  data: IProducts[];
  totalProducts: number;
}

export interface IProducts {
  _id: string;
  amount: number;
  name: string;
  min_amount: number;
  img: string;
  unit: string;
  org: {
    name_org: string;
  };
  createdAt: string;
  cost: number;
}

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


export interface IAddNewProduct {
  name: string;
  org: string;
  unit: string;
}

export enum Units {
  KILOGRAM = 'kilogram',
  LITR = 'litr',
  DONA = 'dona',
}

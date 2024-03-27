import {IPagination} from '../types';

export interface IGetProducts {
  productList: IProducts[];
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
  orgList: IOrganisation[];
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

export interface IEditProduct {
  name: string;
  unit: string;
  id: string;
}

export enum Units {
  KILOGRAM = 'kilogram',
  LITR = 'litr',
  DONA = 'dona',
}

export interface IAddAmountProduct {
  product: string;
  amount: number;
  type: boolean;
  cost: number;
}

export interface IGetProductsParams extends IPagination {
  search?: string;
}

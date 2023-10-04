import {IPagination} from '../types';

export interface IGetFoods {
  data: IFoods[];
  totalFoods: number;
}

export interface IFoods {
  _id: string;
  name: string;
  cost: number;
  products: IFoodsProducts[];
  org: string;
  category: string;
  createdAt: string;
  img: string;
}

export interface IFoodsProducts {
  _id: string;
  product: {
    _id: string;
    name: string;
    cost: number;
  };
  amount: number;
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


export interface IAddFoodParams {
  name: string;
  cost: number;
  products: IAddFoodProduct[];
  org: string;
  category: string;
}

export interface IAddFoodProduct {
  product: string;
  amount: number;
}

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

export interface IImgChange {
  food: string;
  image: string;
}

export interface IGetFoodsParams extends IPagination {
  search?: string;
}

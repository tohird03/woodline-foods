import {IPagination} from '../types';

export interface IGetFoods {
  foodList: IFoods[];
  totalFoods: number;
}

export interface IFoods {
  _id: string;
  name: string;
  cost: number;
  products: IFoodsProducts[];
  org: {
    name_org: string;
    _id: string;
  };
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
    _id: string;
    name_org: string;
  };
  createdAt: string;
  cost: number;
  is_deleted: boolean;
}

export interface IImgChange {
  food: string;
  image: string;
}

export interface IGetFoodsParams extends IPagination {
  search?: string;
}

export interface IChangeVerify {
  id: string;
  is_private: boolean;
}

export interface IGetOneFood {
  _id: string;
  name: string;
  cost: number;
  img: string;
  products: IGetOneFoodProduct[];
  org: {
    _id: string;
    name_org: string;
  };
}

export interface IGetOneFoodProduct {
  id?: string;
  product: {
    _id: string;
    name: string;
    cost: number;
  };
  amount: number;
  _id: string;
}


export interface IAddOneFoodProduct {
  id?: string;
  _id?: string;
  product: string;
  amount: number;
}

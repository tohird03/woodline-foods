export interface IGetLunchs {
  data: ILunchs[];
  totalLunchBases: number;
}

export interface ILunchs {
  _id: string;
  name: string;
  cost: number;
  org: ILunchOrg;
  base: {
    _id: string;
    name: string;
  };
  products: {
    product: {
      name: string;
      _id: string;
    };
    amount: number;
  }[];
}

export interface ILunchOrg {
  _id: string;
  name_org: string;
}

export interface IAddLunch {
  name: string;
  org: string;
}

export interface IAddLunchProducts {
  id: string;
  products: IAddFoodProduct[];
}

export interface IAddFoodProduct {
  product: string;
  amount: number;
}

export interface IGetLunchBase {
  _id: string;
  name: string;
  cost: number;
  percent_cook: number;
  products: IAddFoodProduct[];
  createdAt: string;
}

export interface IAddLunchBaseParams {
  id: string;
  name: string;
  cost: number;
  percent_cook: number;
  products: IAddFoodProduct[];
}

export interface IEditedLunchProducts {
  lunchId: string;
  products: {
    product: string;
    amount: number;
  }[];
}

export interface ILunchUpdate {
  name: string;
  cost: number;
  percent_cook: number;
  products: {
    product: string;
    amount: number;
  }[];
  id: string;
}

export interface IDeletLunchProducts {
  lunchId: string;
  productId: string;
}

export interface ILunchsProduct {
  _id: string;
  name: string;
  cost: number;
  products: {
    product: {
      name: string;
      _id: string;
    };
    amount: number;
  }[];
  percent_cook: number;
}

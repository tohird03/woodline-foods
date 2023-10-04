export interface IGetLunchs {
  data: ILunchs[];
  totalLunches: number;
}

export interface ILunchs {
  _id: string;
  name: string;
  cost: number;
  org: ILunchOrg;
}

export interface ILunchOrg {
  _id: string;
  name_org: string;
}

export interface IAddLunch {
  name: string;
  org: string;
  cost: number;
  products: IAddFoodProduct[];
}

export interface IAddFoodProduct {
  product: string;
  amount: number;
}

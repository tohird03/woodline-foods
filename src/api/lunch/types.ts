export interface IGetLunchs {
  data: ILunchs[];
  totalLunchBases: number;
}

export interface ILunchs {
  _id: string;
  name: string;
  cost: number;
  org: ILunchOrg;
  is_active: boolean;
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

export interface ILunchEdit {
  id?: string;
  name: string;
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

export interface IGetLunchList {
  lunchList: IGetLunchBase[];
}

export interface IGetLunchBaseListParams {
  id?: string | any;
  lunchbase: string;
}

export interface IGetLunchBase {
  _id: string;
  name: string;
  cost: number;
  percent_cook: number;
  is_active: boolean;
  products: IAddFoodProduct[];
  createdAt: string;
}

export interface IChangeVerify {
  _id?: string;
  id?: string;
  is_active: boolean;
}

export interface IAddLunchBaseParams {
  id?: string;
  lunchbase: string;
  name: string;
  cost: number;
  org: string;
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
  cost?: number;
  percent_cook?: number;
  lunchbase?: string;
  org?: string;
  products?: {
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
  cost?: number;
  org?: string;
  products?: {
    product: {
      name: string;
      _id: string;
    };
    amount: number;
  }[];
}


// "_id": "65e67d344fc3b0e4c08f4963",
// "name": "0.5 osh",
// "cost": 4500,
// "base": "65e67ca04fc3b0e4c08f4944",
// "org": {
//     "_id": "65e67c164fc3b0e4c08f4924",
//     "name_org": "O'rtasaroy"
// },
// "percent_cook": 0,
// "is_active": true,
// "products": []

export interface IGetOneLunch {
  name: string;
  org: {
    _id: string;
    name_org: string;
  };
  products: IGetOneLunchProducts[];
}

export interface IGetOneLunchProducts {
  _id: string;
  id?: string;
  product: {
    name: string;
    _id: string;
  };
  amount: number;
}


export interface IAddOneLunchProduct {
  id?: string;
  _id?: string;
  product: string;
  amount: number;
}

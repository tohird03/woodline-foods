export interface IGetHistory {
  data: IHistory[];
  totalTrips: number;
}

export interface IHistory {
  _id: string;
  meal: {
    _id: string;
    name: string;
    cost: number;
  };
  org: {
    _id: string;
    name_org: string;
  };
  createdAt: string;
  candidates: IHistoryUsers[];
}

export interface IHistoryUsers {
  lunch: {
    _id: string;
    name: string;
    cost: string;
  };
  total: number;
  user: {
    _id: string;
    last_name: string;
    first_name: string;
    phone_number: string;
  };
  _id: string;
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

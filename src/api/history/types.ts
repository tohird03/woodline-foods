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
  agree_users: IHistoryUsers[];
  disagree_users: IHistoryUsers[];
}

export interface IHistoryUsers {
  _id: string;
  last_name: string;
  first_name: string;
  phone_number: string;
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

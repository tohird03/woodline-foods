export interface IGetOrder {
  data: IOrder[];
  totalOrders: number;
}

export interface IOrder {
  _id: string;
  total_cost: number;
  client: IOrderClient;
  foods: IOrderFoods[];
  is_canceled: boolean;
  is_accepted: boolean;
  org: IOrderOrganisation;
  createdAt: string;
  status: IOrderStatus;
}

export interface IOrderClient {
  _id: string;
  first_name: string;
  last_name: string;
}

export interface IOrderFoods {
  _id: string;
  food: {
    _id: string;
    name: string;
    cost: number;
  };
  amount: number;
}

export interface IOrderOrganisation {
  _id: string;
  name_org: string;
}

export enum IOrderStatus {
  PENDING = 'pending',
  CANCELED = 'canceled',
  ACCEPTED = 'accepted',
}


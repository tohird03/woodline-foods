import {IPagination} from '../types';

export interface IGetUser {
  userList: IUsers[];
  totalUsers: number;
}

export interface IDeleteUser {
  userId: string | null;
}

export interface IUserParams extends IPagination {
  search?: string;
}

export interface IUsers {
  _id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  balance: number;
  telegram_id: number;
  is_active: boolean;
  is_verified: boolean;
  roles: IUserRole[];
  language_code: string;
  createdAt: string;
  org: IUserOrg;
}

export interface IUserOrg {
  _id: string;
  name_org: string;
}

export interface IChangeStatus {
  id: string;
  is_active: boolean;
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

export interface IChangeOrganisation {
  user: string;
  org: string;
  first_name: string;
  last_name: string;
}

export enum TransactionType {
  ADD = 'ADD',
  SUBTRACT = 'SUBTRACT',
}

export interface TransactionParams {
  amount: number;
  user: string;
  type: boolean;
}

export interface IChangeRole {
  user: string;
  role: IUserRole;
  type: boolean;
}

export enum IUserRole {
  User = 'user',
  Cook = 'cook',
}

export interface IUserOrders extends IPagination {
  id: string;
}

export interface IOrdersUsers {
  data: IGetUserOrders[];
  totalOrders: number;
}

export interface IGetUserOrders {
  _id: string;
  total_cost: number;
  client: {
    _id: string;
    first_name: string;
    last_name: string;
  };
  foods: IUserOrdersFoods[];
  is_canceled: boolean;
  is_accepted: boolean;
  org: IUserOrg;
  createdAt: string;
  status: IUserOrderStatus;
}

export interface IUserOrdersFoods {
  _id: string;
  food: {
    _id: string;
    name: string;
    cost: string;
  };
  amount: number;
}

export enum IUserOrderStatus {
  PENDING = 'pending',
  CANCELED = 'canceled',
  ACCEPTED = 'accepted',
}

export interface IUserAnaliticParams {
  user: string;
  start?: string;
  end?: string;
  org?: string;
}

export enum IUserAnaliticType {
  Day = 'day',
  Week = 'week',
  Month = 'month',
}

export interface IUserAnaliticData {
  user: IAnaliticUser;
  data: {
    label: string;
    data: number;
  }[];
}

export interface IAnaliticUser {
  id: string;
  fullName: string;
  phoneNumber: string;
}

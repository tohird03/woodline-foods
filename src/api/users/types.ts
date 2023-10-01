import {IPagination} from '../types';

export interface IGetUser {
  data: IUsers[];
  totalUsers: number;
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
  org: {
    _id: string;
    name_org: string;
  };
}

export interface IChangeStatus {
  id: string;
  is_active: boolean;
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

export interface IChangeOrganisation {
  user: string;
  org: string;
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

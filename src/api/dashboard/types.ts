import { IPagination } from '../types';

export enum AnalyticsType {
  Trade = 1,
  Cost = 2,
  Benefit = 3,
}

export enum FilterTime {
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
  YEAR = 'year',
}
export const localizedStrings = {
  [FilterTime.DAY]: 'dashboardFilterByDay',
  [FilterTime.WEEK]: 'dashboardFilterByWeek',
  [FilterTime.MONTH]: 'dashboardFilterByMonth',
  [FilterTime.YEAR]: 'dashboardFilterByYear',
};

export interface IDailyProductsSum {
  today: IProductSum;
  yesterday: IProductSum;
}

export interface IProductSum {
  date: string;
  income: number;
  expense: number;
}

export interface IUsersDailyProductsSum {
  today: IUsersProductSum;
  yesterday: IUsersProductSum;
}

export interface IUsersProductSum {
  date: string;
  payment: number;
  expence: number;
}

export interface IProductAnalitic {
  _id: string;
  name: string;
  amount: number;
  cost: number;
  unit: string;
  org: string;
  createdAt: string;
}

export interface IProductAnaliticParams {
  type: EAnaliticType;
  startDate?: string;
  endDate?: string;
  org?: string;
}

export interface IUsersAnaliticData {
  totalCount: number;
  orders: IUsersAnalitic[];
}

export interface IUsersAnalitic {
  _id: string;
  total_cost: number;
  createdAt: string;
  clientDetails: {
    first_name: string;
    last_name: string;
    phone_number: string;
  };
}

export interface IUsersAnaliticParams {
  type: EAnaliticType;
  startDate?: string;
  endDate?: string;
  pageSize?: number;
  pageNumber?: number;
  org?: string;
  userId?: string;
}

export enum EAnaliticType {
  Income = 'income',
  Expense = 'expense',
}

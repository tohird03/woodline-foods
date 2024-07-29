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


export interface IProductAnalitic {
  _id: string;
}

export interface IProductAnaliticParams {
  type: EAnaliticType;
  startDate?: string;
  endDate?: string;
  org?: string;
}

export enum EAnaliticType {
  Income = 'income',
  Expense = 'expense',
}

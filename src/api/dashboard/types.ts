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

import {AnalyticsType} from '../../api/dashboard/types';

export const DashboardTabs = [
  {
    label: 'dashboardTotalTrade',
    labelId: AnalyticsType.Trade,
  },
  {
    label: 'dashboardTotalCosts',
    labelId: AnalyticsType.Cost,
  },
  {
    label: 'dashboardTotalBenefit',
    labelId: AnalyticsType.Benefit,
  },
];

export const CHART_HEIGHT = 365;

export const CHART_COLOR: Record<AnalyticsType, string> = {
  [AnalyticsType.Trade]: 'rgb(255, 193, 7)',
  [AnalyticsType.Cost]: '#FF0000',
  [AnalyticsType.Benefit]: '#46923c',
};

export const CHART_DATA: Record<AnalyticsType, number[]> = {
  [AnalyticsType.Trade]: [67, 22, 55, 41, 27, 43, 67, 43, 21, 27, 43],
  [AnalyticsType.Cost]: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
  [AnalyticsType.Benefit]: [27, 43, 55, 41, 56, 44, 43, 21, 41, 67, 22],
};

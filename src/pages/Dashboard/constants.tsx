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

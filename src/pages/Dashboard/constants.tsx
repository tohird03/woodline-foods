import React from 'react';
import {DollarOutlined, OrderedListOutlined, PicCenterOutlined, TransactionOutlined} from '@ant-design/icons';
import {AnalyticsType} from '../../api/dashboard/types';
import {CardStatistics} from './CardStatistics';
import {LineStatistics} from './LineStatistics';

export const DashboardTabs = [
  {
    label: 'dashboardCardStatistics',
    labelId: 0,
    tab: <CardStatistics />,
    icon: <PicCenterOutlined />,
  },
  {
    label: 'dashboardTotalTrade',
    labelId: AnalyticsType.Trade,
    tab: <LineStatistics />,
    icon: <TransactionOutlined />,
  },
  {
    label: 'dashboardTotalCosts',
    labelId: AnalyticsType.Cost,
    tab: <LineStatistics />,
    icon: <OrderedListOutlined />,
  },
  {
    label: 'dashboardTotalBenefit',
    labelId: AnalyticsType.Benefit,
    tab: <LineStatistics />,
    icon: <DollarOutlined />,
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

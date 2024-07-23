import React from 'react';
import {VerticalAlignBottomOutlined, VerticalAlignTopOutlined} from '@ant-design/icons';
import {EAnaliticType} from '../../../api/dashboard/types';
import {TableColumn} from '../../../components/table/types';
import {uszFormatPrice} from '../../../utils/formatTime';

export const analiticColumns: TableColumn[] = [
  {
    key: 'name',
    label: 'tableProductName',
    render: (value) => (value || '-'),
  },
  {
    key: 'org',
    label: 'tableProductOrganisation',
    render: (value, record) => (record?.org || '-'),
  },
  {
    key: 'amount',
    label: 'tableProductAmount',
    render: (value, record) => (`${record?.amount} ${record?.unit}` || '-'),
  },
  {
    key: 'cost',
    label: 'tableProductCost',
    render: (value) => (`${uszFormatPrice(parseInt(value, 10))} сум`),
  },
  {
    key: 'Итого',
    label: 'tableProductCost',
    render: (value, record) => (`${uszFormatPrice(record?.cost * record?.amount)} сум`),
  },
];

export const AnaliticTabs = [
  {
    label: 'Доход',
    labelId: EAnaliticType.Income,
    icon: <VerticalAlignBottomOutlined />,
  },
  {
    label: 'dashboardTotalTrade',
    labelId: EAnaliticType.Expense,
    icon: <VerticalAlignTopOutlined />,
  },
];

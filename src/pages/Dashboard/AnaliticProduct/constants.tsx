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
    label: 'Итоговая цена',
    render: (value, record) => (`${uszFormatPrice(record?.cost * record?.amount)} сум`),
  },
];

export const AnaliticTabs = [
  {
    label: 'Приход',
    labelId: EAnaliticType.Expense,
    icon: <VerticalAlignBottomOutlined />,
  },
  {
    label: 'Расходы',
    labelId: EAnaliticType.Income,
    icon: <VerticalAlignTopOutlined />,
  },
];

import React from 'react';
import {VerticalAlignBottomOutlined, VerticalAlignTopOutlined} from '@ant-design/icons';
import {EAnaliticType} from '../../../api/dashboard/types';
import {TableColumn} from '../../../components/table/types';
import {getFullDateFormat, getPaymentDate, uszFormatPrice} from '../../../utils/formatTime';

export const analiticColumns: TableColumn[] = [
  {
    key: 'name',
    label: 'Пользователь',
    render: (value, record) => `${record?.clientDetails?.first_name} ${record?.clientDetails?.last_name}`,
  },
  {
    key: 'phone',
    label: 'Телефон',
    render: (value, record) => (record?.clientDetails?.phone_number || '-'),
  },
  {
    key: 'cost',
    label: 'tableProductCost',
    render: (value, record) => (`${uszFormatPrice(parseInt(record?.total_cost, 10))} сум`),
  },
  {
    key: 'createdAt',
    label: 'tableProductCost',
    render: (value, record) => getPaymentDate(record?.createdAt, -5),
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

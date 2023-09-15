import React from 'react';
import {sentenceCase} from 'change-case';
import Label from '../../components/label';
import {TableColumn} from '../../components/table/types';
import {getPaymentDate, uszFormatPrice} from '../../utils/formatTime';

export const ordersColumn: TableColumn[] = [
  {
    key: 'client',
    label: 'Пользователь',
    render: (value, record) => (record?.client?.first_name || '-'),
  },
  {
    key: 'foods',
    label: 'Заказ',
    render: (value, record) => (record?.foods[0]?.amount || '-'),
  },
  {
    key: 'total_cost',
    label: 'Итоговая цена',
    render: (value) => (`${uszFormatPrice(parseInt(value, 10))} сум`),
  },
  {
    key: 'createdAt',
    label: 'Created at',
    render: (value) => (getPaymentDate(value)),
  },
  {
    key: 'is_accepted',
    label: 'Положение дел',
    render: (value) => (
      <Label color={value ? 'success' : 'error'} variant={'outlined'}>
        {sentenceCase(value ? 'Accepted' : 'Dont Accepted')}
      </Label>
    ),
  },
];

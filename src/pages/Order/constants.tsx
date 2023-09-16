import React from 'react';
import {sentenceCase} from 'change-case';
import Label from '../../components/label';
import {TableColumn} from '../../components/table/types';
import {getPaymentDate, uszFormatPrice} from '../../utils/formatTime';
import {OrderProduct} from './OrderProduct';

export const ordersColumn: TableColumn[] = [
  {
    key: 'client',
    label: 'tableOrderUser',
    render: (value, record) => (record?.client?.first_name || '-'),
  },
  {
    key: 'foods',
    label: 'tableOrderOrder',
    render: (value, record) => (
      <OrderProduct foods={record?.foods} />
    ),
  },
  {
    key: 'total_cost',
    label: 'tableOrderPrice',
    render: (value) => (`${uszFormatPrice(parseInt(value, 10))} сум`),
  },
  {
    key: 'createdAt',
    label: 'tableOrderCreatedAt',
    render: (value) => (getPaymentDate(value)),
  },
  {
    key: 'is_accepted',
    label: 'tableOrderStatus',
    render: (value) => (
      <Label color={value ? 'success' : 'error'} variant={'outlined'}>
        {sentenceCase(value ? 'Accepted' : 'Dont Accepted')}
      </Label>
    ),
  },
];

export const orderFoodsColumns: TableColumn[] = [
  {
    key: 'index',
    label: '#',
    render: (value, record, index) => (index + 1),
  },
  {
    key: 'name',
    label: 'Name',
    render: (value, record) => (record?.food?.name || '-'),
  },
  {
    key: 'amount',
    label: 'Amount',
    render: (value) => (value),
  },
  {
    key: 'cost',
    label: 'Cost',
    render: (value, record) => (record?.food?.cost),
  },
];

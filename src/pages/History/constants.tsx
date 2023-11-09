import React from 'react';
import {IHistoryUsers} from '../../api/history/types';
import {TableColumn} from '../../components/table/types';
import {getFullDateFormat, uszFormatPrice} from '../../utils/formatTime';
import {Users} from './Users';

export const historyColumns: TableColumn[] = [
  {
    key: 'name',
    label: 'tableHistoryMeal',
    render: (value, record) => (record?.meal?.name || '-'),
  },
  {
    key: 'cost',
    label: 'tableProductCost',
    render: (value, record) => (`${uszFormatPrice(parseInt(record?.meal?.cost || 0, 10))} сум` || '-'),
  },
  {
    key: 'agree',
    label: 'tableHistoryAgreeUsers',
    render: (value, record) => <Users users={record?.candidates as IHistoryUsers[]} type />,
  },
  {
    key: 'org',
    label: 'tableUserOrganisation',
    render: (value, record) => (record?.org?.name_org || '-'),
  },
  {
    key: 'createdAt',
    label: 'tableProductDate',
    render: (value) => (getFullDateFormat(value)),
  },
];

export const usersColumns: TableColumn[] = [
  {
    key: 'first_name',
    label: 'tableUserName',
    render: (value, record) => (record?.user?.first_name || '-'),
  },
  {
    key: 'last_name',
    label: 'tableUserSurname',
    render: (value, record) => (record?.user?.last_name || '-'),
  },
  {
    key: 'phone_number',
    label: 'tableUserPhoneNumber',
    render: (value, record) => (record?.user?.phone_number || '-'),
  },
  {
    key: 'lunch',
    label: 'lunch',
    render: (value, record) => (record?.lunch?.name || '-'),
  },
  {
    key: 'cost',
    label: 'tableFoodCost',
    render: (value, record) => (record?.lunch?.cost),
  },
];

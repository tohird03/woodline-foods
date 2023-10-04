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
    render: (value, record) => <Users users={record?.agree_users as IHistoryUsers[]} type />,
  },
  {
    key: 'disagree',
    label: 'tableHistoryDisagreeUsers',
    render: (value, record) => <Users users={record?.disagree_users as IHistoryUsers[]} />,
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
    render: (value) => (value || '-'),
  },
  {
    key: 'last_name',
    label: 'tableUserSurname',
    render: (value) => (value || '-'),
  },
  {
    key: 'phone_number',
    label: 'tableUserPhoneNumber',
    render: (value) => (value || '-'),
  },
];

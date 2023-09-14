import React from 'react';
import {sentenceCase} from 'change-case';
import {IUsers} from '../../api/users/types';
import Label from '../../components/label';
import {TableColumn} from '../../components/table/types';
import {UserStatusChange} from './UserStatusChange';

export const usersColumns: TableColumn[] = [
  {
    key: 'first_name',
    label: 'Name',
    render: (value) => (value || '-'),
  },
  {
    key: 'last_name',
    label: 'Surname',
    render: (value) => (value || '-'),
  },
  {
    key: 'telegram_id',
    label: 'Telegram ID',
    render: (value) => (value || '-'),
  },
  {
    key: 'balance',
    label: 'Balance',
  },
  {
    key: 'phone_number',
    label: 'Phone number',
    render: (value) => (value || '-'),
  },
  {
    key: 'org',
    label: 'Organisation',
    render: (value, record) => (record?.org?.name_org || '-'),
  },
  {
    key: 'is_verified',
    label: 'Verified',
    render: (value) => (
      <Label color={value ? 'success' : 'error'} variant={'outlined'}>
        {sentenceCase(value ? 'Verify' : 'Not Verify')}
      </Label>
    ),
  },
  {
    key: 'is_active',
    label: 'Изменить статус',
    render: (value, record) => (
      <UserStatusChange user={record as IUsers} />
    ),
  },
];

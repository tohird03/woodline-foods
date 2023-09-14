import React from 'react';
import {sentenceCase} from 'change-case';
import Label from '../../components/label';
import {TableColumn} from '../../components/table/types';

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
];

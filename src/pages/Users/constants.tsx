import React from 'react';
import {IUsers} from '../../api/users/types';
import {TableColumn} from '../../components/table/types';
import {AddBalance} from './AddBalance';
import {ChangeOrganisation} from './ChangeOrganisation';
import {ChangeVerify} from './ChangeVerify';
import {UserStatusChange} from './UserStatusChange';

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
    key: 'telegram_id',
    label: 'tableUserTelegramId',
    render: (value) => (value || '-'),
  },
  {
    key: 'balance',
    label: 'tableUserBalance',
  },
  {
    key: 'phone_number',
    label: 'tableUserPhoneNumber',
    render: (value) => (value || '-'),
  },
  {
    key: 'org',
    label: 'tableUserOrganisation',
    render: (value, record) => (record?.org?.name_org || '-'),
  },
  {
    key: 'is_verified',
    label: 'tableUserVerified',
    render: (value, record) => (<ChangeVerify user={record as IUsers} />),
  },
  {
    key: 'is_active',
    label: 'tableUserChangeActive',
    render: (value, record) => (
      <UserStatusChange user={record as IUsers} />
    ),
  },
  {
    key: 'is_active',
    label: 'tableUserChangeOrg',
    render: (value, record) => (
      <>
        <ChangeOrganisation user={record as IUsers} />
        <AddBalance user={record as IUsers} />
      </>
    ),
  },
];

import React from 'react';
import {Link} from 'react-router-dom';
import {Box} from '@mui/material';
import {AreaChartOutlined} from '@ant-design/icons';
import {IUsers} from '../../api/users/types';
import {TableColumn} from '../../components/table/types';
import {ROUTES} from '../../constants/router';
import {AddBalance} from './AddBalance';
import {ChangeOrganisation} from './ChangeOrganisation';
import {ChangeRole} from './ChangeRole';
import {ChangeVerify} from './ChangeVerify';
import {UsersStyles} from './styles';
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
      <Box sx={UsersStyles.tableActionBox}>
        <ChangeOrganisation user={record as IUsers} />
        <AddBalance user={record as IUsers} />
        <ChangeRole user={record as IUsers} />
        <Link style={{color: '#637381', fontSize: '20px'}} type="text" to={`${ROUTES.users}/${record?._id}`} >
          <AreaChartOutlined />
        </Link>
      </Box>
    ),
  },
];

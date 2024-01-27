import React from 'react';
import {MenuItem} from '@mui/material';
import {AdminRole} from '../../api/auth/types';
import {TableColumn} from '../../components/table/types';
import {getFullDateFormat} from '../../utils/formatTime';
import {EditAdmin} from './EditAdmin';

export const adminsColumns: TableColumn[] = [
  {
    key: 'fullname',
    label: 'tableUserName',
    render: (value) => (value || '-'),
  },
  {
    key: 'phone_number',
    label: 'tableUserPhoneNumber',
    render: (value) => (value || '-'),
  },
  {
    key: 'password',
    label: 'adminsPassword',
    render: (value) => (value || '-'),
  },
  {
    key: 'balance',
    label: 'dashboardFilterOrg',
    render: (value, record) => (record?.org?.name_org || '-'),
  },
  {
    key: 'createdAt',
    label: 'tableOrderCreatedAt',
    render: (value) => (getFullDateFormat(value) || '-'),
  },
  // {
  //   key: 'tableOrderActions',
  //   label: 'tableUserChangeOrg',
  //   render: () => (
  //     <>
  //       <EditAdmin />
  //     </>
  //   ),
  // },

];

export const roleOptions = [
  <MenuItem key={AdminRole.SUPER_ADMIN} value={AdminRole.SUPER_ADMIN}>
    {AdminRole.SUPER_ADMIN}
  </MenuItem>,
  <MenuItem key={AdminRole.STOREKEEPER} value={AdminRole.STOREKEEPER}>
    {AdminRole.STOREKEEPER}
  </MenuItem>,
  <MenuItem key={AdminRole.COOK} value={AdminRole.COOK}>
    {AdminRole.COOK}
  </MenuItem>,
];

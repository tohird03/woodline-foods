import React from 'react';
import {Link} from 'react-router-dom';
import {Box} from '@mui/material';
import {AreaChartOutlined} from '@ant-design/icons';
import {IUserOrderStatus, IUsers} from '../../api/users/types';
import Label, {LabelProps} from '../../components/label';
import {TableColumn} from '../../components/table/types';
import {ROUTES} from '../../constants/router';
import {getFullDateFormat, uszFormatPrice} from '../../utils/formatTime';
import {AddBalance} from './AddBalance';
import {ChangeOrganisation} from './ChangeOrganisation';
import {ChangeRole} from './ChangeRole';
import {ChangeVerify} from './ChangeVerify';
import {UsersStyles} from './styles';
import {OrderProduct} from './UserOrders/OrderProduct';
import {UserStatusChange} from './UserStatusChange';

export const usersColumns: TableColumn[] = [
  {
    key: 'first_name',
    label: 'tableUserName',
    render: (value, record) => (
      <Link style={UsersStyles.link} to={`/user-orders/${record?._id}`}>{value}</Link> || '-'),
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
    render: (value) => (value),
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

export const userOrdersColumns: TableColumn[] = [
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
    render: (value) => (getFullDateFormat(value)),
  },
  {
    key: 'status',
    label: 'tableOrderStatus',
    render: (value) => (
      <Label color={OrderStatusColor[value as IUserOrderStatus]} variant={'outlined'}>
        {value}
      </Label>
    ),
  },
];

export const OrderStatusColor: Record<IUserOrderStatus, LabelProps['color']> = {
  [IUserOrderStatus.ACCEPTED]: 'success',
  [IUserOrderStatus.CANCELED]: 'error',
  [IUserOrderStatus.PENDING]: 'primary',
};

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
    render: (value, record) => (`${uszFormatPrice(parseInt(record?.food?.cost, 10))} сум`),
  },
];

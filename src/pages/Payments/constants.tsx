import React from 'react';
import {Tag} from 'antd';
import {IPaymentUserRole} from '../../api/payment/types';
import Label from '../../components/label';
import {TableColumn} from '../../components/table/types';
import {priceFormat} from '../../utils/formatPrice';
import {getFullDateFormat} from '../../utils/formatTime';

export const paymentsColumns: TableColumn[] = [
  {
    key: 'user',
    label: 'user',
    render: (value, record) => (`${record?.client?.first_name} ${record?.client?.last_name}` || '-'),
  },
  {
    key: 'agree_users',
    label: 'tablePaymentRole',
    render: (value, record) => (
      <div>
        {record?.client?.roles?.map((role: IPaymentUserRole) => (
          <Tag key={role} color={role === IPaymentUserRole.User ? '#2db7f5' : '#00FF00'}>
            {role}
          </Tag>
        ))}
      </div>
    ),
  },
  {
    key: 'org',
    label: 'organisation',
    render: (value, record) => (record?.org?.name_org),
  },
  {
    key: 'amount',
    label: 'tablePaymentTransaction',
    render: (value, record) => (
      <Label
        color={record?.type ? 'success': 'error'}
        variant="outlined"
      >
        {`${record?.type ? '+' : '-'}${priceFormat(record?.amount)}сум`}
      </Label>
    ),
  },
  {
    key: 'createdAt',
    label: 'tableOrgCreatedAt',
    render: (value) => (getFullDateFormat(value)),
  },
];

import React from 'react';
import Label from '../../components/label';
import {TableColumn} from '../../components/table/types';
import {getFullDateFormat, uszFormatPrice} from '../../utils/formatTime';

export const productLogsColumns: TableColumn[] = [
  {
    key: 'name',
    label: 'tableProductName',
    render: (value, record) => (record?.product?.name || '-'),
  },
  {
    key: 'amount',
    label: 'tableProductAmount',
    render: (value, record) => (
      <Label
        color={record?.type ? 'success': 'error'}
        variant="outlined"
      >
        {`${record?.type ? '+' : '-'}${record?.amount} ${record?.product?.unit}`}
      </Label>
    ),
  },
  {
    key: 'cost',
    label: 'tableProductCost',
    render: (value) => (`${uszFormatPrice(parseInt(value, 10))} сум`),
  },
  {
    key: 'org',
    label: 'tableProductOrganisation',
    render: (value, record) => (record?.org?.name_org || '-'),
  },
  {
    key: 'createdAt',
    label: 'tableProductDate',
    render: (value) => (getFullDateFormat(value)),
  },
];

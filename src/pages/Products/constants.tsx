import React from 'react';
import {MenuItem} from '@mui/material';
import {Units} from '../../api/products/types';
import {TableColumn} from '../../components/table/types';
import {getPaymentDate, uszFormatPrice} from '../../utils/formatTime';

export const UnitOption = [
  <MenuItem key={Units.DONA} value={Units.DONA}>{Units.DONA}</MenuItem>,
  <MenuItem key={Units.KILOGRAM} value={Units.KILOGRAM}>{Units.KILOGRAM}</MenuItem>,
  <MenuItem key={Units.LITR} value={Units.LITR}>{Units.LITR}</MenuItem>,
];

export const productColumns: TableColumn[] = [
  {
    key: 'name',
    label: 'tableProductName',
    render: (value) => (value || '-'),
  },
  {
    key: 'amount',
    label: 'tableProductAmount',
    render: (value, record) => (`${record?.amount} ${record?.unit}` || '-'),
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
    render: (value) => (getPaymentDate(value)),
  },
];

export const MODAL_WIDTH = 400;

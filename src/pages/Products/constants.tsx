import React from 'react';
import {MenuItem} from '@mui/material';
import {Units} from '../../api/products/types';
import {TableColumn} from '../../components/table/types';


export const UnitOption = [
  <MenuItem key={Units.DONA} value={Units.DONA}>{Units.DONA}</MenuItem>,
  <MenuItem key={Units.KILOGRAM} value={Units.KILOGRAM}>{Units.KILOGRAM}</MenuItem>,
  <MenuItem key={Units.LITR} value={Units.LITR}>{Units.LITR}</MenuItem>,
];

export const productColumns: TableColumn[] = [
  {
    key: 'name',
    label: 'Name',
    render: (value) => (value || '-'),
  },
  {
    key: 'amount',
    label: 'Amount',
    render: (value) => (value),
  },
  {
    key: 'cost',
    label: 'Cost',
    render: (value, record) => (`${record?.cost} ${record?.unit}` || '-'),
  },
  {
    key: 'org',
    label: 'Organisation',
    render: (value, record) => (record?.org?.name_org || '-'),
  },
];

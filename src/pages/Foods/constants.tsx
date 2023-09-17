import React from 'react';
import {Avatar, MenuItem, Stack} from '@mui/material';
import {sentenceCase} from 'change-case';
import {Category} from '../../api/organisation/types';
import Label from '../../components/label';
import {TableColumn} from '../../components/table/types';
import {Products} from './Products';

export const CategoryOption = [
  <MenuItem key={Category.DESSERT} value={Category.DESSERT}>{Category.DESSERT}</MenuItem>,
  <MenuItem key={Category.DRINKS} value={Category.DRINKS}>{Category.DRINKS}</MenuItem>,
  <MenuItem key={Category.SNAKCS} value={Category.SNAKCS}>{Category.SNAKCS}</MenuItem>,
];

export const foodsColumns: TableColumn[] = [
  {
    key: 'img',
    label: 'tableFoodPhoto',
    align: 'center',
    render: (value) => (
      <Stack sx={{width: '100%'}} direction="row" alignItems="center" spacing={2}>
        <Avatar sx={{margin: '0 auto !important'}} alt={value} src={value} />
      </Stack>
    ),
  },
  {
    key: 'name',
    label: 'tableFoodName',
  },
  {
    key: 'org',
    label: 'tableFoodOrg',
    render: (value, record) => (
      record?.org?.name_org
    ),
  },
  {
    key: 'products',
    label: 'tableFoodProduct',
    render: (value, record) => <Products product={record?.products} />,
  },
  {
    key: 'cost',
    label: 'tableFoodCost',
  },
  {
    key: 'category',
    label: 'tableFoodCategory',
    render: (value) => (
      <Label color="success" variant={'outlined'}>
        {sentenceCase(value)}
      </Label>
    ),
  },
];

export const orderFoodsColumns: TableColumn[] = [
  {
    key: 'index',
    label: '#',
    render: (value, record, index) => (index + 1),
  },
  {
    key: 'name',
    label: 'Name',
    render: (value, record) => (record?.product?.name || '-'),
  },
  {
    key: 'amount',
    label: 'Amount',
    render: (value) => (value),
  },
  {
    key: 'cost',
    label: 'Cost',
    render: (value, record) => (`${record?.product?.cost} сум`),
  },
];

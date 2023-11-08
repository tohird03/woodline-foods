import React from 'react';
import {Link} from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import {TableColumn} from '../../components/table/types';
import {getFullDateFormat, uszFormatPrice} from '../../utils/formatTime';
import {Products} from './Products';

export const lunchColumns: TableColumn[] = [
  {
    key: 'name',
    label: 'tableUserName',
    render: (value, record) => (
      <Link
        style={{
          textDecoration: 'none',
          color: 'black',
          fontWeight: 'bold',
        }}
        to={`/lunch/${record?._id}`}
      >
        {value}
      </Link> || '-'),
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

export const lunchBaseColumns: TableColumn[] = [
  {
    key: 'name',
    label: 'tableUserName',
    render: (value) => value,
  },
  {
    key: 'cost',
    label: 'tableProductCost',
    render: (value) => (`${uszFormatPrice(parseInt(value, 10))} сум` || '-'),
  },
  {
    key: 'createdAt',
    label: 'tableProductDate',
    render: (value) => (getFullDateFormat(value)),
  },
  {
    key: 'percent_cook',
    label: 'tablePercentCook',
    render: (value) => `${value}%`,
  },
  {
    key: 'products',
    label: 'tableFoodProduct',
    render: (value, record) => <Products lunchId={record?._id} product={record?.products} />,
  },
  {
    key: 'action',
    label: 'tableUserChangeOrg',
    render: (value, record) => (
      <Link
        style={{
          textDecoration: 'none',
          color: 'black',
          fontWeight: 'bold',
        }}
        to={`/lunch/add/${record?._id}`}
      >
        <EditIcon />
      </Link> || '-'),
  },
];

export const ADD_LUNCH_MODAL_WIDTH = 400;

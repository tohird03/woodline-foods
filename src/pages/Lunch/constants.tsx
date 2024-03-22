import React from 'react';
import {Link} from 'react-router-dom';
import {IGetLunchBase, ILunchs, ILunchsProduct} from '../../api/lunch/types';
import {TableColumn} from '../../components/table/types';
import {getFullDateFormat, uszFormatPrice} from '../../utils/formatTime';
import {AddLunch} from './AddLunch';
import {LunchAction} from './LunchAction';
import {LunchStatusChangeIn} from './LunchBase/LunchStatusChange/LunchStatusChange';
import {LunchStatusChange} from './LunchStatusChange';
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
  {
    key: 'is_active',
    label: 'tableUserChangeActive',
    render: (value, record) => (
      <LunchStatusChange lunch={record as ILunchs} />
    ),
  },
  {
    key: 'action',
    label: 'Action',
    render: (value, record) => (
      <LunchAction lunch={record as ILunchs} />
    ),
  },
];

export const lunchBaseColumns: TableColumn[] = [
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
        to={`/lunch/product/${record?._id}`}
      >
        {value}
      </Link> || '-')},
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
  // {
  //   key: 'percent_cook',
  //   label: 'tablePercentCook',
  //   render: (value) => `${value}%`,
  // },
  {
    key: 'products',
    label: 'tableFoodProduct',
    render: (value, record) => <Products lunchId={record?._id} product={record?.products} />,
  },
  {
    key: 'is_active',
    label: 'tableUserChangeActive',
    render: (value, record) => (
      <LunchStatusChangeIn lunch={record as IGetLunchBase} />
    ),
  },
  {
    key: 'action',
    label: 'tableUserChangeOrg',
    render: (value, record) => <AddLunch lunch={record as ILunchsProduct} />},
];

export const ADD_LUNCH_MODAL_WIDTH = 400;

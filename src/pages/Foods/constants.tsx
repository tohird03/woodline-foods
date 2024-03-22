import React from 'react';
import {Link} from 'react-router-dom';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import {MenuItem} from '@mui/material';
import {Image} from 'antd';
import {IFoods, IProducts} from '../../api/foods/types';
import {Category} from '../../api/organisation/types';
import Label from '../../components/label';
import {TableColumn} from '../../components/table/types';
import {uszFormatPrice} from '../../utils/formatTime';
import {Action} from './Action';
import {Products} from './Products';
import {UserStatusChange} from './UserStatusChange';

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
      <Image
        style={{borderRadius: '50%'}}
        width={50} height={50}
        alt={value}
        src={value}
        preview={{
          forceRender: false,
          mask: <RemoveRedEyeOutlinedIcon fontSize="small" />,
        }}
      />
    ),
  },
  {
    key: 'name',
    label: 'tableFoodName',
    render: (value, record) => (
      <Link
        style={{
          textDecoration: 'none',
          color: 'black',
          fontWeight: 'bold',
        }}
        to={`/food/product/${record?._id}`}
      >
        {value}
      </Link> || '-'),
  },
  {
    key: 'org',
    label: 'tableFoodOrg',
    render: (value, record) => (
      record?.org
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
    render: (value, record) => <span>{`${uszFormatPrice(record?.cost)} сум`}</span>,
  },
  {
    key: 'category',
    label: 'tableFoodCategory',
    render: (value) => (
      <Label color="success" variant={'outlined'}>
        {value}
      </Label>
    ),
  },
  {
    key: 'is_active',
    label: 'tableUserChangeActive',
    render: (value, record) => (
      <UserStatusChange food={record as IProducts} />
    ),
  },
  {
    key: 'img',
    label: 'Action',
    render: (value, record) => <Action food={record as IFoods} />,
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

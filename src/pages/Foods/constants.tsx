import React from 'react';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import {MenuItem} from '@mui/material';
import {Image} from 'antd';
import {sentenceCase} from 'change-case';
import {Category} from '../../api/organisation/types';
import Label from '../../components/label';
import {TableColumn} from '../../components/table/types';
import {uszFormatPrice} from '../../utils/formatTime';
import {ImgUpload} from './ImgUpload';
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
    render: (value, record) => <span>{`${uszFormatPrice(record?.cost)} сум`}</span>,
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
  {
    key: 'img',
    label: 'Img Upload',
    render: (value, record) => <ImgUpload food={record?._id} />,
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

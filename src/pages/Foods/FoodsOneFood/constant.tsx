import React from 'react';
import {Link} from 'react-router-dom';
import {IAddOneFoodProduct, IGetOneFoodProduct} from '../../../api/foods/types';
import {TableColumn} from '../../../components/table/types';
import {OneFoodProductAction} from './FoodsOneFoodAction/FoodsOneFoodAction';

export const foodColumn: TableColumn[] = [
  {
    key: 'product',
    label: 'tableUserName',
    render: (value, record) => {
      if (Array?.isArray(record?.products)) {
        return record?.products?.map((product) =>
          product?.product?.name);
      }

      return '-';
    },
  },
  {
    key: 'amount',
    label: 'Amount',
    render: (value, record) => (record?.products?.amount || '-'),
  },
  {
    key: 'action',
    label: 'Action',
    render: (value, record) => <OneFoodProductAction product={record as IGetOneFoodProduct} />,
  },
];

export const ADD_LUNCH_MODAL_WIDTH = 400;


// import React from 'react';
// import {Link} from 'react-router-dom';
// import {TableColumn} from '../../../../components/table/types';

// export const lunchProductColumn: TableColumn[] = [
//   {
//     key: 'product',
//     label: 'tableUserName',
//     render: (value, record) => {
//       // Agar record va record.products mavjud bo'lsa, mahsulot nomlarini chiqaring
//       if (record && Array.isArray(record.products)) {
//         return record.products.map((productItem) => productItem.product.name).join(', ');
//       }

//       // Aks holda, placeholder chiqaring
//       return '-';
//     },
//   },
//   {
//     key: 'amount',
//     label: 'tableProductOrganisation',
//     render: (value, record) => {
//       if (record && Array.isArray(record.products)) {
//         return record.products.map((productItem) => productItem.amount).join(', ');
//       }

//       return '-';
//     },
//   },
// ];


// export const ADD_LUNCH_MODAL_WIDTH = 400;

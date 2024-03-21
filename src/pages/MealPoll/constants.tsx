import React from 'react';
import {Link} from 'react-router-dom';
import {TableColumn} from '../../components/table/types';
import {getFullDateFormat, uszFormatPrice} from '../../utils/formatTime';

export const mealPollColumns: TableColumn[] = [
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
        to={`/meal-poll/${record?._id}`}
      >
        {value}
      </Link> || '-'),
  },
  // {
  //   key: 'org',
  //   label: 'tableProductOrganisation',
  //   render: (value, record) => (record?.org?.name_org || '-'),
  // },
  {
    key: 'createdAt',
    label: 'tableProductDate',
    render: (value) => (getFullDateFormat(value) || '-'),
  },
  // {
  //   key: 'is_active',
  //   label: 'tableUserChangeActive',
  //   render: (value, record) => (
  //     <LunchStatusChange lunch={record as ILunchs} />
  //   ),
  // },
  // {
  //   key: 'action',
  //   label: 'Action',
  //   render: (value, record) => (
  //     <LunchAction lunch={record as ILunchs} />
  //   ),
  // },
];

export const ADD_LUNCH_MODAL_WIDTH = 400;

import {TableColumn} from '../../../../components/table/types';

export const lunchProductColumn: TableColumn[] = [
  {
    key: 'product',
    label: 'tableUserName',
    render: (value, record) => ('no' || '-'),

  },
  {
    key: 'amount',
    label: 'tableProductOrganisation',
    render: (value, record) => ('no' || '-'),
  },
];

export const ADD_LUNCH_MODAL_WIDTH = 400;

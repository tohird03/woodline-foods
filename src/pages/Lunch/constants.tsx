import {TableColumn} from '../../components/table/types';
import {getFullDateFormat, uszFormatPrice} from '../../utils/formatTime';

export const lunchColumns: TableColumn[] = [
  {
    key: 'name',
    label: 'tableUserName',
    render: (value) => (value || '-'),
  },
  {
    key: 'cost',
    label: 'tableProductCost',
    render: (value) => (`${uszFormatPrice(parseInt(value, 10))} сум` || '-'),
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

export const ADD_LUNCH_MODAL_WIDTH = 400;

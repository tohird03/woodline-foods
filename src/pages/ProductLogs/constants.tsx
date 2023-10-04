import {TableColumn} from '../../components/table/types';
import {getFullDateFormat, uszFormatPrice} from '../../utils/formatTime';

export const productLogsColumns: TableColumn[] = [
  {
    key: 'name',
    label: 'tableProductName',
    render: (value, record) => (record?.product?.name || '-'),
  },
  {
    key: 'amount',
    label: 'tableProductAmount',
    render: (value, record) => (`${record?.amount} ${record?.product?.unit}` || '-'),
  },
  {
    key: 'cost',
    label: 'tableProductCost',
    render: (value) => (`${uszFormatPrice(parseInt(value, 10))} сум`),
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

import {TableColumn} from '../../components/table/types';
import {getFullDateFormat} from '../../utils/formatTime';

export const adminsColumns: TableColumn[] = [
  {
    key: 'fullname',
    label: 'tableUserName',
    render: (value) => (value || '-'),
  },
  {
    key: 'phone_number',
    label: 'tableUserPhoneNumber',
    render: (value) => (value || '-'),
  },
  {
    key: 'password',
    label: 'adminsPassword',
    render: (value) => (value || '-'),
  },
  {
    key: 'balance',
    label: 'dashboardFilterOrg',
    render: (value, record) => (record?.org || '-'),
  },
  {
    key: 'createdAt',
    label: 'tableOrderCreatedAt',
    render: (value) => (getFullDateFormat(value) || '-'),
  },
];

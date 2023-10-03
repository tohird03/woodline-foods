import {TableColumn} from '../../components/table/types';

export const historyColumns: TableColumn[] = [
  {
    key: '_id',
    label: 'tableHistoryMeal',
    render: (value, record) => (record?.meal?.name || '-'),
  },
  {
    key: 'id',
    label: 'tableHistoryAgreeUsers',
    render: (value) => (value || 0),
  },
  {
    key: 'id',
    label: 'tableHistoryDisagreeUsers',
    render: (value) => (value || 0),
  },
  {
    key: 'org',
    label: 'tableUserOrganisation',
    render: (value, record) => (record?.org?.name_org || '-'),
  },
];

import {TableColumn} from '../../components/table/types';

export const historyColumns: TableColumn[] = [
  {
    key: 'meal',
    label: 'tableHistoryMeal',
    render: (value) => (value || '-'),
  },
  {
    key: 'agree_users',
    label: 'tableHistoryAgreeUsers',
    render: (value) => (value || '-'),
  },
  {
    key: 'disagree_users',
    label: 'tableHistoryDisagreeUsers',
    render: (value) => (value || '-'),
  },
  {
    key: 'org',
    label: 'tableUserOrganisation',
    render: (value, record) => (record?.org?.name_org || '-'),
  },
];

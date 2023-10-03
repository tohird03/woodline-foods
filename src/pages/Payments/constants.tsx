import {TableColumn} from '../../components/table/types';

export const paymentsColumns: TableColumn[] = [
  {
    key: 'meal',
    label: 'tableHistoryMeal',
    render: (value, record) => (record?.meal?.name || '-'),
  },
  {
    key: 'agree_users',
    label: 'tableHistoryAgreeUsers',
    render: (value) => (value || 0),
  },
  {
    key: 'disagree_users',
    label: 'tableHistoryDisagreeUsers',
    render: (value) => (value || 0),
  },
  {
    key: 'org',
    label: 'tableUserOrganisation',
    render: (value, record) => (record?.org?.name_org || '-'),
  },
];

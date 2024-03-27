import React from 'react';
import {IOrganisation} from '../../api/organisation/types';
import Label from '../../components/label';
import {TableColumn} from '../../components/table/types';
import {getFullDateFormat} from '../../utils/formatTime';
import {ChangeGroup} from './ChangeGroup';
import {OrganizationAction} from './OrganizationAction/OrganizationAction';

export const organisationColumns: TableColumn[] = [
  {
    key: 'name_org',
    label: 'tableOrgName',
    render: (value) => (value || '-'),
  },
  {
    key: 'group_a_id',
    label: 'tableOrdGroupAId',
    render: (value) => (value || '-'),
  },
  {
    key: 'group_b_id',
    label: 'tableOrdGroupBId',
    render: (value) => (value || '-'),
  },
  {
    key: 'trip_timeout',
    label: 'tableOrgTripTimeOut',
    render: (value) => (`${value} min` || '-'),
  },
  {
    key: 'createdAt',
    label: 'tableOrgCreatedAt',
    render: (value) => (getFullDateFormat(value)),
  },
  {
    key: 'is_active',
    label: 'tableOrgStatus',
    render: (value) => (
      <Label color={value ? 'success' : 'error'} variant={'outlined'}>
        {value ? 'Active' : 'Not Active'}
      </Label>
    ),
  },
  {
    key: 'createdAt',
    label: 'tableOrdChangeGroup',
    render: (value, record) => <ChangeGroup organisation={record as IOrganisation} />,
  },
  {
    key: 'Action',
    label: 'Action',
    render: (value, record) => <OrganizationAction org={record as IOrganisation} />,
  },
];

export const MODAL_WIDTH = 400;

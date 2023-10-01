import React from 'react';
import {sentenceCase} from 'change-case';
import {IOrganisation} from '../../api/organisation/types';
import Label from '../../components/label';
import {TableColumn} from '../../components/table/types';
import {getFullDateFormat} from '../../utils/formatTime';
import {ChangeGroup} from './ChangeGroup';

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
    key: 'createdAt',
    label: 'tableOrgCreatedAt',
    render: (value) => (getFullDateFormat(value)),
  },
  {
    key: 'is_active',
    label: 'tableOrgStatus',
    render: (value) => (
      <Label color={value ? 'success' : 'error'} variant={'outlined'}>
        {sentenceCase(value ? 'Active' : 'Not Active')}
      </Label>
    ),
  },
  {
    key: 'createdAt',
    label: 'tableOrdChangeGroup',
    render: (value, record) => <ChangeGroup organisation={record as IOrganisation} />,
  },
];

export const MODAL_WIDTH = 400;

import React from 'react';
import {sentenceCase} from 'change-case';
import Label from '../../components/label';
import {TableColumn} from '../../components/table/types';
import {getFullDateFormat} from '../../utils/formatTime';

export const organisationColumns: TableColumn[] = [
  {
    key: 'name_org',
    label: 'tableOrgName',
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
];

export const MODAL_WIDTH = 400;

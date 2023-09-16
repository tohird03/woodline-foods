import React from 'react';
import {sentenceCase} from 'change-case';
import Label from '../../components/label';
import {TableColumn} from '../../components/table/types';
import {getPaymentDate} from '../../utils/formatTime';

const CREATED_TIME_ZONE = -5;

export const organisationColumns: TableColumn[] = [
  {
    key: 'name_org',
    label: 'tableOrgName',
    render: (value) => (value || '-'),
  },
  {
    key: 'createdAt',
    label: 'tableOrgCreatedAt',
    render: (value) => (getPaymentDate(value, CREATED_TIME_ZONE)),
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

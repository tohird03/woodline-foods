import React from 'react';
import {useTranslation} from 'react-i18next';
import {TableCell, TableHead as MuiTableHead, TableRow, TableSortLabel} from '@mui/material';
import {ITableHead, TableColumn} from '../types';

export const TableHead = ({columns = []}: ITableHead) => {
  const {t} = useTranslation();

  return (
    <MuiTableHead>
      <TableRow>
        {columns.map((headCell: TableColumn) => (
          <TableCell
            key={headCell.key}
            align={headCell.align || 'center'}
          >
            <TableSortLabel hideSortIcon>
              {t(headCell.label as string)}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </MuiTableHead>
  );
};

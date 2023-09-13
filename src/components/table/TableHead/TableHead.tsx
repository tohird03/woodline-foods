import React from 'react';
import {TableCell, TableHead as MuiTableHead, TableRow, TableSortLabel} from '@mui/material';
import {ITableHead, TableColumn} from '../types';

export const TableHead = ({columns = []}: ITableHead) => (
  <MuiTableHead>
    <TableRow>
      {columns.map((headCell: TableColumn) => (
        <TableCell
          key={headCell.key}
          align={headCell.align || 'center'}
        >
          <TableSortLabel hideSortIcon>
            {headCell.label}
          </TableSortLabel>
        </TableCell>
      ))}
    </TableRow>
  </MuiTableHead>
);

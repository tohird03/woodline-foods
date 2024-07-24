import React from 'react';
import {TableBody as MuiTableBody, TableCell, TableRow} from '@mui/material';
import {ITableBody, TableColumn} from '../types';

export const TableBody = ({data, columns, sx}: ITableBody) => (
  <MuiTableBody sx={sx}>
    {data?.map((row: any, indexRow: number) => (
      <TableRow
        hover
        key={`${row?._id}-${indexRow + 1}`}
        tabIndex={-1}
        role="checkbox"
      >
        {columns?.map((column: TableColumn, index: number) => (
          <TableCell
            key={`${row?.id}-${index + 1}`}
            align={column?.align || 'center'}
            component="th"
            scope="row"
          >
            {column.render ? column.render(row[column.key], row, index) : row[column.key]}
          </TableCell>
        ))}
      </TableRow>
    ))}
  </MuiTableBody>
);

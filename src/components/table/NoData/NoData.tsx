import React from 'react';
import {Paper, TableBody, TableCell, TableRow} from '@mui/material';
import {Empty} from 'antd';
import {TableColumn} from '../types';

type Props = {
  column: TableColumn[];
};

export const NoData = ({column}: Props) => (
  <TableBody>
    <TableRow>
      <TableCell align="center" colSpan={column?.length} sx={{py: 4}}>
        <Paper sx={{textAlign: 'center'}}>
          <Empty />
        </Paper>
      </TableCell>
    </TableRow>
  </TableBody>
);

import React from 'react';
import DoNotDisturbAltOutlinedIcon from '@mui/icons-material/DoNotDisturbAltOutlined';
import {Paper, TableBody, TableCell, TableRow, Typography} from '@mui/material';
import {TableColumn} from '../types';

type Props = {
  column: TableColumn[];
};

export const NoData = ({column}: Props) => (
  <TableBody>
    <TableRow>
      <TableCell align="center" colSpan={column?.length} sx={{py: 4}}>
        <Paper
          sx={{
            textAlign: 'center',
          }}
        >
          <DoNotDisturbAltOutlinedIcon />

          <Typography variant="body2">
            Not Found Data
          </Typography>
        </Paper>
      </TableCell>
    </TableRow>
  </TableBody>
);

import React from 'react';
import DoNotDisturbAltOutlinedIcon from '@mui/icons-material/DoNotDisturbAltOutlined';
import {Paper, TableBody, TableCell, TableRow, Typography} from '@mui/material';

export const NoData = () => (
  <TableBody>
    <TableRow>
      <TableCell align="center" colSpan={6} sx={{py: 3}}>
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

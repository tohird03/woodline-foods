import './loading.scss';

import React from 'react';
import {Box, CircularProgress} from '@mui/material';

export const Loading = () => (
  <Box className="loader">
    <Box className="loader__img-wrapper">
      <CircularProgress color="inherit" />
    </Box>
  </Box>
);

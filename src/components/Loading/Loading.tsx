import './loading.scss';

import React from 'react';
import {Box} from '@mui/material';
// @ts-ignore
import LoadingImg from '../../assets/img/loading.png';

export const Loading = () => (
  <Box className="loader">
    <Box className="loader__img-wrapper">
      <img width={200} src={LoadingImg} alt="Loading" />
    </Box>
  </Box>
);

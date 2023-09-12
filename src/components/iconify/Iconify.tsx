import React, {forwardRef, Ref} from 'react';
import {Box, BoxProps} from '@mui/material';
import {Icon} from '@iconify/react';

interface IconifyProps extends BoxProps {
  icon: string;
  width?: number | string;
}

const Iconify = forwardRef(function(
  {icon, width = 20, sx, ...other}: IconifyProps,
  ref: Ref<HTMLDivElement>
) {
  return (
    <Box
      ref={ref}
      component={Icon}
      icon={icon}
      sx={{width, height: width, ...sx}}
      {...other}
    />
  );
});

export default Iconify;

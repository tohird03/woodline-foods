import React, {forwardRef, ReactNode, Ref} from 'react';
import {Box, BoxProps} from '@mui/material';
import {Theme, useTheme} from '@mui/material/styles';
import {StyledLabel} from './styles';

interface LabelProps extends BoxProps {
  children: ReactNode;
  color?: 'default' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';
  variant?: 'filled' | 'outlined' | 'ghost' | 'soft';
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

const Label = forwardRef(function(
  {children, color = 'default', variant = 'soft', startIcon, endIcon, sx, ...other}: LabelProps,
  ref: Ref<HTMLSpanElement>
) {
  const theme = useTheme() as Theme;

  const iconStyle = {
    width: 16,
    height: 16,
    '& svg, img': {width: 1, height: 1, objectFit: 'cover'},
  };

  return (
    <StyledLabel
      ref={ref}
      component="span"
      ownerState={{color, variant}}
      sx={{
        ...(startIcon && {pl: 0.75}),
        ...(endIcon && {pr: 0.75}),
        ...sx,
      }}
      theme={theme}
      {...other}
    >
      {startIcon && <Box sx={{mr: 0.75, ...iconStyle}}>{startIcon}</Box>}

      {children}

      {endIcon && <Box sx={{ml: 0.75, ...iconStyle}}>{endIcon}</Box>}
    </StyledLabel>
  );
});

export default Label;

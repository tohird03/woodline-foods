import React from 'react';
import {ListItemButton, ListItemIcon} from '@mui/material';
import {styled} from '@mui/material/styles';

export const StyledNavItem = styled((props) => <ListItemButton disableGutters {...props} />)(({theme}) => ({
  ...theme.typography.body2,
  height: 48,
  position: 'relative',
  textTransform: 'capitalize',
  borderRadius: theme.shape.borderRadius,
}));

export const StyledNavItemIcon = styled(ListItemIcon)({
  width: 22,
  height: 22,
  color: 'inherit',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

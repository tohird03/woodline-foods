import React from 'react';
import {NavLink as RouterLink} from 'react-router-dom';
import {Box, List, ListItemText} from '@mui/material';
// @ts-ignore
import Logo from '../../assets/img/loading.png';
import {StyledNavItem, StyledNavItemIcon} from './styles';

// eslint-disable-next-line react/function-component-definition
export default function NavSection({data = [], ...other}: any) {
  return (
    <Box {...other}>
      <img style={{margin: '0 auto', objectFit: 'cover'}} height="100" width="150" src={Logo} />
      <List disablePadding sx={{p: 1}}>
        {data.map((item: any) => (
          <NavItem key={item.title} item={item} />
        ))}
      </List>
    </Box>
  );
}

const NavItem = ({item}: any) => {
  const {title, path, icon, info} = item;

  return (
    //@ts-ignore
    <StyledNavItem
      component={RouterLink}
      to={path}
      sx={{
        '&.active': {
          color: 'text.primary',
          bgcolor: 'action.selected',
          fontWeight: 'fontWeightBold',
        },
      }}
    >
      <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>

      <ListItemText disableTypography primary={title} />

      {info && info}
    </StyledNavItem>
  );
};

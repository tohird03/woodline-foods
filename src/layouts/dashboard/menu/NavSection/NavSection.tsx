import React from 'react';
import {useTranslation} from 'react-i18next';
import {NavLink as RouterLink} from 'react-router-dom';
import {Box, List, ListItemText} from '@mui/material';
// @ts-ignore
import Logo from '../../../../assets/img/loading.png';
import {navConfig} from '../constants';
import {navSectionStyles, StyledNavItem, StyledNavItemIcon} from './styles';

export const NavSection = ({...other}: any) => {
  const {t} = useTranslation();

  const translatedNavConfig = navConfig.map((item) => ({
    ...item,
    title: t(item.title),
  }));

  return (
    <Box {...other}>
      <img
        // @ts-ignore
        style={navSectionStyles.navLogo}
        height="100"
        width="150"
        src={Logo}
      />
      <List disablePadding sx={navSectionStyles.list}>
        {translatedNavConfig.map((item: any) => (
          <NavItem key={item.title} item={item} />
        ))}
      </List>
    </Box>
  );
};

const NavItem = ({item}: any) => {
  const {title, path, icon, info} = item;

  return (
    //@ts-ignore
    <StyledNavItem
      component={RouterLink}
      to={path}
      sx={navSectionStyles.styledNav}
    >
      <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>

      <ListItemText disableTypography primary={title} />

      {info && info}
    </StyledNavItem>
  );
};

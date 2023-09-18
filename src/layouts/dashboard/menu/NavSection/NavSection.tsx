import React from 'react';
import {useTranslation} from 'react-i18next';
import {NavLink as RouterLink} from 'react-router-dom';
import {Box, List, ListItemText} from '@mui/material';
import {AdminRole} from '../../../../api/auth/types';
// @ts-ignore
import Logo from '../../../../assets/img/loading.png';
import {ROUTES} from '../../../../constants/router';
import {useStores} from '../../../../store/store-context';
import {navConfig} from '../constants';
import {navSectionStyles, StyledNavItem, StyledNavItemIcon} from './styles';

export const NavSection = ({...other}: any) => {
  const {authStore} = useStores();
  const {t} = useTranslation();

  // MENU ROLE CHECKER
  const filteredNavConfig = navConfig.filter((item) => {
    if (authStore?.staffInfo?.admin?.role[0] === AdminRole.STOREKEEPER) {
      return item.path === ROUTES.product;
    } else if (authStore?.staffInfo?.admin?.role[0] === AdminRole.COOK) {
      return item.path === ROUTES.order || item.path === ROUTES.lunch;
    }

    return true;
  });

  if (filteredNavConfig.length === 0) {
    return null;
  }

  const translatedNavConfig = filteredNavConfig.map((item) => ({
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
          <NavItem key={item?.title} item={item} />
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

import React from 'react';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import GroupIcon from '@mui/icons-material/Group';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import SvgColor from '../../../components/svg-color';
import {ROUTES} from '../../../constants/router';

const icon = (name: string) =>
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{width: 1, height: 1}} />;

const navConfig: any[] = [
  {
    title: 'user',
    path: ROUTES.users,
    icon: <GroupIcon />,
  },
  {
    title: 'products',
    path: ROUTES.product,
    icon: icon('ic_cart'),
  },
  {
    title: 'foods',
    path: ROUTES.food,
    icon: <LocalDiningIcon />,
  },
  {
    title: 'Organisation',
    path: ROUTES.org,
    icon: <AccountTreeIcon />,
  },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic_disabled'),
  },
];

export default navConfig;

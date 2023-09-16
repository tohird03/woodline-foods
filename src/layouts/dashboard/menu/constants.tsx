import React from 'react';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import ReceiptLongSharpIcon from '@mui/icons-material/ReceiptLongSharp';
import SvgColor from '../../../components/svg-color';
import {ROUTES} from '../../../constants/router';

interface INavbarLinks {
  title: string;
  path: string;
  icon: React.ReactNode;
}

const icon = (name: string) =>
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{width: 1, height: 1}} />;

export const navConfig: INavbarLinks[] = [
  {
    title: 'home',
    path: ROUTES.home,
    icon: <DashboardIcon />,
  },
  {
    title: 'lunch',
    path: ROUTES.lunch,
    icon: <LunchDiningIcon />,
  },
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
    title: 'organisation',
    path: ROUTES.org,
    icon: <AccountTreeIcon />,
  },
  {
    title: 'order',
    path: ROUTES.order,
    icon: <ReceiptLongSharpIcon />,
  },
];

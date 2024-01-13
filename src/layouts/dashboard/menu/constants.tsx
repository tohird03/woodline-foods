import React from 'react';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import HistoryIcon from '@mui/icons-material/History';
import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import ReceiptLongSharpIcon from '@mui/icons-material/ReceiptLongSharp';
import SvgColor from '../../../components/svg-color';
import {ROUTES} from '../../../constants/router';

export interface INavbarLinks {
  title: string;
  path: string;
  icon: React.ReactNode;
  searchTitle: INavbarLang;
}

export interface INavbarLang {
  uz: string;
  ru: string;
  en: string;
}

const icon = (name: string) =>
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{width: 1, height: 1}} />;

export const navConfig: INavbarLinks[] = [
  {
    title: 'home',
    path: ROUTES.home,
    icon: <DashboardIcon />,
    searchTitle: {
      uz: 'Bosh sahifa',
      en: 'Dashboard',
      ru: 'Дaшборд',
    },
  },
  {
    title: 'admins',
    path: ROUTES.admins,
    icon: <AdminPanelSettingsIcon />,
    searchTitle: {
      uz: 'Adminlar',
      en: 'Admins',
      ru: 'Админы',
    },
  },
  {
    title: 'user',
    path: ROUTES.users,
    icon: <GroupIcon />,
    searchTitle: {
      uz: 'Foydalanuvchilar',
      en: 'Users',
      ru: 'Пользователи',
    },
  },
  {
    title: 'lunch',
    path: ROUTES.lunch,
    icon: <LunchDiningIcon />,
    searchTitle: {
      uz: 'Tushlik',
      en: 'Lunch',
      ru: 'Обед',
    },
  },
  {
    title: 'products',
    path: ROUTES.product,
    icon: icon('ic_cart'),
    searchTitle: {
      uz: 'Mahsulotlar',
      en: 'Products',
      ru: 'Продукты',
    },
  },
  {
    title: 'foods',
    path: ROUTES.food,
    icon: <LocalDiningIcon />,
    searchTitle: {
      uz: 'Ovqatlar',
      en: 'Foods',
      ru: 'Еда',
    },
  },
  {
    title: 'organisation',
    path: ROUTES.org,
    icon: <AccountTreeIcon />,
    searchTitle: {
      uz: 'Tashkilotlar',
      en: 'Organisations',
      ru: 'Организация',
    },
  },
  {
    title: 'order',
    path: ROUTES.order,
    icon: <ReceiptLongSharpIcon />,
    searchTitle: {
      uz: 'Buyurtmalar',
      en: 'Orders',
      ru: 'Заказы',
    },
  },
  {
    title: 'lunchHistory',
    path: ROUTES.history,
    icon: <HistoryIcon />,
    searchTitle: {
      uz: 'Tushliklar tarixi',
      en: 'Lunch History',
      ru: 'История обеда',
    },
  },
  {
    title: 'payments',
    path: ROUTES.payments,
    icon: <CurrencyExchangeIcon />,
    searchTitle: {
      uz: 'To\'lovlar',
      en: 'Payments',
      ru: 'Платежи',
    },
  },
  {
    title: 'productLogs',
    path: ROUTES.productLogs,
    icon: <HistoryToggleOffIcon />,
    searchTitle: {
      uz: 'Mahsulotlar tarixi',
      en: 'Product logs',
      ru: 'История продукта',
    },
  },
];

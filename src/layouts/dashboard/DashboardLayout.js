/* eslint-disable react/function-component-definition */
import React, {useState} from 'react';
import {Outlet} from 'react-router-dom';
import {observer} from 'mobx-react';
import {styled} from '@mui/material/styles';
import Header from './header';
import {Menu} from './menu';

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const StyledRoot = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

const Main = styled('div')(({theme}) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 18,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

const DashboardLayout = observer(() => {
  const [open, setOpen] = useState(false);

  const handleOpenSearchHeader = () => {
    setOpen(true);
  };

  const handleCloseSearchHeader = () => {
    setOpen(false);
  };

  return (
    <StyledRoot>
      <Header onOpenNav={handleOpenSearchHeader} />

      <Menu openNav={open} onCloseNav={handleCloseSearchHeader} />

      <Main>
        <Outlet />
      </Main>
    </StyledRoot>
  );
});

export default DashboardLayout;

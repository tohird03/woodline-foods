/* eslint-disable react/function-component-definition */
import React from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';
import {observer} from 'mobx-react';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import TelegramIcon from '@mui/icons-material/Telegram';
import {AppBar, Box, IconButton, Stack, Toolbar, Tooltip} from '@mui/material';
import {styled} from '@mui/material/styles';
import Iconify from '../../../components/iconify';
import {ROUTES} from '../../../constants/router';
import {useStores} from '../../../store/store-context';
import {bgBlur} from '../../../utils/cssStyles';
import LanguagePopover from './LanguagePopover';
import {NotificationsPopover} from './NotificationsPopover';
import Searchbar from './Searchbar';


const NAV_WIDTH = 240;

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 92;

const StyledRoot = styled(AppBar)(({theme}) => ({
  ...bgBlur({color: theme.palette.background.default}),
  boxShadow: 'none',
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${NAV_WIDTH + 1}px)`,
  },
}));

const StyledToolbar = styled(Toolbar)(({theme}) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

const DashboardLayout = observer(({onOpenNav}) => {
  const {t} = useTranslation();
  const navigate = useNavigate();

  const {appStore, authStore} = useStores();

  const handleNotificationModalOpen = () => {
    appStore.setIsOpenNotificationModal(true);
  };

  const handleLogout = () => {
    window.localStorage.clear();
    authStore.setIsAuth(false);
    navigate(ROUTES.login);
  };

  return (
    <>
      <StyledRoot>
        <StyledToolbar>
          <IconButton
            onClick={onOpenNav}
            sx={{
              mr: 1,
              color: 'text.primary',
              display: {lg: 'none'},
            }}
          >
            <Iconify icon="eva:menu-2-fill" />
          </IconButton>

          <Searchbar />
          <Box sx={{flexGrow: 1}} />

          <Stack
            direction="row"
            alignItems="center"
            spacing={{xs: 0.5, sm: 1}}
          >
            <LanguagePopover />
            <Tooltip title={t('tooltipSendNotification')}>
              <IconButton
                color="primary"
                onClick={handleNotificationModalOpen}
              >
                <TelegramIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={t('tooltipLogoutBtn')}>
              <IconButton
                color="error"
                onClick={handleLogout}
              >
                <ExitToAppIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </StyledToolbar>
      </StyledRoot>

      {appStore.isOpenNotificationModal && <NotificationsPopover />}
    </>
  );
});

export default DashboardLayout;

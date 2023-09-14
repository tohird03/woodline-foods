/* eslint-disable react/function-component-definition */
import React from 'react';
import {observer} from 'mobx-react';
import TelegramIcon from '@mui/icons-material/Telegram';
import {AppBar, Box, IconButton, Stack, Toolbar, Tooltip} from '@mui/material';
import {styled} from '@mui/material/styles';
import Iconify from '../../../components/iconify';
import {useStores} from '../../../store/store-context';
import {bgBlur} from '../../../utils/cssStyles';
import AccountPopover from './AccountPopover';
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
  const {appStore} = useStores();

  const handleNotificationModalOpen = () => {
    appStore.setIsOpenNotificationModal(true);
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
            spacing={{
              xs: 0.5,
              sm: 1,
            }}
          >
            <LanguagePopover />
            <Tooltip title="Send a notification to a bot">
              <IconButton
                color="primary"
                onClick={handleNotificationModalOpen}
              >
                <TelegramIcon />
              </IconButton>
            </Tooltip>
            <AccountPopover />
          </Stack>
        </StyledToolbar>
      </StyledRoot>
      {appStore.isOpenNotificationModal && <NotificationsPopover />}
    </>
  );
});

export default DashboardLayout;

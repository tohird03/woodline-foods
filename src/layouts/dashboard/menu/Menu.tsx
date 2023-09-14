import React, {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {Box, Drawer} from '@mui/material';
import Scrollbar from '../../../components/scrollbar';
import useResponsive from '../../../hooks/useResponsive';
import {navConfig} from './constants';
import {NavSection} from './NavSection';

const NAV_WIDTH = 240;


export const Menu = ({openNav, onCloseNav}: any) => {
  const {pathname} = useLocation();

  const isDesktop = useResponsive('up', 'lg', 'lg');

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
  }, [onCloseNav, openNav, pathname]);

  const renderContent = (
    <Scrollbar>
      <NavSection data={navConfig} />
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: {lg: 0},
        width: {lg: NAV_WIDTH},
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: {width: NAV_WIDTH},
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
};

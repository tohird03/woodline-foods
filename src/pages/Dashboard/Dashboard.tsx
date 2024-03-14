import React from 'react';
import {observer} from 'mobx-react';
import {useMediaQuery} from '@mui/material';
import {TabsWithPanel} from '../../components/Tabs';
import {dashboardStore} from '../../store/dashboard';
import {DashboardTabs} from './constants';

export const Dashboard = observer(() => {
  const isMobile = useMediaQuery('(max-width: 650px)');

  const handleTabChange = (labelId: number) => {
    if (!labelId) {
      return;
    }

    dashboardStore.setType(labelId);
  };

  return (
    <TabsWithPanel
      isMobile={isMobile}
      tabs={DashboardTabs}
      onTabChange={handleTabChange}
    />
  );
});

import React from 'react';
import {observer} from 'mobx-react';
import {Container} from '@mui/material';
import {TabsWithPanel} from '../../components/Tabs';
import {dashboardStore} from '../../store/dashboard';
import {Chart} from './Chart';
import {DashboardTabs} from './constants';
import {Filter} from './Filter';

export const Dashboard = observer(() => {

  const handleTabChange = (labelId: number) => {
    dashboardStore.setType(labelId);
  };

  return (
    <Container>
      <TabsWithPanel
        tabs={DashboardTabs}
        onTabChange={handleTabChange}
      />
      <Filter />
      <Chart />
    </Container>
  );
});
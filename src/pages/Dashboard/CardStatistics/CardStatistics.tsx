import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {observer} from 'mobx-react';
import {Grid} from '@mui/material';
import {dashboardStore} from '../../../store/dashboard';
import {dateFormat} from '../../../utils/formatTime';
import {CardSummary} from './CardSummary';

export const CardStatistics = observer(() => {
  const {t} = useTranslation();

  useEffect(() => {
    dashboardStore.getDailyAnalitic();
  }, []);

  return (
    <Grid pb={3} container spacing={3}>
      <Grid item xs={12} sm={6} md={4}>
        <CardSummary
          title={`Вчера ${dateFormat(dashboardStore?.dailyAnalitic?.yesterday?.date!)}`}
          titleInCome={'Доход'}
          totalInCome={dashboardStore?.dailyAnalitic?.yesterday?.income || 0}
          titleExpense={'Расход'}
          totalExpense={dashboardStore?.dailyAnalitic?.yesterday?.expense || 0}
          color="warning"
          type="yesterday"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardSummary
          title={`Сегодня ${dateFormat(dashboardStore?.dailyAnalitic?.today?.date!)}`}
          titleInCome={'Доход'}
          totalInCome={dashboardStore?.dailyAnalitic?.today?.income || 0}
          titleExpense={'Расход'}
          totalExpense={dashboardStore?.dailyAnalitic?.today?.expense || 0}
          color="error"
          type="today"
        />
      </Grid>
    </Grid>
  );
});

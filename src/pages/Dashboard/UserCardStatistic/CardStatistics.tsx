import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {observer} from 'mobx-react';
import {Grid} from '@mui/material';
import {dashboardStore} from '../../../store/dashboard';
import {dateFormat} from '../../../utils/formatTime';
import {CardSummary} from './CardSummary';

export const UserCardStatistics = observer(() => {
  const {t} = useTranslation();

  useEffect(() => {
    dashboardStore.getUsersDailyAnalitic();
  }, []);

  return (
    <Grid pb={3} container spacing={3}>
      <Grid item xs={12} sm={6} md={4}>
        <CardSummary
          title={`Вчера ${dateFormat(dashboardStore?.usersDailyAnalitic?.yesterday?.date!)}`}
          titleInCome={'Оплата'}
          totalInCome={dashboardStore?.usersDailyAnalitic?.yesterday?.payment || 0}
          titleExpense={'Расход'}
          totalExpense={dashboardStore?.usersDailyAnalitic?.yesterday?.expence || 0}
          color="warning"
          type="yesterday"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardSummary
          title={`Сегодня ${dateFormat(dashboardStore?.usersDailyAnalitic?.today?.date!)}`}
          titleInCome={'Оплата'}
          totalInCome={dashboardStore?.usersDailyAnalitic?.today?.payment || 0}
          titleExpense={'Расход'}
          totalExpense={dashboardStore?.usersDailyAnalitic?.today?.expence || 0}
          color="error"
          type="today"
        />
      </Grid>
    </Grid>
  );
});

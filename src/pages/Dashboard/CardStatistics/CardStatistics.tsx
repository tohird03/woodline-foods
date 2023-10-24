import React from 'react';
import {useTranslation} from 'react-i18next';
import {Grid} from '@mui/material';
import {DollarOutlined, OrderedListOutlined, TransactionOutlined} from '@ant-design/icons';
import {CardSummary} from '../../../components/CardSummary';
import {dashboardStyles} from '../styles';

export const CardStatistics = () => {
  const {t} = useTranslation();

  return (
    <Grid pb={3} container spacing={3}>
      <Grid item xs={12} sm={6} md={4}>
        <CardSummary
          title={t('dashboardTotalTrade')}
          total={5869453921}
          color="warning"
          icon={<TransactionOutlined style={dashboardStyles.cardStatisticsIcons} />}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardSummary
          title={t('dashboardTotalCosts')}
          total={2869453921}
          color="error"
          icon={<OrderedListOutlined style={dashboardStyles.cardStatisticsIcons} />}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardSummary
          title={t('dashboardTotalBenefit')}
          total={1479962900}
          color="success"
          icon={<DollarOutlined style={dashboardStyles.cardStatisticsIcons} />}
        />
      </Grid>
    </Grid>
  );
};

import React, {useEffect} from 'react';
import Chart from 'react-apexcharts';
import {useTranslation} from 'react-i18next';
import {useParams} from 'react-router-dom';
import {observer} from 'mobx-react';
import {Box, Card, CardHeader, FormControl, InputLabel, Select, SelectChangeEvent} from '@mui/material';
import {IUserAnaliticType} from '../../../../api/users/types';
import {usersStore} from '../../../../store/users';
import {dateFormat} from '../../../../utils/formatTime';
import {dashboardStyles} from '../../../Dashboard/styles';
import {timeOptions} from '../../constants';

export const Analitic = observer(() => {
  const {id} = useParams();
  const {t} = useTranslation();

  const handleTimeChange = (event: SelectChangeEvent<string>) => {
    usersStore.setTime(event.target.value as IUserAnaliticType);
  };

  console.log(usersStore.userAnalitic?.data);


  const analiticChartOption = {
    options: {
      chart: {
        id: 'basic-bar',
      },
      xaxis: {
        categories: usersStore.userAnalitic?.data?.map(date => date?.label) || [],
      },
    },
    series: [
      {
        name: `${usersStore.userAnalitic?.user?.first_name}`,
        data: usersStore.userAnalitic?.data?.map(data => data?.data) || [],
      },
    ],
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y: any) => {
          if (typeof y !== 'undefined') {
            return `${y.toFixed(0)} visits`;
          }

          return y;
        },
      },
    },
  };

  useEffect(() => {
    usersStore.getUserAnalitic({
      userId: id!,
      type: usersStore.time,
    });
  }, [usersStore.time, id]);

  useEffect(() => () => {
    usersStore.setTime(IUserAnaliticType.Day);
  }, []);

  return (
    <Card sx={dashboardStyles.chartCard}>
      <CardHeader />

      <FormControl sx={dashboardStyles.filterOrgControl} fullWidth>
        <InputLabel>{t('dashboardFilterByTime')}</InputLabel>
        <Select label={t('dashboardFilterByTime')} onChange={handleTimeChange}>
          {timeOptions}
        </Select>
      </FormControl>

      <Box sx={dashboardStyles.chartBox} dir="ltr">
        <Chart
          options={analiticChartOption.options}
          series={analiticChartOption.series}
          type="bar"
          height="400"
        />
      </Box>
    </Card>
  );
});

import React from 'react';
import ReactApexChart from 'react-apexcharts';
import {observer} from 'mobx-react';
import {Box, Card, CardHeader} from '@mui/material';
import {useChart} from '../../../components/chart';
import {dashboardStore} from '../../../store/dashboard';
import {CHART_COLOR, CHART_HEIGHT} from '../constants';
import {dashboardStyles} from '../styles';

export const Chart = observer(() => {
  const chartOptions = useChart({
    plotOptions: {bar: {columnWidth: '16%'}},
    fill: {type: ['gradient']},
    series: [
      {
        name: 'Team A',
        type: 'area',
        fill: 'gradient',
        data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
      },
    ],
    colors: [CHART_COLOR[dashboardStore.type]],
    xaxis: {
      categories: [
        '01/10/2003',
        '01/11/2003',
        '01/12/2003',
        '01/13/2003',
        '01/14/2003',
        '01/15/2003',
        '01/16/2003',
        '01/17/2003',
        '01/18/2003',
        '01/19/2003',
        '01/20/2003',
      ],
    },
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
  });

  return (
    <Card sx={dashboardStyles.chartCard}>
      <CardHeader />

      <Box sx={dashboardStyles.chartBox} dir="ltr">
        <ReactApexChart
          type="line"
          series={chartOptions.series}
          options={chartOptions}
          height={CHART_HEIGHT}
        />
      </Box>
    </Card>
  );
});

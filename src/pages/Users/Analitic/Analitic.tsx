import React from 'react';
import ReactApexChart from 'react-apexcharts';
import {Box, Card, CardHeader} from '@mui/material';
import {useChart} from '../../../components/chart';
import {dashboardStore} from '../../../store/dashboard';
import {CHART_COLOR, CHART_HEIGHT} from '../../Dashboard/constants';
import {dashboardStyles} from '../../Dashboard/styles';

export const Analitic = () => {
  const chartOptions = useChart({
    plotOptions: {bar: {columnWidth: '16%'}},
    fill: {type: ['gradient']},
    series: [
      {
        name: 'Team A',
        type: 'area',
        fill: 'gradient',
        data: [
          '150000',
          '210000',
          '95000',
          '170000',
          '110000',
          '150000',
          '210000',
          '95000',
          '170000',
          '110000',
          '150000',
          '210000',
          '95000',
          '170000',
          '110000',
        ],
      },
    ],
    colors: [CHART_COLOR[dashboardStore.type]],
    xaxis: {
      categories: [
        '1 Dekabr',
        '8 Dekabr',
        '15 Dekabr',
        '22 Dekabr',
        '1 Noyabr',
        '1 Dekabr',
        '8 Dekabr',
        '15 Dekabr',
        '22 Dekabr',
        '1 Noyabr',
        '1 Dekabr',
        '8 Dekabr',
        '15 Dekabr',
        '22 Dekabr',
        '1 Noyabr',
      ],
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y: any) => {
          if (typeof y !== 'undefined') {
            return `${y.toFixed(0)} сум`;
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
};

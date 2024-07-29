import React from 'react';
import ReactApexChart from 'react-apexcharts';
import {observer} from 'mobx-react';
import {Box, Card, CardHeader} from '@mui/material';
import {useChart} from '../../../../components/chart';
import {dashboardStore} from '../../../../store/dashboard';
import {CHART_COLOR, CHART_DATA, CHART_HEIGHT} from '../../constants';
import {dashboardStyles} from '../../styles';

export const Chart = observer(() => {
  const chartOptions = useChart({
    plotOptions: {bar: {columnWidth: '16%'}},
    fill: {type: ['gradient']},
    series: [
      {
        name: 'Team A',
        type: 'area',
        fill: 'gradient',
        data: CHART_DATA[dashboardStore.type],
      },
    ],
    colors: [CHART_COLOR[dashboardStore.type]],
    xaxis: {
      categories: [
        '07/10/2024',
        '07/11/2024',
        '07/12/2024',
        '07/13/2024',
        '07/14/2024',
        '07/15/2024',
        '07/16/2024',
        '07/17/2024',
        '07/18/2024',
        '07/19/2024',
        '07/20/2024',
        '07/21/2024',
        '07/22/2024',
        '07/23/2024',
        '07/24/2024',
        '07/25/2024',
        '07/26/2024',
        '07/27/2024',
        '07/28/2024',
        '07/29/2024',
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

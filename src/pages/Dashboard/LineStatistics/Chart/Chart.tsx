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
        '10/10/2022',
        '10/11/2022',
        '10/12/2022',
        '10/13/2022',
        '10/14/2022',
        '10/15/2022',
        '10/16/2022',
        '10/17/2022',
        '10/18/2022',
        '10/19/2022',
        '10/20/2022',
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

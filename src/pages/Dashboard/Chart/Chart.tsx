import React from 'react';
import ReactApexChart from 'react-apexcharts';
import {Box, Card, CardHeader} from '@mui/material';
import {useChart} from '../../../components/chart';

export const Chart = () => {
  const chartOptions = useChart({
    plotOptions: {bar: {columnWidth: '16%'}},
    fill: {type: [
      {
        name: 'Team A',
        type: 'area',
        fill: 'gradient',
        data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
        color: 'rgb(255, 193, 7)',
      },
    ].map((i: any) => i.fill)},
    labels: [
      '01/01/2003',
      '02/01/2003',
      '03/01/2003',
      '04/01/2003',
      '05/01/2003',
      '06/01/2003',
      '07/01/2003',
      '08/01/2003',
      '09/01/2003',
      '10/01/2003',
      '11/01/2003',
    ],
    series: [
      {
        name: 'Team A',
        type: 'area',
        fill: 'gradient',
        data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
        color: 'rgb(255, 193, 7)',
      },
    ],
    xaxis: {type: 'datetime'},
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
    <Card>
      <CardHeader />

      <Box sx={{p: 3, pb: 1}} dir="ltr">
        <ReactApexChart
          type="line"
          series={chartOptions.series}
          options={chartOptions}
          height={364}
          color={['red']}
        />
      </Box>
    </Card>
  );
};

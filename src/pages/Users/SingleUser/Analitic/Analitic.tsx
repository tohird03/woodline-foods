import React, { useEffect, useMemo, useState } from 'react';
import Chart from 'react-apexcharts';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Box, Card, CardHeader, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { IOrganisation, IUserAnaliticType } from '../../../../api/users/types';
import { usersStore } from '../../../../store/users';
import { dashboardStyles } from '../../../Dashboard/styles';
import { timeOptions } from '../../constants';
import { DatePicker, DatePickerProps } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { RangePickerProps } from 'antd/es/date-picker';
import { UsersStyles } from '../../styles';

type RangeValue = [Dayjs, Dayjs] | null;

export const Analitic = observer(() => {
  const { id } = useParams();
  const { t } = useTranslation();

  const handleTimeChange = (event: SelectChangeEvent<string>) => {
    usersStore.setTime(event.target.value as IUserAnaliticType);
  };

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
        name: `${usersStore.userAnalitic?.user?.fullName}`,
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

  const handleDateChange = (values: any, formatString: [string, string]) => {
    if (values) {
      usersStore.setStart(values[0]);
      usersStore.setEnd(values[1]);

      return;
    }

    usersStore.setStart(null);
    usersStore.setEnd(null);
  };

  const handleChangeOrg = (event: SelectChangeEvent<string>) => {
    usersStore.setOrg(event.target.value);
  };

  const organisationOption = useMemo(() => (
    usersStore.organisations?.map((org: IOrganisation) => (
      <MenuItem
        sx={org?._id === usersStore?.singleUser?.org?._id
          ? UsersStyles.changeOrgMenuItem
          : {}
        }
        key={org?._id} value={org?._id}
      >
        {org?.name_org}
      </MenuItem>
    ))
  ), [usersStore.organisations]);

  useEffect(() => {
    usersStore.getOrganisation({
      page: 1,
      size: 1000,
    });

    return () => {
      usersStore.setOrganisation([]);
    };
  }, []);

  useEffect(() => {
    usersStore.getUserAnalitic({
      user: id!,
      start: usersStore?.start!,
      end: usersStore?.end!,
      org: usersStore.org!,
    });
  }, [usersStore.time, id, usersStore.start, usersStore.end, usersStore.org]);

  return (
    <Card sx={dashboardStyles.chartCard}>
      <CardHeader />

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
        }}
      >
        <DatePicker.RangePicker style={{ marginLeft: '40px' }} onChange={handleDateChange} />

        <FormControl sx={UsersStyles.changeOrgFormControl}>
          <InputLabel>Organisation</InputLabel>
          <Select
            onChange={handleChangeOrg}
            label="Organisation"
            name="org"
            required
          >
            {organisationOption}
          </Select>
        </FormControl>
      </div>

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

import React, {useEffect, useMemo, useState} from 'react';
import Chart from 'react-apexcharts';
import {useTranslation} from 'react-i18next';
import {useParams} from 'react-router-dom';
import {observer} from 'mobx-react';
import {Box, Card, CardHeader, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from '@mui/material';
import {DatePicker, DatePickerProps} from 'antd';
import {RangePickerProps} from 'antd/es/date-picker';
import dayjs, {Dayjs} from 'dayjs';
import {IOrganisation, IUserAnaliticType} from '../../../../api/users/types';
import {usersStore} from '../../../../store/users';
import {dashboardStyles} from '../../../Dashboard/styles';
import {timeOptions} from '../../constants';
import {UsersStyles} from '../../styles';

type RangeValue = [Dayjs, Dayjs] | null;

export const PaymentAnalitic = observer(() => {
  const {id} = useParams();

  const analiticChartOption = {
    options: {
      chart: {
        id: 'basic-bar',
      },
      xaxis: {
        categories: usersStore.userPaymentAnalitic?.data?.map(date => date?.label) || [],
      },
    },
    series: [
      {
        name: `${usersStore.userPaymentAnalitic?.user?.fullName}`,
        data: usersStore.userPaymentAnalitic?.data?.map(data => data?.data) || [],
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
      usersStore.setStartPay(values[0]);
      usersStore.setEndPay(values[1]);

      return;
    }

    usersStore.setStartPay(null);
    usersStore.setEndPay(null);
  };

  const handleChangeOrg = (event: SelectChangeEvent<string>) => {
    usersStore.setOrgPay(event.target.value);
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
    usersStore.getOrganisation();

    return () => {
      usersStore.setOrganisation([]);
    };
  }, []);

  useEffect(() => {
    usersStore.getUserPaymentAnalitic({
      user: id!,
      start: usersStore?.startPay!,
      end: usersStore?.endPay!,
      org: usersStore.orgPay!,
    });
  }, [usersStore.time, id, usersStore.startPay, usersStore.endPay, usersStore.orgPay]);

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
        <DatePicker.RangePicker style={{marginLeft: '40px'}} onChange={handleDateChange} />

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

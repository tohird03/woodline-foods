import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import {
  Button,
  SelectChangeEvent,
  Stack,
  Typography,
} from '@mui/material';
import { CloudDownloadOutlined } from '@ant-design/icons';
import { DatePicker, Select } from 'antd';
import dayjs from 'dayjs';
import { dashboardApi } from '../../../api/dashboard';
import { EAnaliticType } from '../../../api/dashboard/types';
import { IOrganisation } from '../../../api/organisation/types';
import { Table } from '../../../components/table';
import { TabsWithPanel } from '../../../components/Tabs';
import { dashboardStore } from '../../../store/dashboard';
import { organisationStore } from '../../../store/organisation';
import { useMediaQuery } from '../../../utils/hooks/useMediaQuery';
import { addAxiosErrorNotification } from '../../../utils/notification';
import { analiticColumns, AnaliticTabs } from './constants';
import { usersStore } from '../../../store/users';
import { IUsers } from '../../../api/users/types';

export const AnaliticUsers = observer(() => {
  const isMobile = useMediaQuery('(max-width: 650px)');
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);

  const handleDownloadExel = () => {
    dashboardApi.getAllAnaliticUsersExel({
      startDate: dashboardStore.usersStartDate!,
      endDate: dashboardStore.usersEndDate!,
      type: dashboardStore.usersAnaliticTab,
      pageNumber: dashboardStore.usersAnaliticPageNumber,
      pageSize: dashboardStore.usersAnaliticPageSize,
    })
      .then(res => {
        const blob = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');

        a.href = url;
        a.download = 'users.xlsx';
        a.click();
        URL.revokeObjectURL(url);
      })
      .catch(addAxiosErrorNotification);
  };

  const handleTabChange = (labelId: string | number) => {
    if (!labelId) {
      return;
    }

    dashboardStore.setUsersAnaliticTab(labelId as EAnaliticType);
  };

  const handleChangeUser = (value: string) => {
    dashboardStore.setUserId(value || null);
  };

  const handleSearchUser = (value: string) => {
    dashboardStore.setSearchUser(value || null);
  };

  const handleOrgChange = (value: string) => {
    dashboardStore.setUserOrg(value || null);
  };

  const handleDateChange = (values: any, formatString: [string, string]) => {
    dashboardStore.setUsersStartDate(formatString[0]);
    dashboardStore.setUsersEndDate(formatString[1]);
  };

  const handleChangePage = (newPage: number) => {
    dashboardStore.setUsersAnaliticPageNumber(newPage + 1);
  };

  const handleChangePerPage = (perPage: number, page: number) => {
    dashboardStore.setUsersAnaliticPageNumber(page);
    dashboardStore.setUsersAnaliticPageSize(perPage);
  };

  const orgOptions = useMemo(() => (
    organisationStore.organisations.map((org: IOrganisation) => ({
      value: org?._id,
      label: org?.name_org,
    }))
  ), [organisationStore.organisations]);

  const usersOptions = useMemo(() => (
    usersStore.users?.map((user: IUsers) => ({
      value: user?._id,
      label: `${user?.first_name} ${user?.last_name}`,
    }))
  ), [usersStore.users]);

  useEffect(() => {
    setLoading(true);
    dashboardStore.getUsersAnalitic({
      type: dashboardStore.usersAnaliticTab,
      startDate: dashboardStore.usersStartDate!,
      endDate: dashboardStore.usersEndDate!,
      pageNumber: dashboardStore.usersAnaliticPageNumber,
      pageSize: dashboardStore.usersAnaliticPageSize,
      org: dashboardStore.userOrg!,
      userId: dashboardStore.userId!,
    })
      .finally(() => {
        setLoading(false);
      });
  }, [
    dashboardStore.usersAnaliticTab,
    dashboardStore.usersStartDate,
    dashboardStore.usersEndDate,
    dashboardStore.usersAnaliticPageNumber,
    dashboardStore.usersAnaliticPageSize,
    dashboardStore.userOrg,
    dashboardStore.userId,
  ]);

  useEffect(() => {
    organisationStore.getOrganisation({
      page: 1,
      size: 1000,
    });
  }, []);

  useEffect(() => {
    usersStore.getUsers({
      page: 1,
      size: 20,
      search: dashboardStore.searchUser!,
    });
  }, [dashboardStore.searchUser]);

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={1}
      >
        <Typography
          variant="h4"
          gutterBottom
        >
          Действия
        </Typography>
        <Button
          variant="contained"
          startIcon={<CloudDownloadOutlined />}
          onClick={handleDownloadExel}
        >
          Скачать Excel
        </Button>
      </Stack>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <TabsWithPanel
          isMobile={isMobile}
          tabs={AnaliticTabs}
          onTabChange={handleTabChange}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Select
            showSearch
            allowClear
            placeholder="Выберите пользователя"
            optionFilterProp="label"
            onChange={handleChangeUser}
            onSearch={handleSearchUser}
            options={usersOptions}
            style={{width: '200px'}}
          />
          <Select
            options={orgOptions}
            onChange={handleOrgChange}
            title={t('dashboardFilterOrg')}
            placeholder={t('dashboardFilterOrg')}
            style={{ width: '200px' }}
            allowClear
          />
          <DatePicker.RangePicker
            onChange={handleDateChange}
            defaultValue={[dayjs(dashboardStore.usersStartDate), dayjs(dashboardStore.usersEndDate)]}
          />
        </div>
      </div>

      <Table
        columns={analiticColumns}
        data={dashboardStore?.usersAnalitic}
        isMobile={isMobile}
        loading={loading}
        pagination={{
          total: dashboardStore.totalUsersAnalitic,
          page: dashboardStore.usersAnaliticPageNumber,
          size: dashboardStore.usersAnaliticPageSize,
          handlePageChange: handleChangePage,
          handleShowSizeChange: handleChangePerPage,
        }}
      />
    </>
  );
});

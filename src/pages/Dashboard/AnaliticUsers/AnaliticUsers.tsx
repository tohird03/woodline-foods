import React, {useEffect, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {observer} from 'mobx-react';
import {
  Button,
  SelectChangeEvent,
  Stack,
  Typography,
} from '@mui/material';
import {CloudDownloadOutlined} from '@ant-design/icons';
import {DatePicker, Select} from 'antd';
import dayjs from 'dayjs';
import {dashboardApi} from '../../../api/dashboard';
import {EAnaliticType} from '../../../api/dashboard/types';
import {IOrganisation} from '../../../api/organisation/types';
import {Table} from '../../../components/table';
import {TabsWithPanel} from '../../../components/Tabs';
import {dashboardStore} from '../../../store/dashboard';
import {organisationStore} from '../../../store/organisation';
import {useMediaQuery} from '../../../utils/hooks/useMediaQuery';
import {addAxiosErrorNotification} from '../../../utils/notification';
import {analiticColumns, AnaliticTabs} from './constants';

export const AnaliticUsers = observer(() => {
  const isMobile = useMediaQuery('(max-width: 650px)');
  const {t} = useTranslation();
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
        const blob = new Blob([res], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
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

  useEffect(() => {
    setLoading(true);
    dashboardStore.getUsersAnalitic({
      type: dashboardStore.usersAnaliticTab,
      startDate: dashboardStore.usersStartDate!,
      endDate: dashboardStore.usersEndDate!,
      pageNumber: dashboardStore.usersAnaliticPageNumber,
      pageSize: dashboardStore.usersAnaliticPageSize,
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
  ]);

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

      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <TabsWithPanel
          isMobile={isMobile}
          tabs={AnaliticTabs}
          onTabChange={handleTabChange}
        />

        <div style={{display: 'flex', alignItems: 'center', gap: '20px'}}>
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

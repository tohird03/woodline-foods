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

export const AnaliticProduct = observer(() => {
  const isMobile = useMediaQuery('(max-width: 650px)');
  const {t} = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);

  const handleDownloadExel = () => {
    dashboardApi.getAllAnaliticProductsExel({
      startDate: dashboardStore.startDate!,
      endDate: dashboardStore.endDate!,
      type: dashboardStore.productAnaliticTab,
      org: dashboardStore.productOrg!,
    })
      .then(res => {
        const blob = new Blob([res], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');

        a.href = url;
        a.download = 'products.xlsx';
        a.click();
        URL.revokeObjectURL(url);
      })
      .catch(addAxiosErrorNotification);
  };

  const handleTabChange = (labelId: string | number) => {
    if (!labelId) {
      return;
    }

    dashboardStore.setProductAnaliticTab(labelId as EAnaliticType);
  };

  const handleOrgChange = (value: string) => {
    dashboardStore.setProductOrg(value || null);
  };

  const handleDateChange = (values: any, formatString: [string, string]) => {
    dashboardStore.setStartDate(formatString[0]);
    dashboardStore.setEndDate(formatString[1]);
  };

  const orgOptions = useMemo(() => (
    organisationStore.organisations.map((org: IOrganisation) => ({
      value: org?._id,
      label: org?.name_org,
    }))
  ), [organisationStore.organisations]);

  useEffect(() => {
    setLoading(true);
    dashboardStore.getProductAnalitic({
      type: dashboardStore.productAnaliticTab,
      startDate: dashboardStore.startDate!,
      endDate: dashboardStore.endDate!,
      org: dashboardStore.productOrg!,
    })
      .finally(() => {
        setLoading(false);
      });
  }, [
    dashboardStore.productAnaliticTab,
    dashboardStore.startDate,
    dashboardStore.endDate,
    dashboardStore.productOrg,
  ]);

  useEffect(() => {
    organisationStore.getOrganisation({
      page: 1,
      size: 1000,
    });
  }, []);

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
          <Select
            options={orgOptions}
            onChange={handleOrgChange}
            title={t('dashboardFilterOrg')}
            placeholder={t('dashboardFilterOrg')}
            style={{width: '200px'}}
          />
          <DatePicker.RangePicker
            onChange={handleDateChange}
            defaultValue={[dayjs(dashboardStore.startDate), dayjs(dashboardStore.endDate)]}
          />
        </div>
      </div>

      <Table
        columns={analiticColumns}
        data={dashboardStore?.productAnalitic}
        pagination={false}
        isMobile={isMobile}
        loading={loading}
      />
    </>
  );
});

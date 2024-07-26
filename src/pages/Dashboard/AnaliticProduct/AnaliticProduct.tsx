import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {observer} from 'mobx-react';
import {
  Button,
  Stack,
  Typography,
} from '@mui/material';
import {CloudDownloadOutlined} from '@ant-design/icons';
import {DatePicker, DatePickerProps} from 'antd';
import dayjs from 'dayjs';
import {dashboardApi} from '../../../api/dashboard';
import {EAnaliticType} from '../../../api/dashboard/types';
import {Table} from '../../../components/table';
import {TabsWithPanel} from '../../../components/Tabs';
import {dashboardStore} from '../../../store/dashboard';
import {useMediaQuery} from '../../../utils/hooks/useMediaQuery';
import {addAxiosErrorNotification} from '../../../utils/notification';
import {analiticColumns, AnaliticTabs} from './constants';

export const AnaliticProduct = observer(() => {
  const isMobile = useMediaQuery('(max-width: 650px)');
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [loading, setLoading] = useState<boolean>(false);

  const date = queryParams.get('date');

  const handleDownloadExel = () => {
    dashboardApi.getAllAnaliticProductsExel({
      date: date!,
      type: dashboardStore.productAnaliticTab,
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

  const handleChangeDate: DatePickerProps['onChange'] = (date, dateString) => {
    const params = new URLSearchParams(location.search);

    params.set('date', dateString);
    navigate({search: params.toString()});
  };

  useEffect(() => {
    setLoading(true);
    dashboardStore.getProductAnalitic({
      date: date!,
      type: dashboardStore.productAnaliticTab,
    })
      .finally(() => {
        setLoading(false);
      });
  }, [dashboardStore.productAnaliticTab, date]);

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

        <DatePicker
          onChange={handleChangeDate}
          value={date ? dayjs(date, 'YYYY-MM-DD') : null}
          style={{width: '200px'}}
          placeholder="Выберите дату действия"
        />
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

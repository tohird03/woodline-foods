import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useLocation, useNavigate} from 'react-router-dom';
import {observer} from 'mobx-react';
import {
  Stack,
  Typography,
} from '@mui/material';
import {DatePicker, DatePickerProps} from 'antd';
import dayjs from 'dayjs';
import {EAnaliticType} from '../../../api/dashboard/types';
import {Table} from '../../../components/table';
import {TabsWithPanel} from '../../../components/Tabs';
import {dashboardStore} from '../../../store/dashboard';
import {useMediaQuery} from '../../../utils/hooks/useMediaQuery';
import {analiticColumns, AnaliticTabs} from './constants';

export const AnaliticProduct = observer(() => {
  const {t} = useTranslation();
  const isMobile = useMediaQuery('(max-width: 650px)');
  const [filterDate, setFilterDate] = useState<string | null>();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const date = queryParams.get('date');

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
    dashboardStore.getProductAnalitic({
      date: date!,
      type: dashboardStore.productAnaliticTab,
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
        data={dashboardStore.productAnalitic}
        pagination={false}
        isMobile={isMobile}
      />

      {/* {foodsStore.isOpenFilterModal && <FoodsFilter />} */}
    </>
  );
});

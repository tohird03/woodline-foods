import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {observer} from 'mobx-react';
import {
  Stack,
  Typography,
} from '@mui/material';
import {Table} from '../../components/table';
import {orderStore} from '../../store/order';
import {ordersColumn} from './constants';
import {OrderProductModal} from './OrderProduct/OrderProductModal';

export const Order = observer(() => {
  const {t} = useTranslation();

  const handleChangePage = (newPage: number) => {
    orderStore.setPage(newPage + 1);
  };

  const handleChangePerPage = (perPage: number) => {
    orderStore.setPage(1);
    orderStore.setSize(perPage);
  };

  useEffect(() => {
    orderStore.getOrder({
      page: orderStore.page,
      size: orderStore.size,
    });
  }, [orderStore.page, orderStore.size]);

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={1}
      >
        <Typography variant="h4" gutterBottom>
          {t('order')}
        </Typography>
      </Stack>

      <Table
        columns={ordersColumn}
        data={orderStore.orders}
        pagination={{
          total: orderStore.totalOrder,
          page: orderStore.page,
          size: orderStore.size,
          handlePageChange: handleChangePage,
          handleShowSizeChange: handleChangePerPage,
        }}
      />

      {orderStore.isOpenOrderProductModal && <OrderProductModal />}
    </>
  );
});

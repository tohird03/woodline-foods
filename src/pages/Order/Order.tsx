import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {observer} from 'mobx-react';
import {
  Container,
  Stack,
  Typography,
} from '@mui/material';
import {Table} from '../../components/table';
import {orderStore} from '../../store/order';
import {ordersColumn} from './constants';

export const Order = observer(() => {
  const {t} = useTranslation();

  const handleSearchUsers = (value: string) => {
    // TODO
  };

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
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography variant="h4" gutterBottom>
            Order
          </Typography>
        </Stack>

        <Table
          columns={ordersColumn.map((column) => ({
            ...column,
            label: t(column.label),
          }))}
          data={orderStore.orders}
          onFilterSearch={handleSearchUsers}
          pagination={{
            total: orderStore.totalOrder,
            page: orderStore.page,
            size: orderStore.size,
            handlePageChange: handleChangePage,
            handleShowSizeChange: handleChangePerPage,
          }}
        />
      </Container>
    </>
  );
});

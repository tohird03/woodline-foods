import React from 'react';
import {useTranslation} from 'react-i18next';
import {observer} from 'mobx-react';
import {Stack, Typography} from '@mui/material';
import {Table} from '../../components/table';
import {paymentStore} from '../../store/payment';
import {useMediaQuery} from '../../utils/hooks/useMediaQuery';
import {paymentsColumns} from './constants';

export const Payments = observer(() => {
  const {t} = useTranslation();
  const isMobile = useMediaQuery('(max-width: 650px)');

  const handleChangePage = (newPage: number) => {
    paymentStore.setPage(newPage + 1);
  };

  const handleChangePerPage = (perPage: number, page: number) => {
    paymentStore.setPage(page);
    paymentStore.setSize(perPage);
  };

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
        <Typography variant="h4" gutterBottom>
          {t('lunchHistory')}
        </Typography>
      </Stack>

      <Table
        columns={paymentsColumns}
        data={paymentStore.payments}
        pagination={{
          total: paymentStore.totalPayments,
          page: paymentStore.page,
          size: paymentStore.size,
          handlePageChange: handleChangePage,
          handleShowSizeChange: handleChangePerPage,
        }}
        isMobile={isMobile}
      />
    </>
  );
});

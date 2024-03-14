import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {observer} from 'mobx-react';
import {Stack, Typography} from '@mui/material';
import {Table} from '../../components/table';
import {productLogsStore} from '../../store/productLogs';
import {useMediaQuery} from '../../utils/hooks/useMediaQuery';
import {productLogsColumns} from './constants';

export const ProductLogs = observer(() => {
  const {t} = useTranslation();
  const isMobile = useMediaQuery('(max-width: 650px)');

  const handleChangePage = (newPage: number) => {
    productLogsStore.setPage(newPage + 1);
  };

  const handleChangePerPage = (perPage: number, page: number) => {
    productLogsStore.setPage(page);
    productLogsStore.setLimit(perPage);
  };


  useEffect(() => {
    productLogsStore.getProducts({
      page: productLogsStore.page,
      size: productLogsStore.limit,
    });
  }, [productLogsStore.page, productLogsStore.limit]);

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
        <Typography variant="h4" gutterBottom>
          {t('productLogs')}
        </Typography>
      </Stack>

      <Table
        columns={productLogsColumns}
        data={productLogsStore.productLogs}
        pagination={{
          total: productLogsStore.totalProduct,
          page: productLogsStore.page,
          size: productLogsStore.limit,
          handlePageChange: handleChangePage,
          handleShowSizeChange: handleChangePerPage,
        }}
        isMobile={isMobile}
      />
    </>
  );
});

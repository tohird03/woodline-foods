import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {observer} from 'mobx-react';
import {Button, Container, Stack, Typography} from '@mui/material';
import Iconify from '../../components/iconify';
import {Table} from '../../components/table';
import {lunchStore} from '../../store/lunch';
import {AddLunch} from './AddLunch';
import {lunchColumns} from './constants';

export const Lunch = observer(() => {
  const {t} = useTranslation();

  const handleChangePage = (newPage: number) => {
    lunchStore.setPage(newPage + 1);
  };

  const handleChangePerPage = (perPage: number) => {
    lunchStore.setPage(1);
    lunchStore.setSize(perPage);
  };

  const handleAddNewProduct = () => {
    lunchStore.setIsOpenLunchModal(true);
  };

  useEffect(() => {
    lunchStore.getLunchs({
      page: lunchStore.page,
      size: lunchStore.size,
    });
  }, [lunchStore.page, lunchStore.size]);


  return (
    <>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography variant="h4" gutterBottom>
            {t('lunch')}
          </Typography>
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={handleAddNewProduct}
          >
            {t('newLunch')}
          </Button>
        </Stack>

        <Table
          columns={lunchColumns}
          data={lunchStore.lunchs}
          pagination={{
            total: lunchStore.totalLunchs,
            page: lunchStore.page,
            size: lunchStore.size,
            handlePageChange: handleChangePage,
            handleShowSizeChange: handleChangePerPage,
          }}
        />
      </Container>

      {lunchStore.isOpenAddLunchModal && <AddLunch />}
    </>
  );
});

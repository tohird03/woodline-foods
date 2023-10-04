import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';
import {observer} from 'mobx-react';
import {Button, Stack, Typography} from '@mui/material';
import Iconify from '../../components/iconify';
import {Table} from '../../components/table';
import {ROUTES} from '../../constants/router';
import {lunchStore} from '../../store/lunch';
import {useMediaQuery} from '../../utils/hooks/useMediaQuery';
import {lunchColumns} from './constants';

export const Lunch = observer(() => {
  const {t} = useTranslation();
  const isMobile = useMediaQuery('(max-width: 650px)');
  const navigate = useNavigate();

  const handleChangePage = (newPage: number) => {
    lunchStore.setPage(newPage + 1);
  };

  const handleChangePerPage = (perPage: number, page: number) => {
    lunchStore.setPage(page);
    lunchStore.setSize(perPage);
  };

  const handleAddNewProduct = () => {
    navigate(ROUTES.lunchAdd);
  };

  useEffect(() => {
    lunchStore.getLunchs({
      page: lunchStore.page,
      size: lunchStore.size,
    });
  }, [lunchStore.page, lunchStore.size]);


  return (
    <>
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
        isMobile={isMobile}
      />
    </>
  );
});

import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {useParams} from 'react-router-dom';
import {observer} from 'mobx-react';
import {Button, Stack, Typography} from '@mui/material';
import Iconify from '../../../../components/iconify/Iconify';
import {Table} from '../../../../components/table';
import {lunchStore} from '../../../../store/lunch';
import {useMediaQuery} from '../../../../utils/hooks/useMediaQuery';
import {lunchProductColumn} from './constant';
import {AddLunchProduct} from './LunchOneLunchProductAddModal';
import {EditLunchProduct} from './LunchOneLunchProductEditModal';

export const LunchBaseProduct = observer(() => {
  const {t} = useTranslation();
  const isMobile = useMediaQuery('(max-width: 650px)');
  const {id} = useParams();

  const handleAddLunchProduct = () => {
    lunchStore.setIsOneLunchProductAddModal(true);
    lunchStore.setIsSingleLunchProduct(null);
  };

  useEffect(() => {
    lunchStore.getOneLunchProduct(id!);
  }, [id, lunchStore.getOneLunchProduct]);

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
        <Typography variant="h4" gutterBottom>
          Lunch Product
        </Typography>
        <div style={{display: 'flex', gap: '10px'}}>
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={handleAddLunchProduct}
          >
            New Product
          </Button>
        </div>
      </Stack>

      <Table
        columns={lunchProductColumn}
        data={lunchStore.lunchOneProduct}
        pagination={false}
        isMobile={isMobile}
      />
      {lunchStore.isOneLunchProductAddModal && <AddLunchProduct /> }
      {lunchStore.isOneLunchProductEditModal && <EditLunchProduct /> }
    </>
  );
});

import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigate, useParams} from 'react-router-dom';
import {observer} from 'mobx-react';
import {Button, Stack, Typography} from '@mui/material';
import Iconify from '../../../../components/iconify/Iconify';
import {Table} from '../../../../components/table';
import {ROUTES} from '../../../../constants/router';
import {lunchStore} from '../../../../store/lunch';
import {useMediaQuery} from '../../../../utils/hooks/useMediaQuery';
// import {ProductModal} from '../Products/ProductModal';
import {lunchProductColumn} from './constant';

export const LunchBaseProduct = observer(() => {
  const {t} = useTranslation();
  const isMobile = useMediaQuery('(max-width: 650px)');
  const {id} = useParams();

  // const handleAddLunchBase = () => {
  //   lunchStore.setSingleLunchId(id!);
  //   lunchStore.setIsOpenLunchBaseModal(true);
  //   lunchStore.setSingleLunch(null);
  // };

  // const handleAddLunchBaseProductModal = () => {
  //   lunchStore.setLunchBaseProductAddEditModal(true);
  // };

  useEffect(() => {
    // if (!id) {
    //   navigate(ROUTES.lunch);

    //   return;
    // }

    // lunchStore.getLunchBases();
    lunchStore.getOneLunchProduct(id!);
  }, []);

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
        <Typography variant="h4" gutterBottom>
          Lunch Product
        </Typography>
        <div style={{display: 'flex', gap: '10px'}}>
          {/* <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={handleAddLunchBase}
          >
            {t('newLunch')}
          </Button> */}
        </div>
      </Stack>

      <Table
        columns={lunchProductColumn}
        data={lunchStore.lunchBases}
        pagination={false}
        isMobile={isMobile}
      />

      {/* {lunchStore.isOpenLunchModal && <LunchBaseAddModal />}
      {lunchStore.isOpenSingleFoodProductModal && <ProductModal />}
      {lunchStore.isLunchEditModal && <AddLunchModal /> } */}
    </>
  );
});

import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigate, useParams} from 'react-router-dom';
import {observer} from 'mobx-react';
import {Button, Stack, Typography} from '@mui/material';
import Iconify from '../../../components/iconify';
import {Table} from '../../../components/table';
import {ROUTES} from '../../../constants/router';
import {lunchStore} from '../../../store/lunch';
import {useMediaQuery} from '../../../utils/hooks/useMediaQuery';
import {lunchBaseColumns} from '../constants';
import {LunchBaseAddModal} from './LunchBaseAddModal/LunchBaseAddModal';

export const LunchBase = observer(() => {
  const {t} = useTranslation();
  const isMobile = useMediaQuery('(max-width: 650px)');
  const {id} = useParams();
  const navigate = useNavigate();

  const handleAddLunchBase = () => {
    lunchStore.setSingleLunchId(id!);
    lunchStore.setIsOpenLunchBaseModal(true);
  };

  useEffect(() => {
    if (!id) {
      navigate(ROUTES.lunch);

      return;
    }

    lunchStore.getLunchBases(id);
  }, [id]);

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
        <Typography variant="h4" gutterBottom>
          {t('lunch')}
        </Typography>
        <Button
          variant="contained"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleAddLunchBase}
        >
          {t('newLunch')}
        </Button>
      </Stack>

      <Table
        columns={lunchBaseColumns}
        data={lunchStore.lunchBases}
        pagination={false}
        isMobile={isMobile}
      />

      {lunchStore.isOpenLunchModal && <LunchBaseAddModal />}
    </>
  );
});

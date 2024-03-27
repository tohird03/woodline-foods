import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {observer} from 'mobx-react';
import {Button, Stack, Typography} from '@mui/material';
import Iconify from '../../components/iconify';
import {Table} from '../../components/table';
import {lunchStore} from '../../store/lunch';
import {mealPollStore} from '../../store/mealpoll';
import {useMediaQuery} from '../../utils/hooks/useMediaQuery';
import {mealPollColumns} from './constants';

export const MealPoll = observer(() => {
  const {t} = useTranslation();
  const isMobile = useMediaQuery('(max-width: 650px)');

  const handleChangePage = (newPage: number) => {
    lunchStore.setPage(newPage + 1);
  };

  const handleChangePerPage = (perPage: number, page: number) => {
    mealPollStore.setPage(page);
    mealPollStore.setSize(perPage);
  };


  useEffect(() => {
    mealPollStore.getMealPoll({
      page: mealPollStore.page,
      size: mealPollStore.size,
    });
  }, [mealPollStore.page, lunchStore.size]);

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
        <Typography variant="h4" gutterBottom>
          Meal Poll
        </Typography>
        {/* <Button
          variant="contained"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleAddNewProduct}
        >
          {t('newLunchBase')}
        </Button> */}
      </Stack>

      <Table
        columns={mealPollColumns}
        data={mealPollStore.mealPolls}
        pagination={{
          total: mealPollStore.totalMealPolls,
          page: mealPollStore.page,
          size: mealPollStore.size,
          handlePageChange: handleChangePage,
          handleShowSizeChange: handleChangePerPage,
        }}
        isMobile={isMobile}
      />
    </>
  );
});

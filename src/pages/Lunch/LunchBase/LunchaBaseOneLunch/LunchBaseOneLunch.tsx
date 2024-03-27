import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {observer} from 'mobx-react';
import {Stack, Typography} from '@mui/material';
import {Table} from '../../../../components/table';
import {lunchStore} from '../../../../store/lunch';
import {useMediaQuery} from '../../../../utils/hooks/useMediaQuery';
import {lunchProductColumn} from './constant';

export const LunchBaseProduct = observer(() => {
  const isMobile = useMediaQuery('(max-width: 650px)');
  const {id} = useParams();

  useEffect(() => {
    lunchStore.getOneLunchProduct(id!);
  }, []);

  console.log(lunchStore?.lunchOneProduct);


  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
        <Typography variant="h4" gutterBottom>
          Lunch Product
        </Typography>
      </Stack>

      <Table
        columns={lunchProductColumn}
        data={lunchStore?.lunchOneProduct || []}
        pagination={false}
        isMobile={isMobile}
      />
    </>
  );
});

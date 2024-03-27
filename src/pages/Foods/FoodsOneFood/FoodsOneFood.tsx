import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {observer} from 'mobx-react';
import {Button, Stack, Typography} from '@mui/material';
import Iconify from '../../../components/iconify/Iconify';
import {Table} from '../../../components/table';
import {foodsStore} from '../../../store/foods';
import {useMediaQuery} from '../../../utils/hooks/useMediaQuery';
import {foodColumn} from './constant';
import {AddFoodProduct} from './FoodOneFoodProductAddModal';
import {EditFoodProduct} from './FoodOneFoodProductEditModal/FoodOneFoodProductEditModal';

export const FoodsOneFood = observer(() => {
  const isMobile = useMediaQuery('(max-width: 650px)');
  const {id} = useParams();

  useEffect(() => {
    foodsStore.getOneFood(id!);
  }, []);

  const handleAddFoodProduct = () => {
    foodsStore.setIsOneFoodProductAddModal(true);
    foodsStore.setIsSingleFoodProduct(null);
  };


  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
        <Typography variant="h4" gutterBottom>
          Food Product
        </Typography>
        <div style={{display: 'flex', gap: '10px'}}>
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={handleAddFoodProduct}
          >
            New Product
          </Button>
        </div>
      </Stack>

      <Table
        columns={foodColumn}
        data={foodsStore.getOneFoodProduct}
        pagination={false}
        isMobile={isMobile}
      />

      {foodsStore.isOneFoodProductAddModal && <AddFoodProduct /> }
      {foodsStore.isOneFoodProductEditModal && <EditFoodProduct /> }
    </>
  );
});

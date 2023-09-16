import React from 'react';
import {observer} from 'mobx-react';
import {Button, Chip} from '@mui/material';
import {IOrderFoods} from '../../../api/order/types';
import {orderStore} from '../../../store/order';

type Props = {
  foods: IOrderFoods[];
};

export const OrderProduct = observer(({foods}: Props) => {

  const handleOpenProductModal = () => {
    orderStore.setFoods(foods);
    orderStore.setIsOpenOrderProductModal(true);
  };

  return (
    <Chip
      color="primary"
      sx={{color: 'white'}}
      onClick={handleOpenProductModal}
      label={foods?.length}
    />
  );
});

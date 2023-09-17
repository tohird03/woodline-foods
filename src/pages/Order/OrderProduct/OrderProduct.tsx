import React from 'react';
import {observer} from 'mobx-react';
import {Chip} from '@mui/material';
import {IOrderFoods} from '../../../api/order/types';
import {orderStore} from '../../../store/order';
import {orderStyles} from '../styles';

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
      sx={orderStyles.orderProductChip}
      onClick={handleOpenProductModal}
      label={foods?.length}
    />
  );
});

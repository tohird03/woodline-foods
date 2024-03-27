import React from 'react';
import {observer} from 'mobx-react';
import {Chip} from '@mui/material';
import {IFoodsProducts} from '../../../api/foods/types';
import {foodsStore} from '../../../store/foods';
import {foodStyles} from '../styles';

type Props = {
  product: IFoodsProducts[];
};

export const Products = observer(({product}: Props) => {

  const handleOpenProductModal = () => {
    foodsStore.setSingleFoodProducts(product);
    foodsStore.setIsOpenFoodProductModal(true);
  };

  return (
    <Chip
      color="primary"
      sx={foodStyles.orderProductChip}
      onClick={handleOpenProductModal}
      label={product?.length || 0}
    />
  );
});

import React from 'react';
import {observer} from 'mobx-react';
import {Chip} from '@mui/material';
import {IFoodsProducts} from '../../../api/foods/types';
import {lunchStore} from '../../../store/lunch';
import {foodStyles} from '../styles';

type Props = {
  product: IFoodsProducts[];
};

export const Products = observer(({product}: Props) => {

  const handleOpenProductModal = () => {
    lunchStore.setSingleFoodProducts(product);
    lunchStore.setIsOpenFoodProductModal(true);
  };

  return (
    <Chip
      color="primary"
      sx={foodStyles.orderProductChip}
      onClick={handleOpenProductModal}
      label={product?.length}
    />
  );
});

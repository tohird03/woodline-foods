import React from 'react';
import {observer} from 'mobx-react';
import {Chip} from '@mui/material';
import {IUserOrdersFoods} from '../../../../api/users/types';
import {usersStore} from '../../../../store/users';

type Props = {
  foods: IUserOrdersFoods[];
};

export const OrderProduct = observer(({foods}: Props) => {

  const handleOpenProductModal = () => {
    usersStore.setFoods(foods);
    usersStore.setIsOpenOrderProductModal(true);
  };

  return (
    <Chip
      color="primary"
      // sx={orderStyles.orderProductChip}
      onClick={handleOpenProductModal}
      label={foods?.length}
    />
  );
});

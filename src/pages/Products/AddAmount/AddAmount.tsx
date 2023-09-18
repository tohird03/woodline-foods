import React from 'react';
import {observer} from 'mobx-react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {IconButton} from '@mui/material';
import {IProducts} from '../../../api/products/types';
import {productStore} from '../../../store/products';

type Props = {
  product: IProducts;
};

export const AddAmount = observer(({product}: Props) => {

  const handleOpenModal = () => {
    productStore.setSingleProduct(product);
    productStore.setIsAmountModal(true);
  };

  return (
    <IconButton onClick={handleOpenModal}>
      <AddCircleOutlineIcon />
    </IconButton>
  );
});

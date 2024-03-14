import React from 'react';
import {observer} from 'mobx-react';
import EditIcon from '@mui/icons-material/Edit';
import {IconButton} from '@mui/material';
import {IProducts} from '../../../api/products/types';
import {productStore} from '../../../store/products';
type Props = {
  product: IProducts;
};

export const EditProduct = observer(({product}: Props) => {

  const handleEdit = () => {
    productStore.setIsOpenProductEditModal(true);
    productStore.setEditProduct(product);
  };

  return (
    <IconButton onClick={handleEdit}>
      <EditIcon style={{cursor: 'pointer'}} />
    </IconButton>
  );
});

import React from 'react';
import {observer} from 'mobx-react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {IconButton} from '@mui/material';
import {productApi} from '../../../api/products';
import {IProducts} from '../../../api/products/types';
import {productStore} from '../../../store/products';
import {addAxiosErrorNotification, successNotification} from '../../../utils/notification';

type Props = {
  product: IProducts;
};

export const EditProduct = observer(({product}: Props) => {

  const handleEdit = () => {
    productStore.setIsOpenProductEditModal(true);
    productStore.setEditProduct(product);
  };

  const handleDelete = () => {
    productApi.deleteProduct(product._id)
      .then(res => {
        if (res) {
          successNotification('Успех обновленных');
          productApi.getProducts({
            page: productStore.page,
            size: productStore.size,
            search: productStore.search!,
          });
        }
      })
      .catch(addAxiosErrorNotification);
  };

  return (
    <>
      <IconButton onClick={handleEdit}>
        <EditIcon color="primary" style={{cursor: 'pointer'}} />
      </IconButton>

      <IconButton onClick={handleDelete}>
        <DeleteIcon color="error" style={{cursor: 'pointer'}} />
      </IconButton>
    </>
  );
});

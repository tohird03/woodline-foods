import React from 'react';
import {useParams} from 'react-router-dom';
import {observer} from 'mobx-react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {Button} from 'antd';
import {foodsApi} from '../../../../api/foods';
import {IGetOneFoodProductObj} from '../../../../api/foods/types';
import {foodsStore} from '../../../../store/foods';
import {addAxiosErrorNotification, successNotification} from '../../../../utils/notification';

type Props = {
  product: IGetOneFoodProductObj;
};

export const OneFoodProductAction = observer(({product}: Props) => {
  const {id} = useParams();

  const handleEditFoodProduct = () => {
    foodsStore.setIsSingleFoodProduct(product);
    foodsStore.setIsOneFoodProductEditModal(true);
  };

  const handleDeleteFoodProduct = () => {
    foodsApi.deleteFoodProduct(id!, product?.product?._id)
      .then(res => {
        if (res) {
          successNotification('Успех обновленных');
          foodsStore.getOneFood(id!);
        }
      })
      .catch(addAxiosErrorNotification);
  };

  return (
    <div>
      <Button onClick={handleEditFoodProduct} icon={<EditIcon color="primary" />} />
      <Button onClick={handleDeleteFoodProduct} icon={<DeleteIcon color="error" />} />
    </div>
  );
});

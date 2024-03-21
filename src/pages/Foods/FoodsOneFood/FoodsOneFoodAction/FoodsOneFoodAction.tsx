import React from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {observer} from 'mobx-react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FlipCameraIosIcon from '@mui/icons-material/FlipCameraIos';
import {Button} from 'antd';
import {foodsApi} from '../../../../api/foods';
import {IAddOneFoodProduct, IGetOneFoodProduct} from '../../../../api/foods/types';
import {ROUTES} from '../../../../constants/router';
import {foodsStore} from '../../../../store/foods';
import {addAxiosErrorNotification, successNotification} from '../../../../utils/notification';

type Props = {
  product: IGetOneFoodProduct;
};

export const OneFoodProductAction = observer(({product}: Props) => {
  const navigate = useNavigate();
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

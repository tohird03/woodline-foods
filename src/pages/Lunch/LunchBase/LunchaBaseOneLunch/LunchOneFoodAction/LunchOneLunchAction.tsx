import React from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {observer} from 'mobx-react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FlipCameraIosIcon from '@mui/icons-material/FlipCameraIos';
import {Button} from 'antd';
import {lunchApi} from '../../../../../api/lunch';
import {IGetOneLunchProducts} from '../../../../../api/lunch/types';
import {lunchStore} from '../../../../../store/lunch';
import {addAxiosErrorNotification, successNotification} from '../../../../../utils/notification';

type Props = {
  product: IGetOneLunchProducts;
};

export const OneLunchProductAction = observer(({product}: Props) => {
  const navigate = useNavigate();
  const {id} = useParams();

  const handleEditLunchProduct = () => {
    lunchStore.setIsSingleLunchProduct(product);
    lunchStore.setIsOneLunchProductEditModal(true);
    console.log(true);
  };

  const handleDeleteFoodProduct = () => {
    lunchApi.deleteLunchProduct(id!, product?.product?._id)
      .then(res => {
        if (res) {
          successNotification('Успех обновленных');
          lunchStore.getOneLunch(id!);
        }
      })
      .catch(addAxiosErrorNotification);
  };

  return (
    <div>
      <Button onClick={handleEditLunchProduct} icon={<EditIcon color="primary" />} />
      <Button onClick={handleDeleteFoodProduct} icon={<DeleteIcon color="error" />} />
    </div>
  );
});

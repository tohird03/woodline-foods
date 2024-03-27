import React from 'react';
import {useNavigate} from 'react-router-dom';
import {observer} from 'mobx-react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FlipCameraIosIcon from '@mui/icons-material/FlipCameraIos';
import {Button} from 'antd';
import {foodsApi} from '../../../api/foods';
import {IFoods} from '../../../api/foods/types';
import {ROUTES} from '../../../constants/router';
import {foodsStore} from '../../../store/foods';
import {addAxiosErrorNotification, successNotification} from '../../../utils/notification';

type Props = {
  food: IFoods;
};

export const Action = observer(({food}: Props) => {
  const navigate = useNavigate();

  const handleImgUpload = () => {
    foodsStore.setFoodId(food?._id);
    foodsStore.setIsOpenImgUpload(true);
  };

  const handleEditFoods = () => {
    foodsStore.setSingleFood(food);
    navigate(ROUTES.foodEdit);
  };

  const handleDeleteFood = () => {
    foodsApi.deleteFood(food._id)
      .then(res => {
        if (res) {
          successNotification('Успех обновленных');
          foodsStore.getFoods({});
        }
      })
      .catch(addAxiosErrorNotification);
  };

  return (
    <div style={{gap: '10px', display: 'flex'}}>
      <Button onClick={handleImgUpload} icon={<FlipCameraIosIcon color="primary" />} />
      <Button onClick={handleEditFoods} icon={<EditIcon color="primary" />} />
      <Button onClick={handleDeleteFood} icon={<DeleteIcon color="error" />} />
    </div>
  );
});

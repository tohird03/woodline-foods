import React from 'react';
import {useNavigate} from 'react-router-dom';
import {observer} from 'mobx-react';
import EditIcon from '@mui/icons-material/Edit';
import FlipCameraIosIcon from '@mui/icons-material/FlipCameraIos';
import {Button} from 'antd';
import {IFoods} from '../../../api/foods/types';
import {ROUTES} from '../../../constants/router';
import {foodsStore} from '../../../store/foods';

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

  return (
    <div style={{gap: '10px', display: 'flex'}}>
      <Button onClick={handleImgUpload} icon={<FlipCameraIosIcon color="primary" />} />
      <Button onClick={handleEditFoods} icon={<EditIcon color="primary" />} />
    </div>
  );
});

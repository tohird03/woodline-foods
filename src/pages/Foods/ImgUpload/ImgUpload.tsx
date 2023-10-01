import React from 'react';
import {observer} from 'mobx-react';
import FlipCameraIosIcon from '@mui/icons-material/FlipCameraIos';
import {Button} from 'antd';
import {foodsStore} from '../../../store/foods';

export const ImgUpload = observer(({food}: {food: string}) => {

  const handleImgUpload = () => {
    foodsStore.setFoodId(food);
    foodsStore.setIsOpenImgUpload(true);
  };

  return (
    <Button onClick={handleImgUpload} icon={<FlipCameraIosIcon color="primary" />} />
  );
});

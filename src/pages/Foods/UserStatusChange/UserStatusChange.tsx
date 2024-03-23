import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {FormControlLabel} from '@mui/material';
import {IProducts} from '../../../api/foods/types';
import {foodsStore} from '../../../store/foods';
import {IOSSwitch} from '../styles';

type UserProps = {
  food: IProducts;
};

export const UserStatusChange = observer(({food}: UserProps) => {
  const [loading, setLoading] = useState(false);

  const handleCheckVerify = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.checked;

    setLoading(true);

    foodsStore.changeVerify({
      id: food?._id,
      is_private: newValue,
    })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <FormControlLabel
      style={{margin: '0'}}
      label=""
      control={
        <IOSSwitch
          defaultChecked={!food?.is_deleted}
          onChange={handleCheckVerify}
          disabled={loading}
        />}
    />
  );
});

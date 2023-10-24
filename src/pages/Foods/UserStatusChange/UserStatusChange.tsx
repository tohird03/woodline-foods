import React from 'react';
import {observer} from 'mobx-react';
import {FormControlLabel} from '@mui/material';
import {useBoolean} from 'usehooks-ts';
import {IProducts} from '../../../api/foods/types';
import {foodsStore} from '../../../store/foods';
import {foodStyles, IOSSwitch} from '../styles';

type UserProps = {
  food: IProducts;
};

export const UserStatusChange = observer(({food}: UserProps) => {
  const {value: loading, setTrue, setFalse} = useBoolean(false);

  const handleCheckVerify = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.checked;

    setTrue();

    foodsStore.changeVerify({
      id: food?._id,
      status: !newValue,
    })
      .finally(() => {
        setFalse();
      });
  };

  return (
    <FormControlLabel
      style={foodStyles.formStatusChangeFormControlLabel}
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

import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {FormControlLabel} from '@mui/material';
import {IGetLunchBase, ILunchs} from '../../../../api/lunch/types';
import {lunchStore} from '../../../../store/lunch';
// import {IProducts} from '../../../api/foods/types';
// import {foodsStore} from '../../../store/foods';
import {IOSSwitch} from '../../../Users/styles';

type LunchProps = {
  lunch: IGetLunchBase;
};

export const LunchStatusChangeIn = observer(({lunch}: LunchProps) => {
  const [loading, setLoading] = useState(false);

  const handleCheckVerify = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.checked;

    setLoading(true);

    lunchStore.changeVerify({
      _id: lunch?._id,
      is_active: newValue,
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
          defaultChecked={lunch?.is_active}
          onChange={handleCheckVerify}
          disabled={loading}
        />}
    />
  );
});

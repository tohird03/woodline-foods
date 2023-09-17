import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {FormControlLabel} from '@mui/material';
import {IUsers} from '../../../api/users/types';
import {usersStore} from '../../../store/users';
import {IOSSwitch} from '../styles';

type UserProps = {
  user: IUsers;
};

export const UserStatusChange = observer(({user}: UserProps) => {
  const [loading, setLoading] = useState(false);

  const handleCheckVerify = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.checked;

    setLoading(true);

    usersStore.userStatusChange({
      id: user?._id,
      is_active: newValue,
    })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <FormControlLabel
      label=""
      control={
        <IOSSwitch
          defaultChecked={user?.is_active}
          onChange={handleCheckVerify}
          disabled={loading}
        />}
    />
  );
});

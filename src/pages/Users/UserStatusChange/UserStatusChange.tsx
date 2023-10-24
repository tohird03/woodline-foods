import React from 'react';
import {observer} from 'mobx-react';
import {FormControlLabel} from '@mui/material';
import {useBoolean} from 'usehooks-ts';
import {IUsers} from '../../../api/users/types';
import {usersStore} from '../../../store/users';
import {IOSSwitch, UsersStyles} from '../styles';

type UserProps = {
  user: IUsers;
};

export const UserStatusChange = observer(({user}: UserProps) => {
  const {value: loading, setTrue, setFalse} = useBoolean(false);


  const handleCheckVerify = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.checked;

    setTrue();

    usersStore.userStatusChange({
      id: user?._id,
      is_active: newValue,
    })
      .finally(() => {
        setFalse();
      });
  };

  return (
    <FormControlLabel
      style={UsersStyles.switch}
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

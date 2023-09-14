import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {FormControlLabel} from '@mui/material';
import {styled} from '@mui/material/styles';
import Switch, {SwitchProps} from '@mui/material/Switch';
import {IUsers} from '../../../api/users/types';
import {usersStore} from '../../../store/users';

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({theme}) => ({
  width: 42,
  height: 20,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(22px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 16,
    height: 16,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

type UserProps = {
  user: IUsers;
};

export const UserStatusChange = observer(({user}: UserProps) => {
  const [loading, setLoading] = useState(false);

  const handleCheckVerify = () => {
    setLoading(true);

    usersStore.userStatusChange(user?._id)
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

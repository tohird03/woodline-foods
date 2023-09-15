import React from 'react';
import {observer} from 'mobx-react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {IconButton} from '@mui/material';
import {IUsers} from '../../../api/users/types';
import {usersStore} from '../../../store/users';

type UserProps = {
  user: IUsers;
};

export const AddBalance = observer(({user}: UserProps) => {

  const handleOpenModal = () => {
    usersStore.setSingleUser(user);
    usersStore.setIsOpenBalanceModal(true);
  };

  return (
    <IconButton onClick={handleOpenModal}>
      <AddCircleOutlineIcon />
    </IconButton>
  );
});

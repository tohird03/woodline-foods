import React from 'react';
import {observer} from 'mobx-react';
import DeleteIcon from '@mui/icons-material/Delete';
import {IconButton} from '@mui/material';
import {IUsers} from '../../../api/users/types';
import {usersStore} from '../../../store/users';

type UserProps = {
  user: IUsers;
};

export const DeleteUser = observer(({user}: UserProps) => {
  const handleModalOpen = () => {
    usersStore.setSingleUser(user);
    usersStore.setSingleUserId(user._id);
    usersStore.setIsOpenDeleteUserModal(true);
  };

  return (
    <>
      <IconButton onClick={handleModalOpen}>
        <DeleteIcon />
      </IconButton>
    </>
  );
});

import React from 'react';
import {observer} from 'mobx-react';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import {IconButton} from '@mui/material';
import {IUsers} from '../../../api/users/types';
import {usersStore} from '../../../store/users';

type UserProps = {
  user: IUsers;
};

export const ChangeRole = observer(({user}: UserProps) => {

  const handleChangeRoleModalOpen = () => {
    usersStore.setSingleUser(user);
    usersStore.setIsOpenChangeRoleModal(true);
  };

  return (
    <IconButton onClick={handleChangeRoleModalOpen}>
      <ManageAccountsIcon />
    </IconButton>
  );
});

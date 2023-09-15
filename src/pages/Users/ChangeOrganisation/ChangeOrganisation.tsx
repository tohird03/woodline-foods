import React from 'react';
import {observer} from 'mobx-react';
import EditIcon from '@mui/icons-material/Edit';
import {IconButton} from '@mui/material';
import {IUsers} from '../../../api/users/types';
import {usersStore} from '../../../store/users';

type UserProps = {
  user: IUsers;
};

export const ChangeOrganisation = observer(({user}: UserProps) => {

  const handleOpenModal = () => {
    usersStore.setSingleUser(user);
    usersStore.setIsOpenOrganisationModal(true);
  };

  return (
    <IconButton onClick={handleOpenModal}>
      <EditIcon />
    </IconButton>
  );
});

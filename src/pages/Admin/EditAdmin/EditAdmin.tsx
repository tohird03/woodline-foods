import React from 'react';
import Edit from '@mui/icons-material/Edit';
import {IconButton} from '@mui/material';
import {adminStore} from '../../../store/admin';

export const EditAdmin = () => {
  const handleModalOpen = () => {
    adminStore.setIsOpenEditAdminModal(true);
  };

  return (
    <IconButton onClick={handleModalOpen}>
      <Edit />
    </IconButton>
  );
};

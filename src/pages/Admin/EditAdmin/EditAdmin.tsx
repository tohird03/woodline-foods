import React from 'react';
import Edit from '@mui/icons-material/Edit';
import {IconButton} from '@mui/material';
import {adminStore} from '../../../store/admin';
import { observer } from 'mobx-react';

export const EditAdmin = observer(() => {
    const handleModalOpen = () => {
      adminStore.setIsOpenEditAdminModal(true);
    };

    return (
      <IconButton onClick={handleModalOpen}>
        <Edit />
      </IconButton>
    );
  }
);
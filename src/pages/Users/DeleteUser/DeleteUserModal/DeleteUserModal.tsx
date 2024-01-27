import React from 'react';
import {observer} from 'mobx-react';
import {Button, Card, Modal, Typography} from '@mui/material';
import {usersApi} from '../../../../api/users';
import {usersStore} from '../../../../store/users';
import {addAxiosErrorNotification, successNotification} from '../../../../utils/notification';

const modalStyles = {
  width: '600px',
  maxWidth: '90%',
  margin: 'auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: 16,
  borderRadius: 8,
};

const DeleteUserModal = observer(() => {
  const handleClose = () => {
    usersStore.setIsOpenDeleteUserModal(false);
  };

  const handleDeleteUser = () => {
    usersApi
      .deleteUser({
        userId: usersStore.singleUserId,
      })
      .then(res => {
        if (res) {
          successNotification('User successfully deleted');
          handleClose();
        }
      })
      .catch(addAxiosErrorNotification);
  };

  return (
    <Modal onClose={handleClose} sx={modalStyles} open={usersStore.isOpenDeleteUserModal}>
      <div style={{width: '100%'}}>
        <Card sx={{width: '100%', padding: '15px'}}>
          <Typography variant="h6" sx={{marginBottom: 4}}>
          Delete User
          </Typography>

          <Typography sx={{marginBottom: 4}}>
          Are you sure you want to delete this user?
          </Typography>

          <div style={{display: 'flex', justifyContent: 'space-around', width: '100%'}}>
            <Button
              style={{marginTop: '10px'}}
              onClick={handleClose}
              variant="contained"
              color="primary"
            >
            No
            </Button>
            <Button
              style={{marginTop: '10px'}}
              onClick={handleDeleteUser}
              variant="contained"
              color="error"
            >
            Yes
            </Button>
          </div>
        </Card>
      </div>
    </Modal>
  );
});

export default DeleteUserModal;

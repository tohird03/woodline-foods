import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import {Button, TextField} from '@mui/material';
import {Modal} from '../../../../components/Modal';
import {usersStore} from '../../../../store/users';

export const AddBalanceModal = observer(() => {

  const handleClose = () => {
    usersStore.setIsOpenBalanceModal(false);
  };

  useEffect(() => () => {
    usersStore.setOrganisation([]);
    usersStore.setSingleUser(null);
  }, []);


  return (
    <Modal
      open={usersStore.isOpenBalanceModal}
      onButtonClose={handleClose}
      title="Add balance"
      width={400}
    >
      <TextField
        label="Balance"
        type="number"
        required
        minRows={0}
        sx={{margin: '10px 0', width: '100%'}}
      />

      <Button
        variant="contained"
        sx={{width: '100%'}}
        type="submit"
      >
        Add balance
      </Button>
    </Modal>
  );
});

import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {Box, Button, Dialog} from '@mui/material';
import {sentenceCase} from 'change-case';
import {IUsers} from '../../../api/users/types';
import Label from '../../../components/label';
import {Modal} from '../../../components/Modal';
import {usersStore} from '../../../store/users';

type Props = {
  user: IUsers;
};

export const ChangeVerify = observer(({user}: Props) => {
  const [openConfirm, setOpenConfirm] = useState(false);
  const isVerifyColor = user?.is_verified ? 'success' : 'error';
  const isVerifyText = user?.is_verified ? 'Verify' : 'Not Verify';
  const isCursor = user?.is_verified ? 'initial' : 'pointer';

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleClose = () => {
    setOpenConfirm(false);
  };

  const handleRegisterUser = () => {
    usersStore.changeUserVerify(user?._id)
      .finally(() => {
        handleClose();
      });
  };

  return (
    <>
      <Label
        onClick={!user?.is_verified ? handleOpenConfirm : undefined}
        sx={{cursor: isCursor}} color={isVerifyColor} variant={'outlined'}
      >
        {sentenceCase(isVerifyText)}
      </Label>

      <Modal
        open={openConfirm}
        onButtonClose={handleClose}
        width={400}
      >
        Вы уверены, что хотите зарегистрировать этого пользователя?
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            flexDirection: 'row !important',
            gap: '20px',
            marginTop: '10px',
          }}
        >
          <Button
            color="error"
            variant="contained"
            onClick={handleClose}
          >
            Нет
          </Button>
          <Button
            variant="contained"
            onClick={handleRegisterUser}
          >
            Да
          </Button>
        </Box>
      </Modal>
    </>
  );
});

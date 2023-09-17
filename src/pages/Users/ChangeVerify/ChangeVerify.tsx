import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {Box, Button} from '@mui/material';
import {sentenceCase} from 'change-case';
import {IUsers} from '../../../api/users/types';
import Label from '../../../components/label';
import {Modal} from '../../../components/Modal';
import {usersStore} from '../../../store/users';
import {UsersStyles} from '../styles';

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
        sx={{cursor: isCursor}}
        color={isVerifyColor}
        variant="outlined"
      >
        {sentenceCase(isVerifyText)}
      </Label>

      <Modal
        open={openConfirm}
        onButtonClose={handleClose}
      >
        Вы уверены, что хотите зарегистрировать этого пользователя?
        <Box sx={UsersStyles.changeVerifyConfirm}>
          <Button
            onClick={handleClose}
            color="error"
            variant="contained"
          >
            Нет
          </Button>
          <Button
            onClick={handleRegisterUser}
            variant="contained"
          >
            Да
          </Button>
        </Box>
      </Modal>
    </>
  );
});

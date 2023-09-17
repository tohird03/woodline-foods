import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from '@mui/material';
import {useFormik} from 'formik';
import {TransactionType} from '../../../../api/users/types';
import {Modal} from '../../../../components/Modal';
import {usersStore} from '../../../../store/users';
import {UsersStyles} from '../../styles';

export const AddBalanceModal = observer(() => {
  const formik = useFormik({
    initialValues: {
      amount: 0,
      type: null,
    },
    onSubmit: values => {
      usersStore.addBalance({
        amount: values.amount,
        type: values.type === TransactionType.ADD,
        user: usersStore.singleUser?._id!,
      })
        .finally(() => {
          handleClose();
        });
    },
  });

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
      title="Change balance"
    >
      <form onSubmit={formik.handleSubmit}>
        <TextField
          onChange={formik.handleChange}
          sx={UsersStyles.addBalanceTextFeild}
          inputProps={{min: 0}}
          minRows={0}
          label="Balance"
          name="amount"
          type="number"
          required
        />
        <FormControl sx={UsersStyles.addBalanceFormControl} fullWidth>
          <InputLabel>Type</InputLabel>
          <Select
            onChange={formik.handleChange}
            label="Type"
            name="type"
            required
          >
            <MenuItem value={TransactionType.ADD}>
              Plus
            </MenuItem>
            <MenuItem value={TransactionType.SUBTRACT}>
              Minus
            </MenuItem>
          </Select>
        </FormControl>

        <Button
          sx={UsersStyles.addBalanceSubmitBtn}
          variant="contained"
          type="submit"
        >
          Change balance
        </Button>
      </form>
    </Modal>
  );
});

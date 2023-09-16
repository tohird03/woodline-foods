import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import {Button, MenuItem, Select, TextField} from '@mui/material';
import {useFormik} from 'formik';
import {Modal} from '../../../../components/Modal';
import {usersStore} from '../../../../store/users';

export const AddBalanceModal = observer(() => {
  const formik = useFormik({
    initialValues: {
      amount: 0,
      type: true,
    },
    onSubmit: values => {

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
      width={400}
    >
      <form>
        <TextField
          label="Balance"
          type="number"
          required
          minRows={0}
          sx={{margin: '10px 0', width: '100%'}}
          inputProps={{min: 0}}
        />
        <Select
          name="type"
          label="Type"
          onChange={formik.handleChange}
          required
          defaultValue={usersStore?.singleUser?.org?._id}
        >
          <MenuItem value={1}>
            Plus
          </MenuItem>
          <MenuItem value={2}>
            Minus
          </MenuItem>
        </Select>

        <Button
          variant="contained"
          sx={{width: '100%'}}
          type="submit"
        >
          Change balance
        </Button>
      </form>
    </Modal>
  );
});

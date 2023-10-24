import React from 'react';
import {observer} from 'mobx-react';
import {Button, TextField} from '@mui/material';
import {useFormik} from 'formik';
import {Modal} from '../../../../components/Modal';
import {lunchStore} from '../../../../store/lunch';
import {foodStyles, lunchStyles} from '../../styles';

export const LunchBaseAddModal = observer(() => {

  const formik = useFormik({
    initialValues: {
      name: '',
      cost: 0,
    },
    onSubmit: values => {
      lunchStore.addLunchBase({
        ...values,
        id: lunchStore.singleLunchId!,
      })
        .finally(() => {
          handleClose();
        });
    },
  });

  const handleClose = () => {
    lunchStore.setIsOpenLunchBaseModal(false);
  };

  return (
    <Modal
      open={lunchStore.isOpenLunchModal}
      onButtonClose={handleClose}
      width={400}
      title="Add new lunch"
    >
      <form onSubmit={formik.handleSubmit}>
        <TextField
          sx={lunchStyles.addLunchTextFeild}
          placeholder="New lunch name"
          name="name"
          onChange={formik.handleChange}
          value={formik.values.name}
          required
        />

        <TextField
          label="Cost"
          value={formik.values.cost}
          type="number"
          onChange={formik.handleChange}
          inputProps={{min: 0}}
          minRows={0}
          required
          name="cost"
          sx={lunchStyles.addLunchTextFeild}
        />

        <Button sx={foodStyles.lunchModalButton} type="submit" variant="contained">
        Add new Lunch
        </Button>
      </form>
    </Modal>
  );
});

import React from 'react';
import {observer} from 'mobx-react';
import {Button, TextField} from '@mui/material';
import {useFormik} from 'formik';
import {Modal} from '../../../components/Modal';
import {organisationStore} from '../../../store/organisation';

export const AddOrganisation = observer(() => {

  const formik = useFormik({
    initialValues: {
      name_org: '',
    },
    onSubmit: values => {
      organisationStore.addOrganisation(values.name_org)
        .finally(() => {
          handleClose();
        });
    },
  });

  const handleClose = () => {
    organisationStore.setIsOpenAddOrganisation(false);
  };

  return (
    <Modal
      open={organisationStore.isOpenAddOrganisation}
      onButtonClose={handleClose}
      title="Add new organisation"
      width={400}
    >
      <form onSubmit={formik.handleSubmit}>
        <TextField
          sx={{width: '100%', marginBottom: '10px'}}
          placeholder="New Organisation name"
          name="name_org"
          onChange={formik.handleChange}
          value={formik.values.name_org}
          required
        />
        <Button
          sx={{display: 'block', marginLeft: 'auto', width: '100px'}}
          variant="contained"
          type="submit"
        >
          Add
        </Button>
      </form>
    </Modal>
  );
});

import React from 'react';
import {observer} from 'mobx-react';
import {Button, TextField} from '@mui/material';
import {useFormik} from 'formik';
import {Modal} from '../../../components/Modal';
import {organisationStore} from '../../../store/organisation';
import {MODAL_WIDTH} from '../constants';
import {organisationStyles} from '../styles';

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
      width={MODAL_WIDTH}
    >
      <form onSubmit={formik.handleSubmit}>
        <TextField
          sx={organisationStyles.addOrganisationTextFeild}
          onChange={formik.handleChange}
          value={formik.values.name_org}
          placeholder="New Organisation name"
          name="name_org"
          required
        />
        <Button
          sx={organisationStyles.addOrganisationSubmitButton}
          variant="contained"
          type="submit"
        >
          Add
        </Button>
      </form>
    </Modal>
  );
});

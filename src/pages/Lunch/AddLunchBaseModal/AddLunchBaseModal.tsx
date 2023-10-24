import React, {useEffect, useMemo} from 'react';
import {observer} from 'mobx-react';
import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from '@mui/material';
import {useFormik} from 'formik';
import {IOrganisation} from '../../../api/foods/types';
import {Modal} from '../../../components/Modal';
import {foodsStore} from '../../../store/foods';
import {lunchStore} from '../../../store/lunch';
import {foodStyles, lunchStyles} from '../styles';

export const AddLunchBaseModal = observer(() => {
  const formik = useFormik({
    initialValues: {
      name: '',
      org: '',
    },
    onSubmit: values => {
      lunchStore.addLunchs(values)
        .finally(() => {
          handleClose();
        });
    },
  });

  const handleClose = () => {
    lunchStore.setIsOpenLunchModal(false);
  };

  const organisationOptions = useMemo(() => (
    foodsStore.organisations.map((org: IOrganisation) => (
      <MenuItem key={org?._id} value={org?._id}>{org?.name_org}</MenuItem>
    ))
  ), [foodsStore.organisations]);

  useEffect(() => {
    foodsStore.getOrganisation();

    return () => {
      foodsStore.setOrganisation([]);
    };
  }, []);

  return (
    <Modal
      open={lunchStore.isOpenAddLunchModal}
      onButtonClose={handleClose}
      width={400}
      title="Add new lunch base"
    >
      <form onSubmit={formik.handleSubmit}>
        <TextField
          sx={lunchStyles.addLunchTextFeild}
          placeholder="New lunch base name"
          name="name"
          onChange={formik.handleChange}
          value={formik.values.name}
          required
        />

        <FormControl sx={lunchStyles.addLunchOrgFormControl} fullWidth>
          <InputLabel>Organisation</InputLabel>
          <Select
            name="org"
            label="Organisation"
            onChange={formik.handleChange}
            value={formik.values.org}
            required
          >
            {organisationOptions}
          </Select>
        </FormControl>

        <Button sx={foodStyles.lunchModalButton} type="submit" variant="contained">
        Add new Lunch
        </Button>
      </form>
    </Modal>
  );
});

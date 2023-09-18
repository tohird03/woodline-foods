import React, {useEffect, useMemo} from 'react';
import {observer} from 'mobx-react';
import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from '@mui/material';
import {useFormik} from 'formik';
import {IOrganisation} from '../../../api/products/types';
import {Modal} from '../../../components/Modal';
import {lunchStore} from '../../../store/lunch';
import {productStore} from '../../../store/products';
import {ADD_LUNCH_MODAL_WIDTH} from '../constants';
import {lunchStyles} from '../styles';

export const AddLunch = observer(() => {

  const formik = useFormik({
    initialValues: {
      name: '',
      org: '',
      cost: 0,
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
    productStore.organisations.map((org: IOrganisation) => (
      <MenuItem key={org?._id} value={org?._id}>{org?.name_org}</MenuItem>
    ))
  ), [productStore.organisations]);

  useEffect(() => {
    productStore.getOrganisation();

    return () => {
      productStore.setOrganisation([]);
    };
  }, []);

  return (
    <Modal
      open={lunchStore.isOpenAddLunchModal}
      onButtonClose={handleClose}
      width={ADD_LUNCH_MODAL_WIDTH}
      title="Add new organisation"
    >
      <form onSubmit={formik.handleSubmit}>
        <TextField
          sx={lunchStyles.addLunchTextFeild}
          placeholder="New product name"
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

        <Button
          sx={lunchStyles.widthFull}
          variant="contained"
          type="submit"
        >
          Add
        </Button>
      </form>
    </Modal>
  );
});

import React, {useEffect, useMemo} from 'react';
import {observer} from 'mobx-react';
import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from '@mui/material';
import {useFormik} from 'formik';
import {IOrganisation} from '../../../api/products/types';
import {Modal} from '../../../components/Modal';
import {productStore} from '../../../store/products';
import {MODAL_WIDTH, UnitOption} from '../constants';
import {productStyles} from '../styles';

export const AddProduct = observer(() => {

  const formik = useFormik({
    initialValues: {
      name: '',
      org: '',
      unit: '',
    },
    onSubmit: values => {
      productStore.addProducts(values)
        .finally(() => {
          handleClose();
        });
    },
  });

  const handleClose = () => {
    productStore.setIsOpenProductModal(false);
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
      open={productStore.isOpenProductModal}
      onButtonClose={handleClose}
      width={MODAL_WIDTH}
      title="Add new product"
    >
      <form onSubmit={formik.handleSubmit}>
        <TextField
          sx={productStyles.addProductTextFeild}
          onChange={formik.handleChange}
          value={formik.values.name}
          placeholder="New product name"
          name="name"
          required
        />
        <FormControl sx={productStyles.addProductFormControl} fullWidth>
          <InputLabel>Organisation</InputLabel>
          <Select
            onChange={formik.handleChange}
            value={formik.values.org}
            name="org"
            label="Organisation"
            required
          >
            {organisationOptions}
          </Select>
        </FormControl>

        <FormControl sx={productStyles.addProductFormControl} fullWidth>
          <InputLabel>Unit</InputLabel>
          <Select
            onChange={formik.handleChange}
            value={formik.values.unit}
            name="unit"
            label="Unit"
            required
          >
            {UnitOption}
          </Select>
        </FormControl>

        <Button
          sx={productStyles.addProductSubmitBtn}
          variant="contained"
          type="submit"
        >
          Add
        </Button>
      </form>
    </Modal>
  );
});

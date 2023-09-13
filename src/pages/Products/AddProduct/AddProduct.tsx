import React, {useEffect, useState} from 'react';
import {observer} from 'mobx-react';
import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from '@mui/material';
import {useFormik} from 'formik';
import {IOrganisation} from '../../../api/organisation/types';
import {Modal} from '../../../components/Modal';
import {productStore} from '../../../store/products';
import {UnitOption} from '../constants';

export const AddProduct = observer(() => {
  const [organisationOption, setOrganisationOption] = useState<React.ReactNode[]>([]);

  const formik = useFormik({
    initialValues: {
      name: '',
      org: '',
      unit: '',
    },
    onSubmit: values => {
      productStore.addProducts(values)
        .then(res => {
          if (res) {
            productStore.getProducts({
              page: productStore.page,
              size: productStore.size,
            });
          }
        })
        .finally(() => {
          handleClose();
        });
    },
  });

  const handleClose = () => {
    productStore.setIsOpenProductModal(false);
  };

  useEffect(() => {
    productStore.getOrganisation()
      .then(res => {
        if (res) {
          setOrganisationOption(
            res?.data?.map((org: IOrganisation) => (
              <MenuItem key={org?._id} value={org?._id}>{org?.name_org}</MenuItem>
            ))
          );
        }
      });
  }, []);


  return (
    <Modal
      open={productStore.isOpenProductModal}
      onButtonClose={handleClose}
      title="Add new product"
      width={400}
    >
      <form onSubmit={formik.handleSubmit}>
        <TextField
          sx={{width: '100%', marginBottom: '10px'}}
          placeholder="New product name"
          name="name"
          onChange={formik.handleChange}
          value={formik.values.name}
          required
        />
        <FormControl sx={{marginBottom: '10px'}} fullWidth>
          <InputLabel>Organisation</InputLabel>
          <Select
            name="org"
            label="Organisation"
            onChange={formik.handleChange}
            value={formik.values.org}
            required
          >
            {organisationOption}
          </Select>
        </FormControl>

        <FormControl sx={{marginBottom: '10px'}} fullWidth>
          <InputLabel>Unit</InputLabel>
          <Select
            name="unit"
            label="Unit"
            onChange={formik.handleChange}
            value={formik.values.unit}
            required
          >
            {UnitOption}
          </Select>
        </FormControl>

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

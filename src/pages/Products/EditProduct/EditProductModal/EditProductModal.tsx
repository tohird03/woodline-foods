/* eslint-disable react/no-array-index-key */
import React, {useEffect, useMemo, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {observer} from 'mobx-react';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import {useFormik} from 'formik';
import {Container} from '../../../../components/Container';
import {Modal} from '../../../../components/Modal';
import {productStore} from '../../../../store/products';
import {foodStyles} from '../../../Lunch/styles';
import {UnitOption} from '../../constants';
import { productStyles } from '../../styles';

export const EditProduct = observer(() => {

  const formik = useFormik({
    initialValues: {
      name: productStore.editProductStore?.name || '',
      unit: productStore.editProductStore?.unit || '',
    },
    onSubmit: (values) => {
      productStore.editProducts({
        ...values,
        id: productStore?.editProductStore?._id!,
      });
      handleClose();
    },
  });


  const handleClose = () => {
    productStore.setIsOpenProductEditModal(false);
  };

  return (
    <Modal
      open={productStore.isOpenEditProductModal}
      onButtonClose={handleClose}
      width={500}
    >
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <Typography variant="h4" gutterBottom>
            Edit Product
          </Typography>
        </Stack>
        <form onSubmit={formik.handleSubmit}>
          <Box sx={foodStyles.addFoodsWRapper}>
            <Box sx={foodStyles.addFoodsProducts}>
              <TextField
                name="name"
                label="Product Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                required
              />
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
              <Button type="submit" variant="contained" sx={{mt: 2}}>
                Save Changes
              </Button>
            </Box>
          </Box>
        </form>
      </Container>
    </Modal>
  );
});

import React, {useEffect, useMemo} from 'react';
import {observer} from 'mobx-react';
import {Box, Button, FormControl, InputLabel, MenuItem, Select, TextField} from '@mui/material';
import {useFormik} from 'formik';
import {IProducts} from '../../../api/foods/types';
import {Modal} from '../../../components/Modal';
import {foodsStore} from '../../../store/foods';
import {foodStyles} from '../styles';

const MODAL_WIDTH = 550;

export const AddProductToFoodModal = observer(() => {

  const formik = useFormik({
    initialValues: {
      product: '',
      amount: 0,
    },
    onSubmit: values => {
      foodsStore.addProductToFood({
        ...values,
        foodId: foodsStore?.singleFood?._id,
      })
        .finally(() => {
          handleClose();
        });
    },
  });

  const handleClose = () => {
    foodsStore.setSingleFood(null);
    foodsStore.setProducts([]);
    foodsStore.setIsOpenAddProductToFoodModal(false);
  };

  const productOptions = useMemo(() => (
    foodsStore.products.map((product: IProducts) => (
      <MenuItem key={product?._id} value={product?._id}>{product?.name}</MenuItem>
    ))
  ), [foodsStore.products]);

  console.log(foodsStore.products);


  useEffect(() => {
    foodsStore.getProducts('');
  }, []);

  return (
    <Modal
      open={foodsStore.isOpenAddProductToFoodModal}
      onButtonClose={handleClose}
      width={MODAL_WIDTH}
      title="Products"
    >
      <form onSubmit={formik.handleSubmit}>
        <Box
          sx={foodStyles.addFoodsWRapper}
        >
          <Box sx={foodStyles.addFoodsProducts}>
            <Box sx={foodStyles.addFoodsProductBox}>
              <FormControl sx={foodStyles.addFoodFormControl} fullWidth>
                <InputLabel>{'Product'}</InputLabel>
                <Select
                  label={'Product'}
                  required
                  name="product"
                  value={formik.values.product}
                  onChange={formik.handleChange}
                >
                  {productOptions}
                </Select>
              </FormControl>
              <TextField
                label={'Amount'}
                type="number"
                required
                minRows={0}
                name="amount"
                value={formik.values.amount}
                onChange={formik.handleChange}
              />
            </Box>
          </Box>
        </Box>
        <Button sx={{width: '100%'}} type="submit" variant="contained">
          Add product
        </Button>
      </form>
    </Modal>
  );
});

import React, {useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {observer} from 'mobx-react';
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import {useFormik} from 'formik';
import {foodsApi} from '../../../../api/foods';
import {IAddOneFoodProduct, IProducts} from '../../../../api/foods/types';
import {Modal} from '../../../../components/Modal';
import {foodsStore} from '../../../../store/foods';
import {productStore} from '../../../../store/products';
import {addAxiosErrorNotification, successNotification} from '../../../../utils/notification';
import {foodStyles} from '../../styles';

export const AddFoodProduct = observer(() => {
  const {id} = useParams();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      product: '',
      amount: 0,
    },
    onSubmit: (values, {setSubmitting}) => {
      setSubmitting(true);
      const addProductData: IAddOneFoodProduct = {
        id: id!,
        product: values.product,
        amount: values.amount,
      };

      foodsApi.addOneFoodProduct(addProductData)
        .then(() => {
          successNotification('Success add new food product');
          foodsStore.getOneFood(id!);
          handleClose();
        })
        .catch(addAxiosErrorNotification)
        .finally(() => {
          setSubmitting(false);
        });
    },
  });

  const productOptions = foodsStore.products.map((product: IProducts) => (
    <MenuItem key={product?._id} value={product?._id}>{product?.name}</MenuItem>
  ));

  const handleClose = () => {
    foodsStore.setIsOneFoodProductAddModal(false);
  };

  useEffect(() => {

    foodsStore.getOneFood(id!)
      .then((food) => {
        if (food && food?.org?._id) {
          foodsStore.getProducts(food?.org?._id);
        }
      });


    return () => {
      foodsStore.setProducts([]);
      foodsStore.setOrganisation([]);
    };
  }, [id]);


  return (
    <Modal
      open={foodsStore.isOneFoodProductAddModal}
      onButtonClose={handleClose}
      width={600}
    >
      <Container>
        <Typography variant="h4" gutterBottom>
          Add Product
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Box sx={foodStyles.addFoodsWRapper}>
            <FormControl sx={foodStyles.addFoodFormControl} fullWidth>
              <InputLabel>Product</InputLabel>
              <Select
                label="Product"
                value={formik.values.product}
                onChange={formik.handleChange}
                name="product"
                required
              >
                {productOptions}
              </Select>
            </FormControl>
            <TextField
              onChange={formik.handleChange}
              value={formik.values.amount}
              label="Amount"
              type="number"
              required
              name="amount"
              inputProps={{min: 0}}
            />
          </Box>
          <Button sx={{width: '100%'}} type="submit" variant="contained" disabled={formik.isSubmitting}>
            Add New Product
          </Button>
        </form>
      </Container>
    </Modal>
  );
});

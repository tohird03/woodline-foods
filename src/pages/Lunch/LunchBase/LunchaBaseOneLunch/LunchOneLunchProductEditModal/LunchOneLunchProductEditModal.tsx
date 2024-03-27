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
import {lunchApi} from '../../../../../api/lunch';
import {IAddOneLunchProduct} from '../../../../../api/lunch/types';
import {IProducts} from '../../../../../api/products/types';
import {Modal} from '../../../../../components/Modal';
import {foodsStore} from '../../../../../store/foods';
import {lunchStore} from '../../../../../store/lunch';
import {productStore} from '../../../../../store/products';
import {addAxiosErrorNotification, successNotification} from '../../../../../utils/notification';
import {foodStyles} from '../../../styles';

export const EditLunchProduct = observer(() => {
  const {id} = useParams();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      product: lunchStore.isSingleLunchProduct?.product?._id || '',
      amount: lunchStore?.isSingleLunchProduct?.amount,
    },
    onSubmit: (values, {setSubmitting}) => {
      setSubmitting(true);
      const editProductData: IAddOneLunchProduct = {
        id: id!,
        product: values.product!,
        amount: values.amount!,
      };

      lunchApi.updateLunchProduct(editProductData)
        .then(() => {
          successNotification('Success edit food product');
          lunchStore.getOneLunch(id!);
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
    lunchStore.setIsOneLunchProductEditModal(false);
    lunchStore.setIsSingleLunchProduct(null);
  };

  useEffect(() => {
    productStore.getProducts({});
    foodsStore.getProducts('');
  }, []);

  return (
    <Modal
      open={lunchStore.isOneLunchProductEditModal}
      onButtonClose={handleClose}
      width={600}
    >
      <Container>
        <Typography variant="h4" gutterBottom>
          Edit Product
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

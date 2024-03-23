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
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import {useFormik} from 'formik';
import {IProducts} from '../../../../api/foods/types';
import {IAddFoodProduct} from '../../../../api/history/types';
import {Container} from '../../../../components/Container';
import {Modal} from '../../../../components/Modal';
import {foodsStore} from '../../../../store/foods';
import {lunchStore} from '../../../../store/lunch';
import {foodStyles} from '../../styles';

export const AddLunchModal = observer(() => {
  const [products, setProducts] = useState<IAddFoodProduct[]>([
    {product: '', amount: 0},
  ]);
  const {id} = useParams();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {},
    onSubmit: () => {
      lunchStore.addLunchProducts({id: id!, products})
        .then(res => {
          if (res) {
            navigate(-1);
          }
        });
    },
  });

  const addProduct = () => {
    setProducts([...products, {product: '', amount: 0}]);
  };

  const removeProduct = (index: number) => {
    const newProducts = [...products];

    newProducts.splice(index, 1);
    setProducts(newProducts);
  };

  const handleProductSelectChange = (event: SelectChangeEvent<string>, index: number) => {
    const newProducts = [...products];

    newProducts[index].product = event.target.value;
    setProducts(newProducts);
  };

  const handleAmountChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const newProducts = [...products];

    newProducts[index].amount = Number(event.target.value);
    setProducts(newProducts);
  };

  const productOptions = useMemo(() => (
    (foodsStore.products && foodsStore.products.length > 0) ? (
      foodsStore.products.map((product: IProducts) => (
        <MenuItem key={product?._id} value={product?._id}>{product?.name}</MenuItem>
      ))
    ) : (
      <MenuItem value="" disabled>No Product</MenuItem>
    )
  ), [foodsStore.products]);


  useEffect(() => {
    foodsStore.getProducts('');

    return () => {
      foodsStore.setProducts([]);
    };
  }, []);

  useEffect(() => {
    if (!id) {
      navigate(-1);
    }
  }, [id]);

  const handleClose = () => {
    lunchStore.setLunchEditModal(false);
  };

  return (
    <Modal
      open={lunchStore.isLunchEditModal}
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
            Add Lunch
          </Typography>
        </Stack>
        <form onSubmit={formik.handleSubmit}>
          <Box
            sx={foodStyles.addFoodsWRapper}
          >
            <Box sx={foodStyles.addFoodsProducts}>
              {products.map((product, index) => (
                <Box sx={foodStyles.addFoodsProductBox} key={index}>
                  <FormControl sx={foodStyles.addFoodFormControl} fullWidth>
                    <InputLabel>{`Product ${index + 1}`}</InputLabel>
                    <Select
                      label={`Product ${index + 1}`}
                      value={product.product}
                      onChange={(event) => handleProductSelectChange(event, index)}
                      required
                    >
                      {productOptions}
                    </Select>
                  </FormControl>
                  <TextField
                    onChange={(event) => handleAmountChange(event, index)}
                    // value={product.amount}
                    label={`Amount ${index + 1}`}
                    type="number"
                    required
                    minRows={0}
                  />
                  <DeleteIcon onClick={() => removeProduct(index)} style={{color: 'red', cursor: 'pointer'}} />
                </Box>
              ))}
              <Box sx={{display: 'flex', gap: '10px', flexDirection: {xs: 'column'}}}>
                <Button
                  type="button"
                  variant="outlined"
                  onClick={addProduct}
                  sx={foodStyles.addFoodsFormBox}
                >
                  добавить больше продуктов +
                </Button>
                <Button sx={{width: '100%'}} type="submit" variant="contained">
                  Add new Lunch
                </Button>
              </Box>
            </Box>
          </Box>
        </form>
      </Container>
    </Modal>
  );
});

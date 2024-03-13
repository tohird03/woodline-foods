/* eslint-disable react/no-array-index-key */
import React, {useEffect, useMemo, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {observer} from 'mobx-react';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Button,
  Container,
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
import {foodsApi} from '../../../api/foods';
import {IAddFoodProduct, IOrganisation, IProducts} from '../../../api/foods/types';
import {ROUTES} from '../../../constants/router';
import {foodsStore} from '../../../store/foods';
import {productStore} from '../../../store/products';
import {useMediaQuery} from '../../../utils/hooks/useMediaQuery';
import {addAxiosErrorNotification, successNotification} from '../../../utils/notification';
import {CategoryOption} from '../constants';
import {foodStyles} from '../styles';

export const AddFoods = observer(() => {
  const [products, setProducts] = useState<IAddFoodProduct[]>([
    {product: '', amount: 0},
  ]);
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 650px)');

  const formik = useFormik({
    initialValues: {
      name: '',
      cost: 0,
      org: '',
      category: '',
    },
    onSubmit: values => {
      foodsApi.addFoods({
        ...values,
        products,
      })
        .then(() => {
          successNotification('Success add new food');
          navigate(ROUTES.food);
        })
        .catch(addAxiosErrorNotification);
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

  const organisationOptions = useMemo(() => (
    (productStore.organisations && productStore.organisations.length > 0) ? (
      productStore.organisations.map((org: IOrganisation) => (
        <MenuItem key={org?._id} value={org?._id}>{org?.name_org}</MenuItem>
      ))
    ) : (
      <MenuItem value="" disabled>No Organization</MenuItem>
    )

  ), [productStore.organisations]);


  const productOptions = useMemo(() => (
    foodsStore.products.map((product: IProducts) => (
      <MenuItem key={product?._id} value={product?._id}>{product?.name}</MenuItem>
    ))
  ), [foodsStore.products]);

  useEffect(() => {
    productStore.getOrganisation();
    foodsStore.getProducts();

    return () => {
      foodsStore.setProducts([]);
      foodsStore.setOrganisation([]);
    };
  }, []);

  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <Typography variant="h4" gutterBottom>
          Add Foods
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
                  value={product.amount}
                  label={`Amount ${index + 1}`}
                  type="number"
                  required
                  minRows={0}
                />
                <DeleteIcon onClick={() => removeProduct(index)} style={{color: 'red', cursor: 'pointer'}} />
              </Box>
            ))}
            <Button
              type="button"
              variant="outlined"
              onClick={addProduct}
              sx={foodStyles.addFoodsFormBox}
            >
              добавить больше продуктов +
            </Button>
          </Box>
          <Box sx={foodStyles.addFoodsLeftWrapper}>
            <TextField
              onChange={formik.handleChange}
              value={formik.values.name}
              label="Food Name"
              name="name"
              required
            />
            <TextField
              onChange={formik.handleChange}
              value={formik.values.cost}
              label="Cost"
              type="number"
              name="cost"
              required
            />
            <FormControl fullWidth>
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
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                label="Organisation"
                onChange={formik.handleChange}
                value={formik.values.category}
                required
              >
                {CategoryOption}
              </Select>
            </FormControl>
            {!isMobile && (
              <Button type="submit" variant="contained">
                Add new Food
              </Button>
            )}
          </Box>
        </Box>
        {isMobile && (
          <Button sx={{width: '100%'}} type="submit" variant="contained">
            Add new Food
          </Button>
        )}
      </form>
    </Container>
  );
});

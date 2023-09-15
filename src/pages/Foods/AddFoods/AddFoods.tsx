import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {observer} from 'mobx-react';
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
import {addAxiosErrorNotification, successNotification} from '../../../utils/notification';
import {CategoryOption} from '../constants';

export const AddFoods = observer(() => {
  const [organisationOption, setOrganisationOption] = useState<React.ReactNode[]>([]);
  const [productsOption, setProductsOption] = useState<React.ReactNode[]>([]);
  const [products, setProducts] = useState<IAddFoodProduct[]>([
    {product: '', amount: 0},
  ]);
  const navigate = useNavigate();

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

    newProducts[index].amount = parseInt(event.target.value, 10);
    setProducts(newProducts);
  };

  useEffect(() => {
    foodsStore.getOrganisation()
      .then(res => {
        if (res) {
          setOrganisationOption(
            res?.data?.map((org: IOrganisation) => (
              <MenuItem key={org?._id} value={org?._id}>{org?.name_org}</MenuItem>
            ))
          );
        }
      });

    foodsStore.getProducts()
      .then(res => {
        if (res) {
          setProductsOption(
            res?.data?.map((product: IProducts) => (
              <MenuItem key={product?._id} value={product?._id}>{product?.name}</MenuItem>
            ))
          );
        }
      });
  }, []);

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h4" gutterBottom>
          Add Foods
        </Typography>
      </Stack>
      <form onSubmit={formik.handleSubmit}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row !important',
            gap: '20px',
            alignItems: 'flex-start',
            marginBottom: '30px',
            width: '100%',
          }}
        >
          <Box sx={{width: '50%', gap: '20px', display: 'grid', marginTop: '15px'}}>
            {products.map((product, index) => (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row !important',
                  gap: '10px',
                }} key={index}
              >
                <FormControl sx={{width: '70%'}} fullWidth>
                  <InputLabel>{`Product ${index + 1}`}</InputLabel>
                  <Select
                    label={`Product ${index + 1}`}
                    value={product.product}
                    onChange={(event) => handleProductSelectChange(event, index)}
                    required
                  >
                    {productsOption}
                  </Select>
                </FormControl>
                <TextField
                  label={`Amount ${index + 1}`}
                  value={product.amount}
                  type="number"
                  onChange={(event) => handleAmountChange(event, index)}
                  required
                  minRows={0}
                />
              </Box>
            ))}
            <Button
              type="button"
              variant="outlined"
              onClick={addProduct}
              sx={{width: '100%'}}
            >
              добавить больше продуктов +
            </Button>
          </Box>
          <Box sx={{gap: '20px', display: 'grid', width: '50%', marginTop: '15px'}}>
            <TextField
              label="Food Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              required
            />
            <TextField
              label="Cost"
              type="number"
              name="cost"
              value={formik.values.cost}
              onChange={formik.handleChange}
              required
            />
            <FormControl fullWidth>
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
            <Button type="submit" variant="contained">
              Add new Food
            </Button>
          </Box>
        </Box>
      </form>
    </Container>
  );
});

/* eslint-disable react/no-array-index-key */
import React, {useEffect, useMemo, useState} from 'react';
import {observer} from 'mobx-react';
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
import {IProducts} from '../../../api/foods/types';
import {IAddFoodProduct} from '../../../api/history/types';
import {IOrganisation} from '../../../api/products/types';
import {Container} from '../../../components/Container';
import {foodsStore} from '../../../store/foods';
import {lunchStore} from '../../../store/lunch';
import {useMediaQuery} from '../../../utils/hooks/useMediaQuery';
import {foodStyles, lunchStyles} from '../styles';

export const AddLunch = observer(() => {
  const [products, setProducts] = useState<IAddFoodProduct[]>([
    {product: '', amount: 0},
  ]);
  const isMobile = useMediaQuery('(max-width: 650px)');

  const formik = useFormik({
    initialValues: {
      name: '',
      org: '',
      cost: 0,
    },
    onSubmit: values => {
      lunchStore.addLunchs({
        ...values,
        products,
      })
        .finally(() => {
          handleClose();
        });
    },
  });

  const addProduct = () => {
    setProducts([...products, {product: '', amount: 0}]);
  };

  const handleClose = () => {
    lunchStore.setIsOpenLunchModal(false);
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

  const organisationOptions = useMemo(() => (
    foodsStore.organisations.map((org: IOrganisation) => (
      <MenuItem key={org?._id} value={org?._id}>{org?.name_org}</MenuItem>
    ))
  ), [foodsStore.organisations]);

  const productOptions = useMemo(() => (
    foodsStore.products.map((product: IProducts) => (
      <MenuItem key={product?._id} value={product?._id}>{product?.name}</MenuItem>
    ))
  ), [foodsStore.products]);

  useEffect(() => {
    foodsStore.getOrganisation();
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
                  value={product.amount}
                  label={`Amount ${index + 1}`}
                  type="number"
                  required
                  minRows={0}
                />
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

            {!isMobile && (
              <Button type="submit" variant="contained">
                Add new lunch
              </Button>
            )}
          </Box>
        </Box>
        {isMobile && (
          <Button sx={{width: '100%'}} type="submit" variant="contained">
            Add new Lunch
          </Button>
        )}
      </form>
    </Container>
  );
});

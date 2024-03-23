import React, {useEffect, useMemo, useState} from 'react';
import {useNavigate} from 'react-router-dom';
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
import {foodsApi} from '../../../api/foods';
import {IAddFoodProduct, IOrganisation, IProducts} from '../../../api/foods/types';
import {Container} from '../../../components/Container';
import {ROUTES} from '../../../constants/router';
import {foodsStore} from '../../../store/foods';
import {useMediaQuery} from '../../../utils/hooks/useMediaQuery';
import {addAxiosErrorNotification, successNotification} from '../../../utils/notification';
import {ImgUploadModal} from '../../ImgUploadModal';
import {CategoryOption} from '../constants';
import {foodStyles} from '../styles';
import {UserStatusChange} from '../UserStatusChange';

export const EditFoods = observer(() => {
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
      foodsApi.changeFoods({
        ...values,
        id: foodsStore?.singleFood?._id,
      })
        .then(() => {
          successNotification('Success update food');
          navigate(ROUTES.food);
        })
        .catch(addAxiosErrorNotification);
    },
  });

  // const addProduct = () => {
  //   setProducts([...products, {product: '', amount: 0}]);
  // };

  // const removeProduct = (index: number) => {
  //   const newProducts = [...products];

  //   newProducts.splice(index, 1);
  //   setProducts(newProducts);
  // };

  // const handleProductSelectChange = (event: SelectChangeEvent<string>, index: number) => {
  //   const newProducts = [...products];

  //   newProducts[index].product = event.target.value;
  //   setProducts(newProducts);
  // };

  // const handleAmountChange = (
  //   event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  //   index: number
  // ) => {
  //   const newProducts = [...products];

  //   newProducts[index].amount = Number(event.target.value);
  //   setProducts(newProducts);
  // };

  const organisationOptions = useMemo(() => (
    (foodsStore.organisations?.length > 0
      ? (
        foodsStore.organisations.map((org: IOrganisation) => (
          <MenuItem key={org?._id} value={org?._id}>{org?.name_org}</MenuItem>
        ))
      )
      : (
        <MenuItem value="" disabled>No Organization</MenuItem>
      )
    )
  ), [foodsStore.organisations]);

  // const productOptions = useMemo(() => (
  //   (foodsStore.products?.length > 0 ? (
  //     foodsStore.products.map((product: IProducts) => (
  //       <MenuItem key={product?._id} value={product?._id}>{product?.name}</MenuItem>
  //     ))
  //   )
  //     : (<MenuItem value="" disabled>No Product</MenuItem>
  //     )
  //   )
  // ), [foodsStore.products]);

  useEffect(() => {
    if (!foodsStore?.singleFood) {
      navigate(ROUTES.food);
    }

    foodsStore.getOrganisation();
    foodsStore.getProducts('');

    const products = foodsStore.singleFood && Array.isArray(foodsStore.singleFood.products)
      ? foodsStore.singleFood.products.map(product => ({
        product: product._id,
        amount: product.amount,
      }))
      : [];

    formik.setFieldValue('name', foodsStore?.singleFood?.name);
    formik.setFieldValue('cost', foodsStore?.singleFood?.cost);
    formik.setFieldValue('org', foodsStore?.singleFood?.org?._id);
    formik.setFieldValue('category', foodsStore?.singleFood?.category);

    setProducts(products as unknown as IAddFoodProduct[]);

    return () => {
      foodsStore.setProducts([]);
      foodsStore.setOrganisation([]);
    };
  }, []);

  const handleImgUpload = () => {
    // foodsStore.setFoodId(food?._id);
    foodsStore.setIsOpenImgUpload(true);
  };

  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <Typography variant="h4" gutterBottom>
          Update Food
        </Typography>
      </Stack>
      <form onSubmit={formik.handleSubmit}>
        <Box
          sx={foodStyles.addFoodsWRapper}
        >
          {/* <Box sx={foodStyles.addFoodsProducts}>
            {products?.map((product, index) => (
              <Box sx={foodStyles.addFoodsProductBox} key={index}>
                <FormControl sx={foodStyles.addFoodFormControl} fullWidth>
                  <InputLabel>{`Product ${index + 1}`}</InputLabel>
                  <Select
                    label={`Product ${index + 1}`}
                    value={product.product}
                    defaultValue={product.product}
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
          </Box> */}
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
            {/* <FormControl fullWidth>
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
            </FormControl> */}
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
            {/* <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <UserStatusChange food={} />
            </FormControl> */}
            {/* <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <div>
                <Button onClick={handleImgUpload}>Img Change</Button>
              </div>
            </FormControl> */}
            {!isMobile && (
              <Button type="submit" variant="contained">
                Update Food
              </Button>
            )}
          </Box>
        </Box>
        {isMobile && (
          <Button sx={{width: '100%'}} type="submit" variant="contained">
            Update Food
          </Button>
        )}
      </form>
      {foodsStore.isOpenImgUpload && <ImgUploadModal />}
    </Container>
  );
});

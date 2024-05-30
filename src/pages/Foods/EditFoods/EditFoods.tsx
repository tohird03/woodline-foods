import React, {useEffect, useMemo} from 'react';
import {useNavigate} from 'react-router-dom';
import {observer} from 'mobx-react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import {useFormik} from 'formik';
import {foodsApi} from '../../../api/foods';
import {IOrganisation} from '../../../api/foods/types';
import {Container} from '../../../components/Container';
import {ROUTES} from '../../../constants/router';
import {foodsStore} from '../../../store/foods';
import {useMediaQuery} from '../../../utils/hooks/useMediaQuery';
import {addAxiosErrorNotification, successNotification} from '../../../utils/notification';
import {ImgUploadModal} from '../../ImgUploadModal';
import {CategoryOption} from '../constants';
import {foodStyles} from '../styles';

export const EditFoods = observer(() => {
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

  useEffect(() => {
    if (!foodsStore?.singleFood) {
      navigate(ROUTES.food);
    }

    foodsStore.getOrganisation();
    foodsStore.getProducts('');

    formik.setFieldValue('name', foodsStore?.singleFood?.name);
    formik.setFieldValue('cost', foodsStore?.singleFood?.cost);
    formik.setFieldValue('category', foodsStore?.singleFood?.category);

    return () => {
      foodsStore.setProducts([]);
      foodsStore.setOrganisation([]);
    };
  }, []);

  useEffect(() => {
    if (foodsStore.organisations) {
      const findSingleFoodOrg = foodsStore.organisations?.find(org => org?.name_org === foodsStore?.singleFood?.org);

      formik.setFieldValue('org', findSingleFoodOrg?._id);
    }
  }, [foodsStore.organisations]);

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
                name="org"
                label="Organisation"
                onChange={formik.handleChange}
                value={formik.values.org}
                required
              >
                {organisationOptions}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                label="Category"
                onChange={formik.handleChange}
                value={formik.values.category}
                required
              >
                {CategoryOption}
              </Select>
            </FormControl>
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

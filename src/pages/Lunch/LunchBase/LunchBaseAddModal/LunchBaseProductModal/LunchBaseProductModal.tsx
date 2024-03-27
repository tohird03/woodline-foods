/* eslint-disable react/no-array-index-key */
/* eslint-disable max-len */
import React, {useEffect, useMemo, useState} from 'react';
import {useParams} from 'react-router-dom';
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
  TextField,
} from '@mui/material';
import {useFormik} from 'formik';
import {IProducts} from '../../../../../api/foods/types';
import {IAddFoodProduct} from '../../../../../api/history/types';
import {Modal} from '../../../../../components/Modal';
import {foodsStore} from '../../../../../store/foods';
import {lunchStore} from '../../../../../store/lunch';
import {productStore} from '../../../../../store/products';
import {foodStyles} from '../../../styles';


interface IFormValues {
  name: string;
  cost: number;
  org: string;
}

export const LunchBaseProductAddModal = observer(() => {
  const [products, setProducts] = useState<IAddFoodProduct[]>([{product: '', amount: 0}]);
  const [bodyProductPrice, setBodyProductPrice] = useState(0);
  const [totalProductPrice, setTotalProductPrice] = useState(0);
  const {id} = useParams();

  useEffect(() => {
    foodsStore.getProducts();

    return () => {
      foodsStore.setProducts([]);
    };
  }, []);

  const formik = useFormik<IFormValues>({
    initialValues: {
      name: '',
      cost: 0,
      org: '',
    },
    onSubmit: (values) => {
      if (lunchStore.singleLunch) {
        lunchStore.updateLunchProduct({
          ...values,
          products,
          id: lunchStore.singleLunch?._id!,
          lunchbase: id!,
        })
          .then(() => {
            lunchStore.getLunchBases();
          })
          .finally(() => {
            handleClose();
          });

        return;
      }

      lunchStore.addLunchBase({
        ...values,
        products,
        lunchbase: id!,
        id: id!,
      }).finally(() => {
        handleClose();
      });

    },
  });

  const productOptions = useMemo(() => (
    foodsStore?.products?.map((product: IProducts) => (
      <MenuItem key={product?._id} value={product?._id}>{product?.name}</MenuItem>
    ))
  ), [foodsStore.products]);

  const addProduct = () => {
    setProducts([...products, {product: '', amount: 0}]);
  };

  const removeProduct = (index: number) => {
    const newProducts = [...products];

    newProducts.splice(index, 1);
    setProducts(newProducts);

    const bodyProductPrice = newProducts.reduce((total, product) => {
      const selectedProduct = foodsStore.products.find(p => p._id === product.product);

      if (selectedProduct) {
        return total + (selectedProduct.cost * product.amount);
      }

      return total;
    }, 0);

    setBodyProductPrice(bodyProductPrice);
  };


  const handleClose = () => {
    lunchStore.setLunchBaseProductAddEditModal(false);
  };

  const handleProductSelectChange = (event: SelectChangeEvent<string>, index: number) => {
    const newProducts = [...products];

    newProducts[index].product = event.target.value;
    setProducts(newProducts);

    handleFormSelectProductChange();
  };

  const handleAmountChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const newProducts = [...products];

    newProducts[index].amount = Number(event.target.value);
    setProducts(newProducts);

    handleFormSelectProductChange();
  };

  const handleFormSelectProductChange = () => {
    const bodyProductPrice = products.reduce((total, product) => {
      const selectedProduct = foodsStore.products.find(p => p._id === product.product);

      if (selectedProduct) {
        return total + selectedProduct.cost * product.amount;
      }

      return total;
    }, 0);

    setBodyProductPrice(bodyProductPrice);
  };

  useEffect(() => {
    if (lunchStore.singleLunch) {
      formik.setValues({
        name: lunchStore.singleLunch.name || '',
        cost: lunchStore.singleLunch.cost || 0,
        org: lunchStore.singleLunch.org || '',
      });
    }
  }, [lunchStore.singleLunch, foodsStore.products]);


  useEffect(() => {
    if (foodsStore.products) {
      const calculatedBodyProductPrice = products.reduce((total, product) => {
        const selectedProduct = foodsStore.products.find(p => p._id === product.product);

        return selectedProduct ? total + (selectedProduct.cost * product.amount) : total;
      }, 0);

      setBodyProductPrice(calculatedBodyProductPrice);
    }

    setTotalProductPrice(formik.values.cost);
    productStore.getOrganisation();
  }, [formik.values, products, foodsStore.products]);

  return (
    <Modal
      open={lunchStore.lunchBaseProductAddEditModal}
      onButtonClose={handleClose}
      width={1000}
      title={lunchStore.singleLunch ? 'Save' : 'Add new Product'}
    >
      <form onSubmit={formik.handleSubmit}>
        <div style={{display: 'flex', justifyContent: 'space-around'}}>
          <div>
            <Container>
              <Box sx={foodStyles.addFoodsWRapper}>
                <Box sx={foodStyles.addFoodsProducts}>
                  <Box sx={{display: 'flex', gap: '10px', flexDirection: {xs: 'column'}}}>
                    <Button
                      type="button"
                      variant="outlined"
                      onClick={addProduct}
                      sx={foodStyles.addFoodsFormBox}
                    >
                      добавить больше продуктов +
                    </Button>
                  </Box>
                  {products.map((product, index) => (
                    <Box sx={foodStyles.addFoodsProductBox} key={index}>
                      <FormControl sx={foodStyles.addFoodFormControl} fullWidth>
                        <InputLabel>{`Product ${index + 1}`}</InputLabel>
                        <Select
                          label={`Product ${index + 1}`}
                          value={product?.product}
                          onChange={(event) => handleProductSelectChange(event, index)}
                          required
                          defaultValue={product.product}
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
                      {!id && (
                        <DeleteIcon
                          onClick={() => removeProduct(index)}
                          style={{color: 'red', cursor: 'pointer'}}
                        />
                      )}
                    </Box>
                  ))}
                </Box>
              </Box>
            </Container>
          </div>
        </div>
        <Button sx={{width: '100%'}} type="submit" variant="contained">
          {lunchStore.singleLunch ? 'Save' : 'Add new Lunch'}
        </Button>
      </form>
    </Modal>
  );
});

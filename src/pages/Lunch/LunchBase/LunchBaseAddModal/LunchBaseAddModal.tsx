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
import {IProducts} from '../../../../api/foods/types';
import {IAddFoodProduct} from '../../../../api/history/types';
import {Modal} from '../../../../components/Modal';
import {foodsStore} from '../../../../store/foods';
import {lunchStore} from '../../../../store/lunch';
import {foodStyles, lunchStyles} from '../../styles';


interface IFormValues {
  name: string;
  cost: number;
  percent_cook: number;
}

export const LunchBaseAddModal = observer(() => {
  const [products, setProducts] = useState<IAddFoodProduct[]>([{product: '', amount: 0}]);
  const [bodyProductPrice, setBodyProductPrice] = useState(0);
  const [totalProductPrice, setTotalProductPrice] = useState(0);
  const [productPercentage, setProductPercentage] = useState(0);
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
      percent_cook: 0,
    },
    onSubmit: (values) => {
      if (lunchStore.singleLunch) {
        lunchStore.updateLunchProduct({
          ...values,
          products,
          id: lunchStore.singleLunch?._id!,
        })
          .then(() => {
            lunchStore.getLunchBases(id!);
          })
          .finally(() => {
            handleClose();
          });

        return;
      }

      lunchStore.addLunchBase({
        ...values,
        products,
        id: id!,
      }).finally(() => {
        handleClose();
      });

    },
  });

  const productOptions = useMemo(() => (
    foodsStore.products.map((product: IProducts) => (
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
    lunchStore.setIsOpenLunchBaseModal(false);
  };

  const handleProductSelectChange = (event: SelectChangeEvent<string>, index: number) => {
    const newProducts = [...products];

    newProducts[index].product = event.target.value;
    setProducts(newProducts);

    handleFormSelectProductChange(event);
  };

  const handleAmountChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const newProducts = [...products];

    newProducts[index].amount = Number(event.target.value);
    setProducts(newProducts);

    handleFormSelectProductChange(event);
  };

  const handleFormSelectProductChange = (event: any) => {
    const bodyProductPrice = products.reduce((total, product) => {
      const selectedProduct = foodsStore.products.find(p => p._id === product.product);

      if (selectedProduct) {
        return total + selectedProduct.cost * product.amount;
      }

      return total;
    }, 0);

    setBodyProductPrice(bodyProductPrice);
  };

  const handleProductTotalChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    formik.handleChange(event);

    setTotalProductPrice(parseFloat(event.target.value) || 0);
  };

  const handleProductPercentageChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    formik.handleChange(event);

    const productPercentage = parseFloat(event.target.value) || 0;

    const amountToChange = (productPercentage / 100) * totalProductPrice;

    setProductPercentage(amountToChange);
  };

  useEffect(() => {
    if (lunchStore.singleLunch) {
      formik.setValues({
        name: lunchStore.singleLunch.name || '',
        cost: lunchStore.singleLunch.cost || 0,
        percent_cook: lunchStore.singleLunch.percent_cook || 0,
      });
      const initialProducts = lunchStore.singleLunch.products.map(product => ({
        product: product.product,
        amount: product.amount,
      }));

      setProducts(initialProducts);
    }
  }, [lunchStore.singleLunch, foodsStore.products]);

  useEffect(() => {
    const calculatedBodyProductPrice = products.reduce((total, product) => {
      const selectedProduct = foodsStore.products.find(p => p._id === product.product);

      return selectedProduct ? total + (selectedProduct.cost * product.amount) : total;
    }, 0);

    setBodyProductPrice(calculatedBodyProductPrice);

    const calculatedPercentage = (formik.values.percent_cook / 100) * formik.values.cost;

    setProductPercentage(calculatedPercentage);

    setTotalProductPrice(formik.values.cost);
  }, [formik.values, products, foodsStore.products]);

  return (
    <Modal
      open={lunchStore.isOpenLunchModal}
      onButtonClose={handleClose}
      width={1000}
      title={lunchStore.singleLunch ? 'Save' : 'Add new Lunch'}
    >
      <form onSubmit={formik.handleSubmit}>
        <div style={{display: 'flex', justifyContent: 'space-around'}}>
          <div>
            <TextField
              sx={lunchStyles.addLunchTextFeild}
              label="Add lunch name"
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              required
            />

            <TextField
              label="Напишите стоимость обед"
              value={formik.values.cost}
              type="number"
              onChange={(event) => handleProductTotalChange(event)}
              inputProps={{min: 0}}
              minRows={0}
              required
              name="cost"
              sx={lunchStyles.addLunchTextFeild}
            />

            <TextField
              label="процент для повара"
              value={formik.values.percent_cook}
              type="number"
              onChange={(event) => handleProductPercentageChange(event)}
              inputProps={{min: 0}}
              minRows={0}
              required
              name="percent_cook"
              sx={lunchStyles.addLunchTextFeild}
            />

            <div>
              <h3>Общая стоимость обед: {totalProductPrice}</h3>
              <h3>Доля повара: {productPercentage}</h3>
              <h3>Цена тела: {bodyProductPrice}</h3>
            </div>
          </div>
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

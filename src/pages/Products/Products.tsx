import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {observer} from 'mobx-react';
import {
  Button,
  Stack,
  Typography,
} from '@mui/material';
import Iconify from '../../components/iconify';
import {Table} from '../../components/table';
import {productStore} from '../../store/products';
import {AddAmountModal} from './AddAmount/AddAmountModal';
import {AddProduct} from './AddProduct';
import {productColumns} from './constants';

export const Products = observer(() => {
  const {t} = useTranslation();

  const handleSearchProduct = (value: string) => {
    // TODO
  };

  const handleChangePage = (newPage: number) => {
    productStore.setPage(newPage + 1);
  };

  const handleChangePerPage = (perPage: number) => {
    productStore.setPage(1);
    productStore.setSize(perPage);
  };

  const handleAddNewProduct = () => {
    productStore.setIsOpenProductModal(true);
  };

  useEffect(() => {
    productStore.getProducts({
      page: productStore.page,
      size: productStore.size,
    });

    return () => {
      productStore.setProducts([]);
    };
  }, [productStore.page, productStore.size]);

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={1}
      >
        <Typography variant="h4" gutterBottom>
          {t('products')}
        </Typography>
        <Button
          variant="contained"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleAddNewProduct}
        >
          {t('newProduct')}
        </Button>
      </Stack>

      <Table
        columns={productColumns}
        data={productStore.products}
        onFilterSearch={handleSearchProduct}
        pagination={{
          total: productStore.totalProducts,
          page: productStore.page,
          size: productStore.size,
          handlePageChange: handleChangePage,
          handleShowSizeChange: handleChangePerPage,
        }}
      />

      {productStore.isOpenProductModal && <AddProduct />}
      {productStore.isOpenAmountModal && <AddAmountModal />}
    </>
  );
});

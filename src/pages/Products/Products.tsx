import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import {
  Button,
  Container,
  Stack,
  Typography,
} from '@mui/material';
import Iconify from '../../components/iconify';
import {Table} from '../../components/table';
import {productStore} from '../../store/products';
import {AddProduct} from './AddProduct';
import {productColumns} from './constants';

export const Products = observer(() => {

  const handleSearchProduct = (value: string) => {
    // TODO
  };

  const handleChangePage = (newPage: number) => {
    productStore.setPage(newPage + 1);
  };

  const handleChangePerPage = (perPage: number) => {
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
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Product
          </Typography>
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={handleAddNewProduct}
          >
            New Product
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
      </Container>

      {productStore.isOpenProductModal && <AddProduct />}
    </>
  );
});

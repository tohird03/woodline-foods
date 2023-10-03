import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';
import {observer} from 'mobx-react';
import {
  Button,
  Stack,
  Typography,
} from '@mui/material';
import {SearchOutlined} from '@ant-design/icons';
import Iconify from '../../components/iconify';
import {Table} from '../../components/table';
import {ROUTES} from '../../constants/router';
import {foodsStore} from '../../store/foods';
import {useMediaQuery} from '../../utils/hooks/useMediaQuery';
import {foodsColumns} from './constants';
import {ImgUploadModal} from './ImgUpload/ImgUploadModal';
import {ProductModal} from './Products/ProductModal';

export const Foods = observer(() => {
  const navigate = useNavigate();
  const {t} = useTranslation();
  const isMobile = useMediaQuery('(max-width: 650px)');

  const handleSearchFood = (value: string) => {
    // TODO
  };

  const handleAddNewFood = () => {
    navigate(ROUTES.addFood);
  };

  const handleChangePage = (newPage: number) => {
    foodsStore.setPage(newPage + 1);
  };

  const handleChangePerPage = (perPage: number, page: number) => {
    foodsStore.setPage(page);
    foodsStore.setSize(perPage);
  };

  useEffect(() => {
    foodsStore.getFoods({
      page: foodsStore.page,
      size: foodsStore.size,
    });
  }, [foodsStore.page, foodsStore.size]);

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={1}
      >
        <Typography
          variant="h4"
          gutterBottom
        >
          {t('foods')}
        </Typography>
        <Button
          variant="contained"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleAddNewFood}
        >
          {t('newFood')}
        </Button>
      </Stack>

      <Table
        columns={foodsColumns}
        data={foodsStore.foods}
        onFilterSearch={handleSearchFood}
        pagination={{
          total: foodsStore.totalFoods,
          page: foodsStore.page,
          size: foodsStore.size,
          handlePageChange: handleChangePage,
          handleShowSizeChange: handleChangePerPage,
        }}
        isMobile={isMobile}
        searchSuffix={<SearchOutlined />}
      />

      {foodsStore.isOpenSingleFoodProductModal && <ProductModal />}
      {foodsStore.isOpenImgUpload && <ImgUploadModal />}
    </>
  );
});

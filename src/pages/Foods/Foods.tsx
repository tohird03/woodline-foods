import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {observer} from 'mobx-react';
import {
  Button,
  Container,
  Stack,
  Typography,
} from '@mui/material';
import Iconify from '../../components/iconify';
import {Table} from '../../components/table';
import {ROUTES} from '../../constants/router';
import {foodsStore} from '../../store/foods';
import {foodsColumns} from './constants';

export const Foods = observer(() => {
  const navigate = useNavigate();

  const handleSearchFood = (value: string) => {
    // TODO
  };

  const handleAddNewFood = () => {
    navigate(ROUTES.addFood);
  };

  const handleChangePage = (newPage: number) => {
    foodsStore.setPage(newPage + 1);
  };

  const handleChangePerPage = (perPage: number) => {
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
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography
            variant="h4"
            gutterBottom
          >
            Foods
          </Typography>
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={handleAddNewFood}
          >
            New Foods
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
        />
      </Container>
    </>
  );
});

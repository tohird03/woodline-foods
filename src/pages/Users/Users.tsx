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
import {usersStore} from '../../store/users';
import {usersColumns} from './constants';

export const Users = observer(() => {

  const handleSearchUsers = (value: string) => {
    // TODO
  };

  const handleChangePage = (newPage: number) => {
    usersStore.setPage(newPage + 1);
  };

  const handleChangePerPage = (perPage: number) => {
    usersStore.setSize(perPage);
  };

  useEffect(() => {
    usersStore.getUsers({
      page: usersStore.page,
      size: usersStore.size,
    });
  }, [usersStore.page, usersStore.size]);

  return (
    <>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            User
          </Typography>
        </Stack>

        <Table
          columns={usersColumns}
          data={usersStore.users}
          onFilterSearch={handleSearchUsers}
          pagination={{
            total: usersStore.totalUsers,
            page: usersStore.page,
            size: usersStore.size,
            handlePageChange: handleChangePage,
            handleShowSizeChange: handleChangePerPage,
          }}
        />
      </Container>
    </>
  );
});

import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {observer} from 'mobx-react';
import {
  Container,
  Stack,
  Typography,
} from '@mui/material';
import {Table} from '../../components/table';
import {usersStore} from '../../store/users';
import {AddBalanceModal} from './AddBalance/AddBalanceModal';
import {ChangeOrganisationModal} from './ChangeOrganisation/ChangeOrganisationModal';
import {usersColumns} from './constants';

export const Users = observer(() => {
  const {t} = useTranslation();

  const handleSearchUsers = (value: string) => {
    // TODO
  };

  const handleChangePage = (newPage: number) => {
    usersStore.setPage(newPage + 1);
  };

  const handleChangePerPage = (perPage: number) => {
    usersStore.setPage(1);
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
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography variant="h4" gutterBottom>
            {t('user')}
          </Typography>
        </Stack>

        <Table
          columns={usersColumns.map((column) => ({
            ...column,
            label: t(column.label),
          }))}
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

      {usersStore.isOpenOrganisationModal && <ChangeOrganisationModal />}
      {usersStore.isOpenBalanceModal && <AddBalanceModal />}
    </>
  );
});

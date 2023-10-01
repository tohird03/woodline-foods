import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {observer} from 'mobx-react';
import {
  Stack,
  Typography,
} from '@mui/material';
import {Table} from '../../components/table';
import {usersStore} from '../../store/users';
import {AddBalanceModal} from './AddBalance/AddBalanceModal';
import {ChangeOrganisationModal} from './ChangeOrganisation/ChangeOrganisationModal';
import {ChangeRoleModal} from './ChangeRole/ChangeRoleModal';
import {usersColumns} from './constants';
// import {RoleChangeModal} from './RoleChange/RoleChangeModal';

export const Users = observer(() => {
  const {t} = useTranslation();

  const handleSearchUsers = (value: string) => {
    usersStore.setSearch(value);
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
      search: usersStore.search,
    });
  }, [usersStore.page, usersStore.size, usersStore.search]);

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
        <Typography variant="h4" gutterBottom>
          {t('user')}
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

      {usersStore.isOpenOrganisationModal && <ChangeOrganisationModal />}
      {usersStore.isOpenBalanceModal && <AddBalanceModal />}
      {usersStore.isOpenChangeRoleModal && <ChangeRoleModal />}
    </>
  );
});

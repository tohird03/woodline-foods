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
import {organisationStore} from '../../store/organisation';
import {AddOrganisation} from './AddOrganisation';
import {organisationColumns} from './constants';

export const Organisation = observer(() => {

  const handleSearchProduct = (value: string) => {
    // TODO
  };

  const handleAddNewOrganisation = () => {
    organisationStore.setIsOpenAddOrganisation(true);
  };

  const handleChangePage = (newPage: number) => {
    organisationStore.setPage(newPage + 1);
  };

  const handleChangePerPage = (perPage: number) => {
    organisationStore.setSize(perPage);
  };

  useEffect(() => {
    organisationStore.getOrganisation({
      page: organisationStore.page,
      size: organisationStore.size,
    });
  }, [organisationStore.page, organisationStore.size]);

  return (
    <>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Organisation
          </Typography>
          <Button onClick={handleAddNewOrganisation} variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            New Organisation
          </Button>
        </Stack>

        <Table
          columns={organisationColumns}
          data={organisationStore.organisations}
          onFilterSearch={handleSearchProduct}
          pagination={{
            total: organisationStore.totalOrgs,
            page: organisationStore.page,
            size: organisationStore.size,
            handlePageChange: handleChangePage,
            handleShowSizeChange: handleChangePerPage,
          }}
        />
      </Container>

      {organisationStore.isOpenAddOrganisation && <AddOrganisation />}
    </>
  );
});

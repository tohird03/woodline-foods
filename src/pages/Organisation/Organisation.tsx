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
import {organisationStore} from '../../store/organisation';
import {useMediaQuery} from '../../utils/hooks/useMediaQuery';
import {AddOrganisation} from './AddOrganisation';
import {ChangeGroupModal} from './ChangeGroup/ChangeGroupModal';
import {organisationColumns} from './constants';

export const Organisation = observer(() => {
  const {t} = useTranslation();
  const isMobile = useMediaQuery('(max-width: 650px)');

  const handleSearchProduct = (value: string) => {
    // TODO
  };

  const handleAddNewOrganisation = () => {
    organisationStore.setIsOpenAddOrganisation(true);
  };

  const handleChangePage = (newPage: number) => {
    organisationStore.setPage(newPage + 1);
  };

  const handleChangePerPage = (perPage: number, page: number) => {
    organisationStore.setPage(page);
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
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={1}
      >
        <Typography variant="h4" gutterBottom>
          {t('organisation')}
        </Typography>
        <Button
          onClick={handleAddNewOrganisation}
          variant="contained"
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          {t('newOrganisation')}
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
        isMobile={isMobile}
      />

      {organisationStore.isOpenAddOrganisation && <AddOrganisation />}
      {organisationStore.isOpenGroupChangeModal && <ChangeGroupModal />}
    </>
  );
});

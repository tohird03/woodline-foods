import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {observer} from 'mobx-react';
import {Button, Stack, Typography} from '@mui/material';
import Iconify from '../../components/iconify';
import {Table} from '../../components/table';
import {adminStore} from '../../store/admin';
import {AddAdmin} from './AddAdmin';
import {adminsColumns} from './constants';

export const Admin = observer(() => {
  const {t} = useTranslation();

  const handleSearchUsers = (value: string) => {
    // TODO
  };

  const handleAddNewAdmin = () => {
    adminStore.setIsOpenNewAdminModal(true);
  };

  useEffect(() => {
    adminStore.getAdmins();
  }, []);

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
        <Typography variant="h4" gutterBottom>
          {t('admins')}
        </Typography>
        <Button
          onClick={handleAddNewAdmin}
          variant="contained"
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          {t('newAdmin')}
        </Button>
      </Stack>

      <Table
        columns={adminsColumns}
        data={adminStore.admins}
        onFilterSearch={handleSearchUsers}
        pagination={false}
      />

      {adminStore.isOpenNewAdminModal && <AddAdmin />}
    </>
  );
});

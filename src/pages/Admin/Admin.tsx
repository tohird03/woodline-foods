import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {observer} from 'mobx-react';
import Edit from '@mui/icons-material/Edit';
import {Button, IconButton, Stack, Typography} from '@mui/material';
import Iconify from '../../components/iconify';
import {Table} from '../../components/table';
import {adminStore} from '../../store/admin';
import {useMediaQuery} from '../../utils/hooks/useMediaQuery';
import {AddAdmin} from './AddAdmin';
import {adminsColumns} from './constants';
import {EditAdminModal} from './EditAdmin/EditAdminModal';

export const Admin = observer(() => {
  const {t} = useTranslation();
  const isMobile = useMediaQuery('(max-width: 650px)');
  const [selectedAdminId, setSelectedAdminId] = useState<string>('');

  const handleAddNewAdmin = () => {
    adminStore.setIsOpenNewAdminModal(true);
  };

  const handleEditAdmin = (adminId: string) => {
    setSelectedAdminId(adminId);
    adminStore.setIsOpenEditAdminModal(true);
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
        columns={
          [
            ...adminsColumns,
            {
              key: 'actions',
              label: 'tableUserChangeOrg',
              render: (text, record) => (
                <IconButton onClick={() => handleEditAdmin(record._id)}>
                  <Edit />
                </IconButton>
              ),
            },
          ]}
        data={adminStore.admins}
        pagination={false}
        isMobile={isMobile}
      />

      {adminStore.isOpenNewAdminModal && <AddAdmin />}
      {adminStore.isOpenEditAdminModal && <EditAdminModal adminId={selectedAdminId} />}
    </>
  );
});

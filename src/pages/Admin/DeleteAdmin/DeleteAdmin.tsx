import React from 'react';
import {Button, Modal} from 'antd';
import {adminStore} from '../../../store/admin';
import { Typography } from '@mui/material';

interface DeleteAdminProps {
  adminId: string;
}

const DeleteAdmin: React.FC<DeleteAdminProps> = ({adminId}) => {
  const showModal = (): void => {
    adminStore.setDeleteModalVisible(true);
  };

  const handleOk = () => {
    adminStore.deleteAdmin({
      _id: adminId,
    });
    adminStore.setDeleteModalVisible(false);
  };

  const handleCancel = () => {
    adminStore.setDeleteModalVisible(false);
  };

  const modalFooter = (
    <div>
      <Button onClick={handleCancel}>Нет</Button>
      <Button type="primary" danger onClick={handleOk}>Да</Button>
    </div>
  );

  return (
    <div>
      <Modal
        title="Confirm Delete"
        open={adminStore.isOpenDeleteModal}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={modalFooter}
      >
        <Typography>Rostan ham ushbu adminni ochirmoqchimisz?</Typography>
      </Modal>
    </div>
  );
};

export default DeleteAdmin;

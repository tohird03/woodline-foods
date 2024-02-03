import React from 'react';
import {Button, Modal} from 'antd';
import {adminStore} from '../../../store/admin';

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

  const handleCancel = (): void => {
    adminStore.setDeleteModalVisible(false);
  };

  const modalFooter = (
    <div>
      <Button onClick={handleCancel}>No</Button>
      <Button type="primary" onClick={handleOk}>Yes</Button>
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
        <p>Rostan ham ushbu adminni ochirmoqchimisz?</p>
      </Modal>
    </div>
  );
};

export default DeleteAdmin;

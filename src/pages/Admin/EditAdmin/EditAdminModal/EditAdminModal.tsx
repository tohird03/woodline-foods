import React, {useEffect, useState} from 'react';
import {
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import {IEditAdmin} from '../../../../api/admin/types';
import {adminStore} from '../../../../store/admin';
import { observer } from 'mobx-react';
import { rolesStore } from '../../../../store/roles/roles';
import { IRole } from '../../../../api/roles/types';
import { Modal, Select } from 'antd';

interface EditAdminModalProps {
  adminId: string;
}

export const EditAdminModal: React.FC<EditAdminModalProps> = observer(({adminId}) => {
  const [editedRole, setEditedRole] = useState<any>(null);

  const handleCancel = () => {
    adminStore.setIsOpenEditAdminModal(false);
  };

  const handleEdit = () => {
    adminStore.editAdmin({
      _id: adminId,
      role: editedRole,
    });
  };

  const handleChange = (value: string) => {
    setEditedRole(value);
  };

  const roleOptions = rolesStore.roles.map((role: IRole) => ({ value: role?._id, label: role?.title }));

  useEffect(() => {
    rolesStore.getRoles();
  }, []);

  return (
    <Modal
      onCancel={handleCancel}
      onOk={handleEdit}
      open={adminStore.isOpenEditAdminModal}
      title="Выберите роль"
      width={400}
    >
      <Select
        onChange={handleChange}
        value={editedRole}
        placeholder="Выберите роль"
        style={{width: '100%'}}
        options={roleOptions}
      />
    </Modal>
  );
});

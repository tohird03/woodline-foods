import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {Input, Modal} from 'antd';
import {rolesStore} from '../../../../store/roles/roles';

export const CreateRoleModal: React.FC = observer(() => {
  const [newRoleTitle, setNewRoleTitle] = useState('');

  const handleOk = () => {
    rolesStore.addRole({
      title: newRoleTitle,
    });

    setNewRoleTitle('');
    rolesStore.setCreateRoleModalVisible(false);
  };

  const handleCancel = () => {
    setNewRoleTitle('');
    rolesStore.setCreateRoleModalVisible(false);
  };

  return (
    <Modal
      title="Add Role"
      open={rolesStore.isOpenCreateRoleModal}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Input
        placeholder="Enter role title"
        value={newRoleTitle}
        onChange={(e) => setNewRoleTitle(e.target.value)}
      />
    </Modal>
  );
});

import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {Input, Modal} from 'antd';
import {rolesStore} from '../../../../store/roles/roles';

export const CreateRoleModuleModal: React.FC = observer(() => {
  const [newModuleTitle, setNewModuleTitle] = useState('');

  const handleOk = () => {
    rolesStore.addRoleModule({
      module_uri: newModuleTitle,
    });

    setNewModuleTitle('');
    rolesStore.setCreateRoleModuleModalVisible(false);
  };

  const handleCancel = () => {
    setNewModuleTitle('');
    rolesStore.setCreateRoleModuleModalVisible(false);
  };

  return (
    <Modal
      title="Add Module"
      open={rolesStore.isOpenCreateRoleModuleModal}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Input
        placeholder="Enter module title"
        value={newModuleTitle}
        onChange={(e) => setNewModuleTitle(e.target.value)}
      />
    </Modal>
  );
});

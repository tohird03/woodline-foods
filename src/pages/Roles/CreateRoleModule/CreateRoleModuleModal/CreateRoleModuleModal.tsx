import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {Button, Input, Modal} from 'antd';
import {rolesStore} from '../../../../store/roles/roles';

export const CreateRoleModuleModal: React.FC = observer(() => {
  const [newModuleTitle, setNewModuleTitle] = useState('');

  const handleOk = async () => {
    rolesStore.setIsLoading(true);
    try {
      await rolesStore.addRoleModule({
        module_uri: newModuleTitle,
      });

      setNewModuleTitle('');
      rolesStore.setCreateRoleModuleModalVisible(false);
    } catch (error: any) {
      console.error(error.message);
    } finally {
      rolesStore.setIsLoading(false);
    }


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
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          key="ok"
          type="primary"
          onClick={handleOk}
          loading={rolesStore.isLoading}
        >
          Add module
        </Button>,
      ]}
    >
      <Input
        placeholder="Enter module title"
        value={newModuleTitle}
        onChange={(e) => setNewModuleTitle(e.target.value)}
      />
    </Modal>
  );
});

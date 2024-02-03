import React, {useEffect, useState} from 'react';
import {observer} from 'mobx-react';
import {Button, Input, Modal} from 'antd';
import {rolesStore} from '../../../../store/roles/roles';

export const CreateModuleActionModal: React.FC<{currentModuleUri: string}> = observer(({currentModuleUri}) => {
  const [newModuleTitle, setNewModuleTitle] = useState('');
  const [newActionTitle, setNewActionTitle] = useState('');

  const handleOk = async () => {
    rolesStore.setIsLoading(true);

    try {
      await rolesStore.addModuleAction({
        module_uri: newModuleTitle,
        action_uri: newActionTitle,
      });

      setNewActionTitle('');
      rolesStore.setCreateModuleActionModalVisible(false);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      rolesStore.setIsLoading(false);
    }
  };

  useEffect(() => {
    setNewModuleTitle(currentModuleUri);
  }, [currentModuleUri]);

  const handleCancel = () => {
    setNewActionTitle('');
    rolesStore.setCreateModuleActionModalVisible(false);
  };

  return (
    <Modal
      title="Add Action"
      visible={rolesStore.isOpenCreateModuleActionModal}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={rolesStore.isLoading}
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
          Add Action
        </Button>,
      ]}
    >
      <Input
        placeholder="Enter action title"
        value={newActionTitle}
        onChange={(e) => setNewActionTitle(e.target.value)}
      />
    </Modal>
  );
});

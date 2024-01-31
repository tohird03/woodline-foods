import React, {useEffect, useState} from 'react';
import {observer} from 'mobx-react';
import {Input, Modal} from 'antd';
import {rolesStore} from '../../../../store/roles/roles';

export const CreateModuleActionModal: React.FC<{currentModuleUri: string}> = observer(({currentModuleUri}) => {
  const [newModuleTitle, setNewModuleTitle] = useState('');
  const [newActionTitle, setNewActionTitle] = useState('');

  const handleOk = () => {
    rolesStore.addModuleAction({
      module_uri: newModuleTitle,
      action_uri: newActionTitle,
    });

    setNewActionTitle('');
    rolesStore.setCreateModuleActionModalVisible(false);
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
      open={rolesStore.isOpenCreateModuleActionModal}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Input
        placeholder="Enter action title"
        value={newActionTitle}
        onChange={(e) => setNewActionTitle(e.target.value)}
      />
    </Modal>
  );
});

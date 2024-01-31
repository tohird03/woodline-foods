import React, {useEffect, useState} from 'react';
import {observer} from 'mobx-react';
import {Input, Modal} from 'antd';
import {rolesStore} from '../../../../store/roles/roles';

export const UpdateRoleModuleModal: React.FC<{currentModuleUri: string}> = observer(({currentModuleUri}) => {
  const [moduleTitle, setModuleTitle] = useState('');
  const [newUri, setNewUri] = useState('');

  const handleOk = () => {
    rolesStore.updateRoleModule({
      module_uri: moduleTitle,
      new_uri: newUri,
    });

    setNewUri('');
    rolesStore.setUpdateRoleModuleModalVisible(false);
  };

  useEffect(() => {
    setModuleTitle(currentModuleUri);
  }, [currentModuleUri]);

  const handleCancel = () => {
    setNewUri('');
    rolesStore.setUpdateRoleModuleModalVisible(false);
  };

  return (
    <Modal
      title="Update module"
      open={rolesStore.isOpenUpdateRoleModuleModal}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Input
        placeholder="Enter new module name"
        value={newUri}
        onChange={(e) => setNewUri(e.target.value)}
      />
    </Modal>
  );
});

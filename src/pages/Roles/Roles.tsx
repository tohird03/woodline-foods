import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {PlusOutlined} from '@ant-design/icons';
import {Button, Tree} from 'antd';
import {IRole} from '../../api/roles/types';
import {rolesStore} from '../../store/roles/roles';
import {CreateRoleModal} from './CreateRole/CreateRoleModal';

const {TreeNode} = Tree;

export const RolesPage = observer(() => {
  const handleRoleClick = (selectedKey: React.Key) => {
    console.log('Role Clicked:', selectedKey);
  };

  const renderRoleTreeNodes = (data: IRole[]) =>
    data.map((role: IRole) => (
      <TreeNode title={role.title} key={role._id}>
        {role.modules.map((module: any) => (
          <TreeNode title={module.uri} key={module._id} />
        ))}
      </TreeNode>
    ));

  const handleAddRole = () => {
    rolesStore.addRole({
      title: rolesStore.newRoleTitle as string,
    });
    rolesStore.setNewRoleTitle('');
  };

  return (
    <div>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => rolesStore.setCreateRoleModalVisible(true)}
      >
        Add Role
      </Button>

      <Tree
        showLine
        defaultExpandAll
        onSelect={(selectedKeys) => handleRoleClick(selectedKeys[0])}
      >
        {renderRoleTreeNodes(rolesStore.data)}
      </Tree>

      <CreateRoleModal />

      {/* Add button to trigger adding a new role */}
      <Button onClick={handleAddRole}>Add Role (Test)</Button>
    </div>
  );
});

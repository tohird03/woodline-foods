import React, {useEffect, useState} from 'react';
import {observer} from 'mobx-react';
import {CloseOutlined, PlusOutlined} from '@ant-design/icons';
import {Button, Card, Checkbox, Collapse, Spin, Typography} from 'antd';
import {CheckboxChangeEvent} from 'antd/es/checkbox';
import {IRole, IRoleModule} from '../../api/roles/types';
import {rolesStore} from '../../store/roles/roles';
import {CreateRoleModal} from './CreateRole/CreateRoleModal';
import {CreateModuleActionModal} from './CreateRoleModule/CreateRoleActionModal';
import {CreateRoleModuleModal} from './CreateRoleModule/CreateRoleModuleModal';
import {UpdateRoleModuleModal} from './CreateRoleModule/UpdateRoleModuleModal';
import {RoleStyles} from './styles';

export const RolesPage = observer(() => {
  const {Panel} = Collapse;
  const [currentModuleUri, setCurrentModuleUri] = useState('');

  const handleAddModule = () => {
    rolesStore.setCreateRoleModuleModalVisible(true);
  };

  const handleAddRole = () => {
    rolesStore.setCreateRoleModalVisible(true);
  };

  const handleCheckModule = (
    roleId: string,
    moduleId: string
  ) => {
    rolesStore.toggleRoleModule({
      role_id: roleId,
      module_id: moduleId,
    });
  };

  const handleCheckAction = (
    roleId: string,
    moduleId: string,
    actionId: string
  ) => {
    rolesStore.updateModuleAction({
      role_id: roleId,
      module_id: moduleId,
      action_id: actionId,
    });
  };

  const handleModuleActionClick = (moduleUri: string) => {
    setCurrentModuleUri(moduleUri);
    rolesStore.setCreateModuleActionModalVisible(true);
  };

  const handleUpdateModule = (moduleUri: string) => {
    setCurrentModuleUri(moduleUri);
    rolesStore.setUpdateRoleModuleModalVisible(true);
  };

  const createCheckboxHeader = (role: IRole, module: IRoleModule) => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <div>
        <Checkbox
          onChange={handleCheckModule.bind(null, role._id, module._id)}
          defaultChecked={module.permission}
        />
        <span style={{marginLeft: 8}} onClick={handleUpdateModule.bind(null, module.uri)}>
          {module.uri.charAt(0).toUpperCase() + module.uri.slice(1)}
        </span>
      </div>
      <Button
        type="primary"
        onClick={handleModuleActionClick.bind(null, module.uri)}
        icon={<PlusOutlined />}
      />
    </div>
  );

  const handleActionDelete = (actionUri: string, moduleUri: string) => {
    rolesStore.deleteModuleAction({
      action_uri: actionUri,
      module_uri: moduleUri,
    });
  };

  useEffect(() => {
    rolesStore.getRoles();
  }, []);

  return (
    <>
      <div style={RoleStyles?.Wrapper}>
        <Typography.Text style={RoleStyles.HeaderTitle}>Roles</Typography.Text>
        <div>
          <Button
            icon={<PlusOutlined />}
            onClick={handleAddRole}
            style={{marginRight: '10px'}}
            type="default"
          >
            Add Role
          </Button>
          <Button
            icon={<PlusOutlined />}
            onClick={handleAddModule}
            type="primary"
          >
            Add module
          </Button>
        </div>
      </div>
      <div />
      <div>
        <Card style={{width: '100%'}}>
          {rolesStore.roles.map(role => (
            <div style={{marginBottom: '30px'}} key={role._id}>
              <Typography.Text
                style={{
                  color: 'var(--asosiy, #727372)',
                  fontFamily: 'Roboto',
                  fontSize: '20px',
                  fontStyle: 'normal',
                  fontWeight: '600',
                  lineHeight: '22px',
                }}
              >
                {role.title?.charAt(0).toUpperCase() + role.title?.slice(1)}
              </Typography.Text>
              <div
                style={{
                  display: 'flex',
                  width: '100%',
                  gap: '54px',
                  flexWrap: 'wrap',
                  marginTop: '20px',
                }}
              >
                {role.modules?.map(module => (
                  <Card key={module._id}>
                    <Collapse
                      style={{
                        width: '100%',
                        display: 'flex',
                        gap: '53px',
                        minWidth: '300px'}}
                    >
                      <Panel
                        header={createCheckboxHeader(role, module)}
                        key={`${role._id}-${module._id}`}
                        style={{width: '100%'}}
                      >
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            minWidth: '265px',
                            border: '1px solid #CACACAFF',
                            borderRadius: '10px',
                            padding: '5px',
                          }}
                        >
                          {module.actions.map((action, index) => (
                            <div
                              key={action._id}
                              style={{
                                borderBottom: index === module?.actions.length - 1 ? 'none' : '1px solid #CACACAFF',
                                padding: '5px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                width: '100%',
                              }}
                            >
                              <Checkbox
                                onChange={handleCheckAction.bind(null, role?._id, module?._id, action?._id)}
                                defaultChecked={action.permission}
                              >
                                {action.uri}
                              </Checkbox>
                              <div>
                                <CloseOutlined
                                  onClick={handleActionDelete.bind(null, action.uri, module.uri)}
                                  style={{cursor: 'pointer'}}
                                />
                              </div>
                            </div>
                          ))}

                        </div>
                      </Panel>

                    </Collapse>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </Card>
      </div>

      <CreateRoleModal />
      <CreateRoleModuleModal />
      <CreateModuleActionModal currentModuleUri={currentModuleUri} />
      <UpdateRoleModuleModal currentModuleUri={currentModuleUri} />
    </>
  );
});

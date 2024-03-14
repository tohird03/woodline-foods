import React, {useEffect, useMemo, useState} from 'react';
import {observer} from 'mobx-react';
import {Button, Card, Col, Modal, Row, Select, Tag} from 'antd';
import {IUserRole} from '../../../../api/users/types';
import {usersStore} from '../../../../store/users';
import {addAxiosErrorNotification} from '../../../../utils/notification';

export const ChangeRoleModal = observer(() => {
  const [addRole, setAddRole] = useState<IUserRole | null>(null);
  const handleClose = () => {
    usersStore.setIsOpenChangeRoleModal(false);
  };

  const handleRemoveRole = (e: React.MouseEvent<HTMLElement>, role: IUserRole) => {
    e.preventDefault();

    usersStore.changeRole({
      user: usersStore?.singleUser?._id!,
      role,
      type: false,
    })
      .catch(addAxiosErrorNotification);
  };

  const handleAddRoleSelectChange = (value: IUserRole) => {
    setAddRole(value);
  };

  const handleAddRole = () => {
    usersStore.changeRole({
      user: usersStore?.singleUser?._id!,
      role: addRole!,
      type: true,
    })
      .catch(addAxiosErrorNotification);
  };

  useEffect(() => () => {
    usersStore.setSingleUser(null);
  }, []);

  const roleOptions = useMemo(() => (
    [IUserRole.Cook, IUserRole.User]
      .filter(role => !usersStore?.singleUser?.roles?.includes(role))
      .map(role => ({value: role, label: role}))
  ),
  [usersStore.singleUser]);

  return (
    <Modal
      open={usersStore.isOpenChangeRoleModal}
      onCancel={handleClose}
      title="Change role"
      footer={null}
      width={500}
    >
      <div style={{width: '100%'}}>
        <Card title={`${usersStore?.singleUser?.first_name} roles`}>
          {
            usersStore?.singleUser?.roles?.map((role) => (
              <Tag
                key={role}
                closable
                onClose={(evt) => handleRemoveRole(evt, role)}
                color="#87d068"
              >
                {role}
              </Tag>
            ))
          }
        </Card>

        {
          roleOptions?.length > 0 && (
            <Row style={{margin: '20px 0'}} gutter={24}>
              <Col span={6}>
                <Select
                  placeholder="Add Role"
                  options={roleOptions}
                  onChange={handleAddRoleSelectChange}
                />
              </Col>
              <Col span={6}>
                <Button
                  onClick={handleAddRole}
                  type="primary"
                >
                  Add role
                </Button>
              </Col>
            </Row>
          )
        }
      </div>
    </Modal>
  );
});

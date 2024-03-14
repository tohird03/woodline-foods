import React from 'react';
import {observer} from 'mobx-react';
import {UsergroupAddOutlined, UsergroupDeleteOutlined} from '@ant-design/icons';
import {Badge, Button} from 'antd';
import {IHistoryUsers} from '../../../api/history/types';
import {historyStore} from '../../../store/history';

type Props = {
  users: IHistoryUsers[];
  type?: boolean;
};

export const Users = observer(({users, type}: Props) => {

  const handleOpenUsersModal = () => {
    historyStore.setUsers(users);
    historyStore.setIsOpenUsersModal(true);
  };

  return (
    <Badge style={{backgroundColor: '#52c41a'}} count={users?.length}>
      <Button
        onClick={handleOpenUsersModal}
        type="primary"
        icon={type
          ? <UsergroupAddOutlined />
          : <UsergroupDeleteOutlined />
        }
      />
    </Badge>
  );
});

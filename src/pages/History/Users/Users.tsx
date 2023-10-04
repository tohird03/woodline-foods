import React from 'react';
import {observer} from 'mobx-react';
import {UsergroupAddOutlined, UsergroupDeleteOutlined} from '@ant-design/icons';
import {Button} from 'antd';
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
    <Button
      onClick={handleOpenUsersModal}
      type="primary"
      icon={type
        ? <UsergroupAddOutlined />
        : <UsergroupDeleteOutlined />
      }
    />
  );
});

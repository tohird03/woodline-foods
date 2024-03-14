import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import {Modal} from 'antd';
import {Table} from '../../../../components/table';
import {historyStore} from '../../../../store/history';
import {usersColumns} from '../../constants';

export const UsersModal = observer(() => {
  const handleClose = () => {
    historyStore.setIsOpenUsersModal(false);
  };

  const handleFinish = () => {
    handleClose();
  };

  useEffect(() => () => {
    historyStore.setUsers([]);
  }, []);

  return (
    <Modal
      open={historyStore.isOpenUsersModal}
      onCancel={handleClose}
      onOk={handleFinish}
      width={400}
      title="Users"
    >
      <Table
        columns={usersColumns}
        data={historyStore.users}
        isMobile
        pagination={false}
      />
    </Modal>
  );
});

import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import {Modal} from '../../../../../../components/Modal';
import {Table} from '../../../../../../components/table';
import {usersStore} from '../../../../../../store/users';
import {orderFoodsColumns} from '../../../../constants';

const MODAL_WIDTH = 550;

export const OrderProductModal = observer(() => {

  const handleClose = () => {
    usersStore.setIsOpenOrderProductModal(false);
  };

  useEffect(() => () => {
    usersStore.setFoods([]);
  }, []);

  return (
    <Modal
      open={usersStore.isOpenOrderProductModal}
      onButtonClose={handleClose}
      width={MODAL_WIDTH}
      title="Заказ"
    >
      <Table
        columns={orderFoodsColumns}
        data={usersStore.foods}
        pagination={false}
        min
      />
    </Modal>
  );
});

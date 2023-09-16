import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import {Modal} from '../../../../components/Modal';
import {Table} from '../../../../components/table';
import {orderStore} from '../../../../store/order';
import {orderFoodsColumns} from '../../constants';

export const OrderProductModal = observer(() => {

  const handleClose = () => {
    orderStore.setIsOpenOrderProductModal(false);
  };

  useEffect(() => () => {
    orderStore.setFoods([]);
  }, []);

  return (
    <Modal
      open={orderStore.isOpenOrderProductModal}
      onButtonClose={handleClose}
      title="Заказ"
      width={550}
    >
      <Table
        columns={orderFoodsColumns}
        data={orderStore.foods}
        pagination={false}
        min
      />
    </Modal>
  );
});

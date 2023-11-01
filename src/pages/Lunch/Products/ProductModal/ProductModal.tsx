import React from 'react';
import {observer} from 'mobx-react';
import {Modal} from '../../../../components/Modal';
import {Table} from '../../../../components/table';
import {lunchStore} from '../../../../store/lunch';
import {orderFoodsColumns} from '../../../Foods/constants';

const MODAL_WIDTH = 550;

export const ProductModal = observer(() => {

  const handleClose = () => {
    lunchStore.setIsOpenFoodProductModal(false);
  };

  return (
    <Modal
      open={lunchStore.isOpenSingleFoodProductModal}
      onButtonClose={handleClose}
      width={MODAL_WIDTH}
      title="Products"
    >
      <Table
        columns={orderFoodsColumns}
        data={lunchStore.singleFoodProduct}
        pagination={false}
        min
      />
    </Modal>
  );
});

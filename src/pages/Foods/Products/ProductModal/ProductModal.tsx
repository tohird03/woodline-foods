import React from 'react';
import {Modal} from '../../../../components/Modal';
import {Table} from '../../../../components/table';
import {foodsStore} from '../../../../store/foods';
import {orderFoodsColumns} from '../../constants';

const MODAL_WIDTH = 550;

export const ProductModal = () => {

  const handleClose = () => {
    foodsStore.setIsOpenFoodProductModal(false);
  };

  return (
    <Modal
      open={foodsStore.isOpenSingleFoodProductModal}
      onButtonClose={handleClose}
      width={MODAL_WIDTH}
      title="Products"
    >
      <Table
        columns={orderFoodsColumns}
        data={foodsStore.singleFoodProduct}
        pagination={false}
        min
      />
    </Modal>
  );
};

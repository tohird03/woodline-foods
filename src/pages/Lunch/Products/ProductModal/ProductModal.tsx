import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {CheckOutlined, DeleteOutlined, EditOutlined} from '@ant-design/icons';
import {Button, InputNumber, Modal, Popconfirm} from 'antd';
import {IFoodsProducts} from '../../../../api/foods/types';
import {lunchApi} from '../../../../api/lunch';
import {Table} from '../../../../components/table';
import {TableColumn} from '../../../../components/table/types';
import {lunchStore} from '../../../../store/lunch';
import {addAxiosErrorNotification, successNotification} from '../../../../utils/notification';

const MODAL_WIDTH = 550;

export const ProductModal = observer(() => {
  const [singleEditProduct, setSingleEditProduct] = useState<IFoodsProducts | null>(null);
  const [editSaveProducts, setEditSaveProducts] = useState<IFoodsProducts[]>([]);
  const [editAmount, setEditAmount] = useState(0);

  const handleClose = () => {
    lunchStore.setIsOpenFoodProductModal(false);
    lunchStore.setSingleLunchId(null);
    setSingleEditProduct(null);
    setEditSaveProducts([]);
    setEditAmount(0);
  };

  const handleEditProduct = (product: IFoodsProducts) => {
    setSingleEditProduct(product);
    setEditAmount(product?.amount);
  };

  const handleChangeAmount = (value: number | null) => {
    setEditAmount(value! | 0);
  };

  const handleSaveProduct = (product: IFoodsProducts) => {
    const findProductIndex = editSaveProducts?.findIndex(el => el?.product?._id === product?.product?._id);

    product.amount = editAmount;

    if (findProductIndex !== -1) {
      editSaveProducts.splice(findProductIndex, 1, product);
      setEditSaveProducts(editSaveProducts);
    } else {
      setEditSaveProducts([...editSaveProducts, product]);
    }

    setSingleEditProduct(null);
  };

  const handleSaveEditedProduct = () => {
    const editedProducts = editSaveProducts?.map(product => ({
      product: product?.product?._id,
      amount: product?.amount,
    }));

    lunchApi.editedProduct({
      lunchId: lunchStore.singleLunchId!,
      products: editedProducts,
    })
      .then(res => {
        if (res) {
          successNotification('Успех обновленных продуктов');
          handleClose();
        }
      })
      .catch(addAxiosErrorNotification);
  };

  const handleDeleteProduct = (product: IFoodsProducts) => {
    lunchApi.deleteProduct(product?.product?._id)
      .then(res => {
        if (res) {
          successNotification('Успех обновленных продуктов');
          handleClose();
        }
      })
      .catch(addAxiosErrorNotification);
  };

  const orderFoodsColumns: TableColumn[] = [
    {
      key: 'index',
      label: '#',
      render: (value, record, index) => (index + 1),
    },
    {
      key: 'name',
      label: 'Name',
      render: (value, record) => (record?.product?.name || '-'),
    },
    {
      key: 'amount',
      label: 'Amount',
      render: (value, record) => (
        <InputNumber
          type="number"
          disabled={singleEditProduct?.product?._id !== record?.product?._id}
          defaultValue={Number(value)}
          onChange={handleChangeAmount}
        />
      ),
    },
    {
      key: 'cost',
      label: 'Cost',
      render: (value, record) => (`${record?.product?.cost} сум`),
    },
    {
      key: 'edit',
      label: 'tableUserChangeOrg',
      render: (value, record) => (
        <div style={{display: 'flex', gap: '10px'}}>
          <Button
            onClick={singleEditProduct?.product?._id !== record?.product?._id
              ? handleEditProduct.bind(null, record as IFoodsProducts)
              : handleSaveProduct.bind(null, record as IFoodsProducts)
            }
            icon={singleEditProduct?.product?._id !== record?.product?._id
              ? <EditOutlined />
              : <CheckOutlined />
            }
            type={singleEditProduct?.product?._id !== record?.product?._id
              ? 'primary'
              : 'default'
            }
          />
          <Popconfirm
            title="Удалить продукт!"
            description="Вы уверены, что хотите удалить этот продукт?"
            onConfirm={handleDeleteProduct.bind(null, record as IFoodsProducts)}
            okText="Да"
            cancelText="Нет"
            okButtonProps={{style: {background: 'red'}}}
          >
            <Button
              icon={<DeleteOutlined />}
              type="primary"
              danger
            />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <Modal
      open={lunchStore.isOpenSingleFoodProductModal}
      onCancel={handleClose}
      width={MODAL_WIDTH}
      title="Products"
      footer={null}
    >
      <div>
        <Table
          columns={orderFoodsColumns}
          data={lunchStore.singleFoodProduct}
          pagination={false}
          min
        />

        <Button
          style={{marginLeft: 'auto', display: 'flex', marginTop: '10px'}}
          onClick={handleSaveEditedProduct}
          type="primary"
        >
        Save
        </Button>
      </div>
    </Modal>
  );
});

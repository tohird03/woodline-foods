import React from 'react';
import {useTranslation} from 'react-i18next';
import {IOrderStatus} from '../../api/order/types';
import Label, {LabelProps} from '../../components/label';
import {TableColumn} from '../../components/table/types';
import {getFullDateFormat, uszFormatPrice} from '../../utils/formatTime';
import {OrderProduct} from './OrderProduct';

export const ordersColumn: TableColumn[] = [
  {
    key: 'client',
    label: 'tableOrderUser',
    render: (value, record) => (record?.client?.first_name || '-'),
  },
  {
    key: 'foods',
    label: 'tableOrderOrder',
    render: (value, record) => (
      <OrderProduct foods={record?.foods} />
    ),
  },
  {
    key: 'total_cost',
    label: 'tableOrderPrice',
    render: (value) => (`${uszFormatPrice(parseInt(value, 10))} сум`),
  },
  {
    key: 'createdAt',
    label: 'tableOrderCreatedAt',
    render: (value) => (getFullDateFormat(value)),
  },
  {
    key: 'status',
    label: 'tableOrderStatus',
    render: (value) => <OrderStatusLabel status={value as IOrderStatus} />,
  },
];

export const orderFoodsColumns: TableColumn[] = [
  {
    key: 'index',
    label: '#',
    render: (value, record, index) => (index + 1),
  },
  {
    key: 'name',
    label: 'Name',
    render: (value, record) => (record?.food?.name || '-'),
  },
  {
    key: 'amount',
    label: 'Amount',
    render: (value) => (value),
  },
  {
    key: 'cost',
    label: 'Cost',
    render: (value, record) => (record?.food?.cost),
  },
];

export const OrderStatusColor: Record<IOrderStatus, LabelProps['color']> = {
  [IOrderStatus.ACCEPTED]: 'success',
  [IOrderStatus.CANCELED]: 'error',
  [IOrderStatus.PENDING]: 'primary',
};

const OrderStatusLabel: React.FC<{status: IOrderStatus}> = ({status}) => {
  const {t} = useTranslation();
  const localizedStatus = {
    [IOrderStatus.ACCEPTED]: t('tableOrderStatusAccepted'),
    [IOrderStatus.CANCELED]: t('tableOrderStatusCancelled'),
    [IOrderStatus.PENDING]: t('tableOrderStatusPending'),
  };

  return (
    <Label color={OrderStatusColor[status]} variant={'outlined'}>
      {localizedStatus[status]}
    </Label>
  );
};

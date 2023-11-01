import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigate, useParams} from 'react-router-dom';
import {observer} from 'mobx-react';
import {Stack, Typography, useMediaQuery} from '@mui/material';
import {ArrowLeftOutlined} from '@ant-design/icons';
import {Button} from 'antd';
import {Table} from '../../../components/table';
import {ROUTES} from '../../../constants/router';
import {usersStore} from '../../../store/users';
import {userOrdersColumns} from '../constants';
import {OrderProductModal} from './OrderProduct/OrderProductModal';

export const UserOrders = observer(() => {
  const {id} = useParams();
  const {t} = useTranslation();
  const isMobile = useMediaQuery('(max-width: 650px)');
  const navigate = useNavigate();

  const handleChangePage = (newPage: number) => {
    usersStore.setOrderPage(newPage + 1);
  };

  const handleChangePerPage = (perPage: number, page: number) => {
    usersStore.setOrderPage(page);
    usersStore.setOrderSize(perPage);
  };

  const handleBack = () => {
    navigate(ROUTES.users);
  };

  useEffect(() => {
    usersStore.getUserOrder({
      id: id!,
      page: usersStore?.orderPage!,
      size: usersStore?.orderSize!,
    });
  }, [usersStore?.orderPage, usersStore?.orderSize, id]);

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
        <Button icon={<ArrowLeftOutlined />} onClick={handleBack} />
        <Typography variant="h4" gutterBottom>
          {t('user')}
        </Typography>
      </Stack>

      <Table
        columns={userOrdersColumns}
        data={usersStore.userOrders}
        pagination={{
          total: usersStore.totalUserOrder,
          page: usersStore.orderPage,
          size: usersStore.orderSize,
          handlePageChange: handleChangePage,
          handleShowSizeChange: handleChangePerPage,
        }}
        isMobile={isMobile}
      />

      {usersStore.isOpenOrderProductModal && <OrderProductModal />}
    </>
  );
});

import React from 'react';
import {useNavigate} from 'react-router-dom';
import {ArrowLeftOutlined} from '@ant-design/icons';
import {Button} from 'antd';
import {TabsWithPanel} from '../../../components/Tabs';
import {ROUTES} from '../../../constants/router';
import {useMediaQuery} from '../../../utils/hooks/useMediaQuery';
import {SingleUserOrder} from '../constants';

export const SingleUser = () => {
  const isMobile = useMediaQuery('(max-width: 650px)');
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(ROUTES.users);
  };

  return (
    <>
      <Button icon={<ArrowLeftOutlined />} onClick={handleBack} />
      <TabsWithPanel
        isMobile={isMobile}
        tabs={SingleUserOrder}
      />
    </>
  );
};

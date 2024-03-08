import React, {ReactElement} from 'react';
import {observer} from 'mobx-react';
import {AdminRole} from '../api/auth/types';
import {ROUTES} from '../constants/router';
import {useStores} from '../store/store-context';
import {NotFound} from './lazy';

type Props = {
  page: ReactElement;
  path: string;
};

export const RoleChecker = observer(({page, path}: Props) => {
  const {authStore} = useStores();
  // const userRole = authStore?.staffInfo?.admin?.role?[0];

  // if (userRole === AdminRole.COOK && (path === ROUTES.order || path === ROUTES.lunch)) {
  //   return page;
  // } else if (userRole === AdminRole.STOREKEEPER && path === ROUTES.product) {
  //   return page;
  // } else if (userRole === AdminRole.SUPER_ADMIN) {
  //   return page;
  // } else {
  //   return <NotFound />;
  // }

  return page;
});

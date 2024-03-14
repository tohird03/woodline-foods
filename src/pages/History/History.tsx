import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {observer} from 'mobx-react';
import {Stack, Typography} from '@mui/material';
import {Table} from '../../components/table';
import {historyStore} from '../../store/history';
import {useMediaQuery} from '../../utils/hooks/useMediaQuery';
import {historyColumns} from './constants';
import {UsersModal} from './Users/UsersModal';

export const History = observer(() => {
  const {t} = useTranslation();
  const isMobile = useMediaQuery('(max-width: 650px)');

  const handleSearchUsers = () => {
    // TODO
  };

  const handleChangePage = (newPage: number) => {
    historyStore.setPage(newPage + 1);
  };

  const handleChangePerPage = (perPage: number, page: number) => {
    historyStore.setPage(page);
    historyStore.setSize(perPage);
  };

  useEffect(() => {
    historyStore.getHostory({
      page: historyStore.page,
      size: historyStore.size,
    });
  }, [historyStore.page, historyStore.size]);

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
        <Typography variant="h4" gutterBottom>
          {t('lunchHistory')}
        </Typography>
      </Stack>

      <Table
        columns={historyColumns}
        data={historyStore.history}
        onFilterSearch={handleSearchUsers}
        pagination={{
          total: historyStore.totalHistory,
          page: historyStore.page,
          size: historyStore.size,
          handlePageChange: handleChangePage,
          handleShowSizeChange: handleChangePerPage,
        }}
        isMobile={isMobile}
      />

      {historyStore.isOpenUsersModal && <UsersModal />}
    </>
  );
});

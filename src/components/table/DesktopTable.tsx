import React from 'react';
import {Card, Skeleton, Table as MuiTable, TableContainer, TablePagination, TableRow} from '@mui/material';
import {getPaginationCount} from './constants';
import {NoData} from './NoData';
import {SearchHead} from './SearchHead';
import {TableBody} from './TableBody';
import {TableHead} from './TableHead';
import {ITableProps} from './types';

export const DesktopTable = (props: ITableProps) => {
  const {
    columns,
    data = [],
    pagination,
    onFilterSearch,
    onOpenFilter,
    min,
    loading,
  } = props;
  const handlePaginationPageChange = (event: unknown, newPage: number) => {
    if (pagination && pagination.handlePageChange) {
      pagination.handlePageChange(newPage);
    }
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (pagination && pagination?.handleShowSizeChange) {
      pagination.handleShowSizeChange?.(parseInt(event.target.value, 10), 1);
    }
  };

  const handleSearch = (value: string) => {
    onFilterSearch?.(value);
  };

  return (
    <Card>
      {
        (onFilterSearch || onOpenFilter) && (
          <SearchHead onOpenFilter={onOpenFilter} onFilterName={handleSearch} />
        )
      }

      <TableContainer>
        <MuiTable sx={min ? {} : {minWidth: 800}}>
          {loading && <TableHead columns={columns} />}
          {!loading && (
            <>
              <TableHead columns={columns} />
              {
                data?.length > 0
                  ? <TableBody sx={min ? {} : {minWidth: 800}} data={data} columns={columns} />
                  : <NoData column={columns} />
              }
            </>
          )
          }
        </MuiTable>
        {loading && (
          <>
            <Skeleton sx={{marginBottom: '2px'}} variant="rounded" width="100%" height={40} />
            <Skeleton sx={{marginBottom: '2px'}} variant="rounded" width="100%" height={40} />
            <Skeleton sx={{marginBottom: '2px'}} variant="rounded" width="100%" height={40} />
            <Skeleton sx={{marginBottom: '2px'}} variant="rounded" width="100%" height={40} />
            <Skeleton sx={{marginBottom: '2px'}} variant="rounded" width="100%" height={40} />
            <Skeleton sx={{marginBottom: '2px'}} variant="rounded" width="100%" height={40} />
            <Skeleton sx={{marginBottom: '2px'}} variant="rounded" width="100%" height={40} />
            <Skeleton sx={{marginBottom: '2px'}} variant="rounded" width="100%" height={40} />
            <Skeleton sx={{marginBottom: '2px'}} variant="rounded" width="100%" height={40} />
          </>
        )
        }
      </TableContainer>

      {
        pagination && (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={pagination.total}
            rowsPerPage={pagination.size}
            page={(pagination.page - 1) || 0}
            onPageChange={handlePaginationPageChange}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelDisplayedRows={getPaginationCount}
          />
        )
      }
    </Card>
  );
};

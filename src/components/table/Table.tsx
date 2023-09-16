import React from 'react';
import {Card, Table as MuiTable, TableContainer, TablePagination} from '@mui/material';
import {getPaginationCount} from './constants';
import {NoData} from './NoData';
import {SearchHead} from './SearchHead';
import {TableBody} from './TableBody';
import {TableHead} from './TableHead';
import {ITableProps} from './types';

export const Table = ({
  data,
  columns,
  pagination,
  onFilterSearch,
  min,
}: ITableProps) => {

  const handlePaginationPageChange = (event: unknown, newPage: number) => {
    if (pagination && pagination.handlePageChange) {
      pagination.handlePageChange(newPage);
    }
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (pagination && pagination?.handleShowSizeChange) {
      pagination.handleShowSizeChange?.(parseInt(event.target.value, 10));
    }
  };

  const handleSearch = (value: string) => {
    onFilterSearch?.(value);
  };

  return (
    <Card>
      {
        onFilterSearch && (
          <SearchHead onFilterName={handleSearch} />
        )
      }

      <TableContainer>
        <MuiTable>
          <TableHead columns={columns} />
          {
            data?.length > 0
              ? <TableBody sx={min ? {} : {minWidth: 800}} data={data} columns={columns} />
              : <NoData column={columns} />
          }
        </MuiTable>
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

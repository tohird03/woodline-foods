import React from 'react';
import {DesktopTable} from './DesktopTable';
import {MobileTable} from './MobileTable';
import {ITableProps} from './types';

export const Table = ({
  data,
  columns,
  pagination,
  onFilterSearch,
  min,
  isMobile = false,
  searchPlaceholder,
  searchPrefex,
  searchSuffix,
}: ITableProps) => (
  <>
    {isMobile
      ? (
        <MobileTable
          data={data}
          columns={columns}
          pagination={pagination}
          onFilterSearch={onFilterSearch}
          searchPlaceholder={searchPlaceholder}
          searchPrefex={searchPrefex}
          searchSuffix={searchSuffix}
        />
      )
      : (
        <DesktopTable
          data={data}
          columns={columns}
          pagination={pagination}
          onFilterSearch={onFilterSearch}
          min={min}
        />
      )
    }
  </>
);

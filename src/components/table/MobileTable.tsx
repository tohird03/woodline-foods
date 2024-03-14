/* eslint-disable react/no-array-index-key */
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Card, Divider, Input, Pagination, PaginationProps} from 'antd';
// @ts-ignore
import styles from './datatable.module.css';
import {NoData} from './NoData';
import {ITableProps} from './types';

export const MobileTable = (props: ITableProps) => {
  const {
    columns,
    data = [],
    pagination,
    onFilterSearch,
    searchPlaceholder,
    searchPrefex,
    searchSuffix,
  } = props;
  const {t} = useTranslation();

  const onChange: PaginationProps['onChange'] = (page, pageSize) => {
    if (pagination) {
      pagination?.handlePageChange?.(page);
      pagination?.handleShowSizeChange?.(pageSize, page);
    }
  };

  const handleSearch = (event: React.FormEvent<HTMLInputElement>) => {
    onFilterSearch?.(event?.currentTarget.value);
  };

  return (
    <div className={styles.card_wrapper}>
      {onFilterSearch &&
        <Input
          size="large"
          placeholder={searchPlaceholder || 'Search'}
          prefix={searchPrefex}
          suffix={searchSuffix}
          onChange={handleSearch}
        />
      }
      {data?.length > 0
        ? data?.map((d, dIndex) => (
          <Card
            bodyStyle={{padding: '24px'}}
            key={dIndex}
            className={styles.card}
          >
            {columns.map((c, cIndex) => {
              const isLast = cIndex === columns.length - 1;

              return (
                <div key={cIndex}>
                  <div key={c.key} className={styles.paragraph}>
                    <span className={styles.head}>{t(c.label)}</span>

                    {c.render ? (
                      c.render(d[c.key], d, cIndex)
                    ) : (
                      <span className={styles.title}>{d[c.key]}</span>
                    )}
                  </div>
                  {isLast ? null : (
                    <Divider key={c.key} className={styles.line} />
                  )}
                </div>
              );
            })}
          </Card>
        ))
        : <NoData column={columns} />
      }

      <div className={styles.pagination}>
        {pagination && (
          <Pagination
            onChange={onChange}
            current={pagination?.page}
            total={pagination?.total}
          />
        )}
      </div>
    </div>
  );
};

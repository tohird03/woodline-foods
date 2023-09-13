export interface ITableProps {
  data: DataRow[];
  columns: TableColumn[];
  pagination: ITablePaginationProps | false;
  onFilterSearch?: (value: string) => void;
}

export interface ITableHead {
  columns: TableColumn[];
}

export interface ITablePaginationProps {
  page: number;
  size: number;
  total: number;
  handlePageChange?: (newPage: number) => void;
  handleShowSizeChange?: (perPage: number) => void;
}

export interface DataRow {
  _id: any;
  [key: string]: any;
}

export interface TableColumn {
  key: string;
  label: string | React.ReactNode;
  align?: 'right' | 'center' | 'left';
  render?: (value: string, row: DataRow, index: number) => React.ReactNode;
}

export interface ITableBody {
  data: DataRow[];
  columns: TableColumn[];
}

export type LabelType = {
  from: number;
  to: number;
  count: number;
};

export interface ISearchHeadProps {
  onFilterName: (value: string) => void;
}

export interface IGetProductLogs {
  _id: string;
  product: {
    name: string;
    unit: string;
  };
  org: {
    name_org: string;
  };
  amount: number;
  cost: number;
}

export interface IProductLogs {
  data: IGetProductLogs[];
  count: number;
}

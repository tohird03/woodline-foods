export interface IProducts {
  _id: string;
  amount: number;
  name: string;
  min_amount: number;
  unit: string;
  org: {
    name_org: string;
  };
  createdAt: string;
  cost: number;
}

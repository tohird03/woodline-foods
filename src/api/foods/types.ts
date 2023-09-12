export interface IFoods {
  _id: string;
  name: string;
  cost: number;
  products: IFoodsProducts[];
  org: string;
  category: string;
  createdAt: string;
}

export interface IFoodsProducts {
  product: {
    _id: string;
    name: string;
    cost: number;
  };
  amount: number;
}

export interface IGetHistory {
  data: IHistory[];
  totalTrips: number;
}

export interface IHistory {
  _id: string;
  meal: {
    _id: string;
    name: string;
    cost: number;
  };
  org: {
    _id: string;
    name_org: string;
  };
  createdAt: string;
}

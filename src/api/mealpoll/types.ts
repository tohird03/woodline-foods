export interface IGetMealPoll {
  // "count": 0,
  //   "pageNumber": 5,
  //   "pageSize": 5,
  //   "pageCount": 5,
  //   "mealpollList": []
  count: number;
  pageNumber: number;
  pageSize: number;
  pageCount: number;
  mealpollList: IMealPollList[];
}

export interface IMealPollList {
  _id: string;
  name: string;
}

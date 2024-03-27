export interface IGetPayments {
  data: IPayments[];
  count: number;
}

export interface IPayments {
  _id: string;
  type: boolean;
  amount: number;
  createdAt: string;
  client: {
    first_name: string;
    last_name: string;
    phone_number: string;
    roles: IPaymentUserRole[];
  };
  org: {
    name_org: string;
  };
}

export enum IPaymentUserRole {
  User = 'user',
  Cook = 'cook',
}

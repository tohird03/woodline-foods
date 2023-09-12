export interface IUsers {
  _id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  balance: number;
  telegram_id: number;
  is_active: boolean;
  is_verified: boolean;
  roles: string[];
  language_code: string;
  createdAt: string;
  org: {
    _id: string;
    name_org: string;
  };
}

export interface IGetUser {
  data: IUsers[];
  totalUsers: number;
}

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

export interface IChangeStatus {
  id: string;
  is_active: boolean;
}

export interface IGetOrganisation {
  data: IOrganisation[];
  totalOrgs: number;
}

export interface IOrganisation {
  _id: string;
  name_org: string;
  is_active: boolean;
  is_deleted: boolean;
  createdAt: string;
}

export interface IChangeOrganisation {
  user: string;
  org: string;
}

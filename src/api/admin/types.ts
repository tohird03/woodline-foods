import {AdminRole} from '../auth/types';

export interface IAdminGet {
  adminList: IAdmins[];
}
export interface IAdmins {
  _id: string;
  fullname: string;
  password: string;
  org: {
    id: string;
    name_org: string;
  };
  // role: AdminRole[];
  phone_number: string;
  createdAt: string;
}

export interface IAddAdmin {
  phone_number: string;
  fullname: string;
  password: string;
  org: string;
  role: string;
}

export interface IEditAdmin {
  _id: string;
  phone_number: string;
  fullname: string;
  password: string;
  org: string;
  role: string;
}

export interface IDeleteAdmin {
  _id: string;
}


import {AdminRole} from '../auth/types';

export interface IAdminGet {
  adminList: IAdmins[];
}
export interface IAdmins {
  _id: string;
  fullName: string;
  password: string;
  org: string;
  role: AdminRole[];
  phoneNumber: string;
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


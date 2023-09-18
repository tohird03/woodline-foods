import {AdminRole} from '../auth/types';

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

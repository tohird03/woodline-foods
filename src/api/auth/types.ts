export interface ILogin {
  phone_number: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
  admin: {
    fullname: string;
    role: AdminRole[];
  };
}

export enum AdminRole {
  SUPER_ADMIN = 'admin',
  COOK = 'cook',
  STOREKEEPER = 'storekeeper',
}

export interface ILogin {
  phoneNumber: string;
  password: string;
}

export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
}

export enum AdminRole {
  SUPER_ADMIN = 'admin',
  COOK = 'cook',
  STOREKEEPER = 'storekeeper',
}

export type TStage = {
  apiUrl: string;
  cdnHost: string;
  hhUrl: string;
};

export interface IPagination {
  page?: number;
  size?: number;
}

export interface INetworkConfig {
  baseURL?: string;
  headers?: any;
  timeout?: number;
}
export type TNetworkError = {
  status?: number;
  message: string;
  title: string;
};

export type TMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

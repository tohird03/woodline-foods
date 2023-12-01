import axios, {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import {resetStores, store} from '../store/store';
import {Endpoints} from './endpoints';
import {INetworkConfig, TMethod} from './types';

const stage = {
  // apiUrl: 'https://food.mirabdulloh.uz',
  apiUrl: 'http://192.168.1.127:3000',
};

export class Instance {
  protected readonly instance: AxiosInstance;
  protected baseURL = '';

  public constructor({baseURL = Endpoints.Base, headers, timeout = 65000}: INetworkConfig) {
    this.instance = axios.create({
      baseURL,
      timeout,
      headers,
    });
    // @ts-ignore
    this.instance.interceptors.request.use(this.handleRequest);
    this.instance.interceptors.response.use(this.handleResponse, this.handleResponseError);
    this.baseURL = baseURL;
  }

  handleResponse = <T>(response: AxiosResponse<T>) => response;

  private handleResponseError = (error: AxiosError) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      resetStores();
    }

    throw error;
  };


  private handleRequest = async ({headers, ...restConfig}: AxiosRequestConfig) => {
    const {authStore} = store;
    const accessToken = authStore.token;

    return {
      headers: {
        ...headers,
        ...(accessToken && {Authorization: `Bearer ${authStore.token}`}),
      },
      ...restConfig,
    };
  };

  public async send(method: TMethod, url: string, params?: any, config?: AxiosRequestConfig) {
    const {data} = await this.instance[method](url, params, {...config, baseURL: `${stage.apiUrl}${this.baseURL}`});

    return data;
  }

  public async get(url: string, params?: any) {
    const {data} = await this.instance.get(url, {...params, baseURL: `${stage.apiUrl}${this.baseURL}`});

    return data;
  }

  public async post(url: string, params?: any, config?: AxiosRequestConfig) {
    const {data} = await this.instance.post(url, params, {...config, baseURL: `${stage.apiUrl}${this.baseURL}`});

    return data;
  }

  public async delete(url: string, config?: AxiosRequestConfig) {
    const {data} = await this.instance.delete(url, {...config, baseURL: `${stage.apiUrl}${this.baseURL}`});

    return data;
  }

  public async put(url: string, params?: any, config?: AxiosRequestConfig) {
    const {data} = await this.instance.put(url, params, {...config, baseURL: `${stage.apiUrl}${this.baseURL}`});

    return data;
  }

  public async patch(url: string, params?: any, config?: AxiosRequestConfig) {
    const {data} = await this.instance.patch(url, params, {...config, baseURL: `${stage.apiUrl}${this.baseURL}`});

    return data;
  }
}

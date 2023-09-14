import {Endpoints} from '../endpoints';
import {Instance} from '../instance';
import {INetworkConfig} from '../types';
import {IMessageParams, IMessagesResponse} from './types';

const config: INetworkConfig = {
  baseURL: Endpoints.Base,
};

class AppApi extends Instance {
  constructor(config: INetworkConfig) {
    super(config);
  }

  sendMessage = (params: IMessageParams): Promise<IMessagesResponse> =>
    this.post(Endpoints.UsersMessage, params);
}

export const appApi = new AppApi(config);

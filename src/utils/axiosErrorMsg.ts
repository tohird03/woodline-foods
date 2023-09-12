import {AxiosError} from 'axios';

export const makeErrMsg = (error: AxiosError<any>): string => {
  if (!error.response?.data) {
    return error.message;
  }

  const {error: responseError} = error.response.data;

  if (!responseError) {
    return error.message;
  }

  return responseError?.errMsg;
};

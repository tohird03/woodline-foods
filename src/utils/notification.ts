import {toast} from 'react-toastify';
import {AxiosError} from 'axios';
import {makeErrMsg} from './axiosErrorMsg';

export const addAxiosErrorNotification = (message: AxiosError<any>) => {
  toast.error(makeErrMsg(message));
};

export const successNotification = (message: string) => {
  toast.success(message);
};

export const errorNotification = (message: string) => {
  toast.error(message);
};

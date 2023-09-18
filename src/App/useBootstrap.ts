import {useEffect, useState} from 'react';
import {useLocalStorage} from 'usehooks-ts';
import {ILoginResponse} from '../api/auth/types';
import {useStores} from '../store/store-context';

export const useBootstrap = () => {
  const {authStore} = useStores();
  const [isInitiated, setIsInitiated] = useState(true);
  const [accessToken] = useLocalStorage<string>('accessToken', '');
  const [staff] = useLocalStorage<ILoginResponse | null>('staff', null);

  const setToken = () => {
    if (accessToken && staff) {
      authStore.setIsAuth(true);
      authStore.setToken(accessToken);
      authStore.setStaffInfo(staff);
    }
  };

  const getAppConfigs = async () => {
    try {
      await setToken();

      setIsInitiated(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAppConfigs();
  }, []);

  return [isInitiated];
};

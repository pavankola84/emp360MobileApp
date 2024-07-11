import AsyncStorage from '@react-native-async-storage/async-storage';
import {useCallback, useEffect, useState} from 'react';

const useAsyncStorage = (
  key: string,
  dep?: any
): [string | null, (a: string) => string, () => void] => {
  const [storageItem, setStorageItem] = useState<null | string>(null);

  const getStorageItem = useCallback(async () => {
    const data: any = await AsyncStorage.getItem(key);
    setStorageItem(data);
  }, [key]);

  function updateStorageItem(data: string) {
    if (typeof data === 'string') {
      AsyncStorage.setItem(key, data);
      setStorageItem(data);
    }
    return data;
  }

  function clearStorageItem() {
    AsyncStorage.removeItem(key);
    setStorageItem(null);
  }

  useEffect(() => {
    getStorageItem();
  }, [getStorageItem, dep]);

  return [storageItem, updateStorageItem, clearStorageItem];
};

export default useAsyncStorage;

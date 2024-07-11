import {createContext, useContext} from 'react';

export const AppSettingsContext = createContext({
  theme: '1',
  setTheme: (_v: string) => {},
});
export const useAppSettingsContext = () => {
  return useContext(AppSettingsContext);
};

import {ReactNativeKeycloakProvider} from '@react-keycloak/native';
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState, useMemo} from 'react';
import {
  Dimensions,
  SafeAreaView,
  StatusBar,
  useColorScheme,
} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import {Provider as PaperProvider} from 'react-native-paper';
import {AppSettingsContext} from './src/context/appSettings';
import useAsyncStorage from './src/Hooks/useAsyncStorage';
import MainStack from './src/Navigation/MainStack';
import keycloak from './src/util/constants';
import {theme, theme2, theme3} from './src/util/theme';
import {QueryClient, QueryClientProvider} from 'react-query';
import {
  getRefreshToken,
  removeRefreshToken,
  storeRefreshToken,
} from './src/util/api/auth';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import ToastManager from 'toastify-react-native';
import {dip} from './src/util/function';
import Toast from 'react-native-toast-message';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    const init = async () => {};

    init().finally(async () => {
      await RNBootSplash.hide();
    });
  }, []);

  const backgroundStyle = {
    backgroundColor: isDarkMode
      ? theme.colors.background
      : theme.colors.background,
    flex: 1,
  };

  const [contextTheme, setContextTheme] = useState('');

  const AppContextObject = {
    theme: contextTheme,
    setTheme: setContextTheme,
  };

  const [storageItem] = useAsyncStorage('theme', contextTheme);
  const [loggedIn, setLoggedIn] = useState(false);

  var mainTheme = useMemo(() => {
    switch (storageItem) {
      case 'Green':
        return theme;
      case 'Blue':
        return theme2;
      case 'Red':
        return theme3;
      default:
        return theme2;
    }
  }, [storageItem]);

  const wd = Dimensions.get('window').width;

  return (
    <>
      <AppSettingsContext.Provider value={AppContextObject}>
        <Toast ref={ref => Toast.setRef(ref)} />
        <PaperProvider theme={mainTheme}>
          <SafeAreaView style={backgroundStyle}>
            <ReactNativeKeycloakProvider
              autoRefreshToken={true}
              authClient={keycloak}
              onEvent={async (event, error) => {
                await keycloak.updateToken(5);
                if (event === 'onReady') {
                  try {
                    const refreshToken = await getRefreshToken();
                    if (refreshToken) {
                      keycloak.refreshToken = refreshToken;
                      const refreshed = await keycloak.updateToken();
                      if (refreshed) {
                        storeRefreshToken(keycloak?.refreshToken || '');
                        setLoggedIn(true);
                      }
                    }
                  } catch (err) {
                  } finally {
                  }
                } else if (event === 'onAuthSuccess') {
                  storeRefreshToken(keycloak?.refreshToken || '');
                  setLoggedIn(true);
                } else if (event === 'onAuthError') {
                  setLoggedIn(false);
                } else if (event === 'onTokenExpired') {
                  const refreshed = await keycloak.updateToken();
                  if (refreshed) {
                    storeRefreshToken(keycloak?.refreshToken || '');
                  }
                } else if (event === 'onAuthLogout') {
                  setLoggedIn(false);
                  removeRefreshToken();
                }
              }}
              onTokens={tokens => {}}
              initOptions={{
                redirectUri: 'techsophy://Homepage',
                postLogoutRedirectUri: 'techsophy://Homepage',
                inAppBrowserOptions: {},
              }}>
              <QueryClientProvider client={new QueryClient()}>
                <SafeAreaProvider>
                  <ToastManager
                    width={wd * 0.9}
                    height={dip(100)}
                    textStyle={{margin: 10}}
                  />
                  <NavigationContainer onReady={() => RNBootSplash.hide()}>
                    <MainStack />
                  </NavigationContainer>
                </SafeAreaProvider>
              </QueryClientProvider>
            </ReactNativeKeycloakProvider>
          </SafeAreaView>
        </PaperProvider>
      </AppSettingsContext.Provider>
    </>
  );
};

export default App;

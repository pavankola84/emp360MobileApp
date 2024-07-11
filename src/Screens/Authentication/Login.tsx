import {Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Emp360Logo, LoginMainImage, LogoLogin} from '../../util/icons';
import {dip} from '../../util/function';
import {
  LoginHead,
  LoginSub,
  SignUpButton,
  noAccount,
  signIn,
} from '../../util/strings';
import Fonts from '../../util/Fonts';
import TextBox from '../../Components/TextBox';
import PrimaryButton from '../../Components/PrimaryButton';
import Alert from '../../Components/Alert';
import AsyncStorage from '@react-native-async-storage/async-storage';
import KeycloakReactNativeClient from '@react-keycloak/native/lib/typescript/src/keycloak/client';
import useOnlyKeycloak from '../../Hooks/useOnlyKeycloak';
import {useKeycloak} from '@react-keycloak/native';
import axios from 'axios';
import {Toast} from 'toastify-react-native';

interface Props {
  navigation: any;
}

const keycloakLogin = (
  keycloak: boolean | undefined | KeycloakReactNativeClient,
  type: string,
) => {
  return new Promise<boolean>((resolve, reject) => {
    if (keycloak === undefined || keycloak === true || keycloak === false) {
      reject('Not Initialized');
      return;
    }
    keycloak
      .login({idpHint: type})
      .then(() => {
        resolve(true);
      })
      .catch(error => {
        resolve(false);
      });
  });
};

const Login: React.FC<Props> = ({navigation}) => {
  const [username, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [alertError, setError] = useState('');

  const {keycloak} = useKeycloak();

  const loginComplete = () => {
    Toast.success('Login Success');

    navigation.navigate('MyTabs');
  };

  useEffect(() => {
    checkLogedIn();
  }, []);

  const checkLogedIn = async () => {
    const token = await AsyncStorage.getItem('refreshedToken');

    if (token) {
      keycloak.refreshToken = token;

      keycloak
        .updateToken()
        .then(refreshed => {
          if (refreshed) {
            AsyncStorage.setItem(
              'refreshedToken',
              keycloak?.refreshToken ?? '',
            );
            loginComplete();
          }
        })
        .catch(error => {
          AsyncStorage.clear();
          keycloakButton();
        });
    } else {
      keycloakButton();
    }
  };

  const keycloakButton = useCallback(() => {
    // if (!username) {
    //   setError('Username is required');
    //   return;
    // } else if (!password) {
    //   setError('Password is required');
    //   return;
    // }

    // loginComplete();
    // return;
    keycloakLogin(keycloak, 'office 365').then(async result => {
      if (result) {
        loginComplete();

        AsyncStorage.setItem('token', keycloak?.token ?? '');
        AsyncStorage.setItem('refreshedToken', keycloak?.refreshToken ?? '');
      } else {
        setError('Login failed! Please try again after sometime');
      }
    });
  }, [keycloak, loginComplete]);

  const handleLoginRefresh = () => {
    keycloak
      .updateToken()
      .then(refreshed => {
        if (refreshed) {
          loginComplete();
        } else {
          setError('Login failed');

          keycloak?.logout();
        }
      })
      .catch(error => {});
  };

  return (
    <View style={styles.container}>
      <Alert
        title={alertError}
        onPressButton={() => {
          setError('');
        }}
        setVisible={() => {
          setError('');
        }}
        visible={alertError.length > 0}
      />
      <StatusBar backgroundColor={'#162952'} barStyle={'light-content'} />
      <View style={{flex: 1, backgroundColor: '#ffffff'}}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{color: '#162952', fontSize: dip(30), fontWeight: '900'}}>
            EMP 360
          </Text>
        </View>
        <View
          style={{
            flex: 4,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Emp360Logo height={dip(200)} width={dip(200)} />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={styles.head}>poweredBy</Text>
          <Image source={require('../../../assets/img/poweredBy.png')} />
        </View>

        <View
          style={{
            flex: 1.5,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              flex: 2,
              justifyContent: 'center',
              width: '80%',
            }}>
            <PrimaryButton
              text={signIn}
              onPress={() => {
                keycloakButton();
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  head: {
    fontSize: dip(25),
    fontWeight: '100',
    fontFamily: Fonts.RobotoRegular,
    color: '#162952',
  },
  sub: {
    fontSize: dip(16),
    fontWeight: '200',
    fontFamily: Fonts.RobotoRegular,
    color: '#333333',
  },
  main: {
    color: '#4A4A4B',
    fontFamily: Fonts.RobotoMedium,
    fontSize: dip(16),
    fontWeight: '400',
  },
  signUp: {
    color: '#00458A',
    fontFamily: Fonts.RobotoBold,
    fontSize: dip(16),
    fontWeight: '600',
  },
});

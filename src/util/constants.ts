export const DATE_FORMAT = 'DD/MM/YYYY';
export const TIME_FORMAT = 'HH:mm:SS';

import {RNKeycloak} from '@react-keycloak/native';

const LOCAL = false;
const DEV = true;

// const REACT_APP_KEYCLOAK_URL_REMOTE =
//   'https://keycloak-tsplatform.techsophy.com';
const REACT_APP_KEYCLOAK_URL_REMOTE = 'https://auth-dev.techsophy.com';
const REACT_APP_KEYCLOAK_URL_LOCAL = 'http://192.168.1.69:8080';
export const API_GATEWAT_URL = 'https://api-dev.techsophy.com/api';
export const DMS_ENDPOINT =
  '/dms/v1/documents?documentTypeId=1220301893074898944';
export const REACT_APP_KEYCLOAK_URL = LOCAL
  ? REACT_APP_KEYCLOAK_URL_LOCAL
  : REACT_APP_KEYCLOAK_URL_REMOTE;
// export const REACT_APP_KEYCLOAK_REALM = 'ts-ui-components';
// export const REACT_APP_KEYCLOAK_REALM = 'techsophy-platform';
export const REACT_APP_KEYCLOAK_REALM = 'techsophy';

export const REACT_APP_KEYCLOAK_CLIENT_ID = 'tp-ui-core';
export const FORGOT_PASSWORD = `${REACT_APP_KEYCLOAK_URL}/realms/${REACT_APP_KEYCLOAK_REALM}/login-actions/reset-credentials?client_id=${REACT_APP_KEYCLOAK_CLIENT_ID}`;

const keycloak = new RNKeycloak({
  url: `${REACT_APP_KEYCLOAK_URL}/auth`,
  realm: REACT_APP_KEYCLOAK_REALM,
  clientId: REACT_APP_KEYCLOAK_CLIENT_ID,
});

export default keycloak;

export const STRIPE_KEYS = {
  publishable_key: 'pk_test_C23mx7I5sszh',
  secret_key: 'sk_test_secretekey',
};

export const SXP = {
  // pid: '621ca957d3f3cc052418505f', //default
  pid: '64e826d8c08623ede97f8181', // dengue
  // pid: '6426878668a9b1ad24a4d72f', // kims
  url: 'https://sxp.channel-adapter.k8s.techsophy.com/',
  // url: 'https://sxp.channel-adapter.kims.in/',
  path: '/socket.io/',
  appId: 'working',
  version: 'WORKING',
};

export const SXPCommands = {
  restart: '::restart',
  start: 'sample',
};

export const StorageKeys = {
  AccessToken: 'AccessToken',
  RefreshToken: 'RefreshToken',
  IdToken: 'IdToken',
  UserEmail: 'UserEmail',
  UserPassword: 'UserPassword',
  SaveLogin: 'SaveLogin',
  FaceLock: 'FaceLock',
  KeyCloakObject: 'KeyCloakObject',
  Country: 'CountryToggle',
  SocketUser: 'SocketUser',
};

export const EMP_LEAVES_FORM_ID = '1062244463782965248';
export const EMP_MY_LEAVES_FORM_ID = '1068415584538505216';

export const EMP_SUMMARY_FORM_ID = '1063352788801073152';
export const EMP_HOBBIES_FORM_ID = '1063353853156044800';
export const EMP_PROFILE_FORM_ID = '1058380750487334912';
export const EMP_PERSONAL_PROFILE_FORM_ID = '1052917923916066816';

export const REACT_APP_API_GATEWAY_URL = 'https://api-dev.techsophy.com/api';

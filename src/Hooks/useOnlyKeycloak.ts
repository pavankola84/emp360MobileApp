import {useKeycloak} from '@react-keycloak/native';

const useOnlyKeycloak = () => {
  const [keycloak, initialized, ready] = useKeycloak();
  if (!initialized || typeof keycloak === 'boolean' || keycloak === undefined) {
    return {keycloak: undefined, profile: undefined, initialized, ready};
  } else {
    return {
      keycloak: keycloak,
      profile: keycloak.idTokenParsed as any,
      initialized,
      ready,
    };
  }
};

export default useOnlyKeycloak;

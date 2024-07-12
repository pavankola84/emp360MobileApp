import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {WFHHead, CompOffHead} from '../../util/strings';
import useOnlyKeycloak from '../../Hooks/useOnlyKeycloak';
import Loader from '../../Components/Loader';
import ScreenHeader from '../../Components/ScreenHeader';
import useTheme from '../../Hooks/useTheme';

interface Props {
  navigation: any;
}

const CompOffRequest: React.FC<Props> = ({navigation}) => {
  const theme = useTheme();
  const {keycloak, profile}: any = useOnlyKeycloak();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <View style={[styles.container, {height: theme.buttonHeight}]}>
      <StatusBar backgroundColor={'#162952'} barStyle={'light-content'} />
      <Loader isLoading={isLoading} />
      <ScreenHeader navigation={navigation} text={WFHHead} />
      <Text>Comp Off Request</Text>
    </View>
  );
};

export default CompOffRequest;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

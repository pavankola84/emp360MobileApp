import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import useTheme from '../../Hooks/useTheme';
import useOnlyKeycloak from '../../Hooks/useOnlyKeycloak';
import {useFocusEffect} from '@react-navigation/native';
import Loader from '../../Components/Loader';
import ScreenHeader from '../../Components/ScreenHeader';
import {
  HolidaysListHead,
  SummaryHead,
  VisitorsListHead,
} from '../../util/strings';

const VisitorsList = ({navigation}) => {
  const theme = useTheme();
  const {keycloak, profile} = useOnlyKeycloak();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      return () => {};
    }, []),
  );

  return (
    <View style={{flex: 1, height: theme.buttonHeight}}>
      <Loader isLoading={isLoading} />
      <ScreenHeader navigation={navigation} text={VisitorsListHead} />
      <ScrollView style={styles.container}>
        <Text>Visitors List</Text>
      </ScrollView>
    </View>
  );
};

export default VisitorsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
});

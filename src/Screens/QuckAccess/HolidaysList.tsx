import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import useTheme from '../../Hooks/useTheme';
import useOnlyKeycloak from '../../Hooks/useOnlyKeycloak';
import {useFocusEffect} from '@react-navigation/native';
import Loader from '../../Components/Loader';
import ScreenHeader from '../../Components/ScreenHeader';
import {HolidaysListHead, SummaryHead} from '../../util/strings';

const HolidaysList = ({navigation}) => {
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
      <ScreenHeader navigation={navigation} text={HolidaysListHead} />
      <ScrollView style={styles.container}>
        <Text>Holidays List</Text>
      </ScrollView>
    </View>
  );
};

export default HolidaysList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
});

import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import useTheme from '../../Hooks/useTheme';
import useOnlyKeycloak from '../../Hooks/useOnlyKeycloak';
import {useFocusEffect} from '@react-navigation/native';
import Loader from '../../Components/Loader';
import ScreenHeader from '../../Components/ScreenHeader';
import {HolidaysListHead} from '../../util/strings';
import {theme} from '../../util/theme';
import {ApiResponse, fetchDataWithoutEmail} from '../../util/api/employee';
import {EMP_HOLIDAYS_FORM_ID} from '../../util/constants';

const HolidaysList = ({navigation}) => {
  const theme = useTheme();
  const {keycloak, profile} = useOnlyKeycloak();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [holidaysList, setHolidaysList] = useState('');

  const currentYear = new Date().getFullYear().toString();
  const holidays = holidaysList[currentYear];

  const upcomingHolidays = holidays?.filter(
    holiday => new Date(holiday.Date) >= new Date(),
  );

  const formatDate = dateString => {
    const options = {day: '2-digit', month: 'short', year: 'numeric'};
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getHolidaysList = async () => {
    setIsLoading(true);

    try {
      const response: ApiResponse<any> = await fetchDataWithoutEmail(
        keycloak?.token,
        EMP_HOLIDAYS_FORM_ID,
      );
      if (response.success) {
        const data = response.data;
        setIsLoading(false);
        setHolidaysList(data?.content[0]?.formData?.holidayList);
      } else {
        setIsLoading(false);
        console.error('Failed to fetch Holidays List:', response.message);
      }
    } catch (error: any) {
      setIsLoading(false);
      console.error('Error fetching Holidays List:', error.message);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getHolidaysList();
      return () => {};
    }, []),
  );

  const renderItem = ({item}) => (
    <View
      style={[
        styles.card,
        {flexDirection: 'row', justifyContent: 'space-between', height: 120},
      ]}>
      <View style={{margin: 16}}>
        <Text style={styles.title}>{item.Purpose}</Text>
        <Text>S.No: {item.Sl_No}</Text>
        <Text>Date: {formatDate(item.Date)}</Text>
        <Text>Day: {item.Day}</Text>
      </View>
      <View>
        <Image source={{uri: item.imageUrl}} style={styles.imageHoliday} />
      </View>
    </View>
  );

  const renderUpcomingHoliday = () => {
    if (upcomingHolidays?.length > 0) {
      const upcomingHoliday = upcomingHolidays[0];
      return (
        <View style={[styles.card, styles.upcomingCard]}>
          <Text style={styles.upcomingTitle}>Next Holiday</Text>
          <Image
            source={{uri: upcomingHoliday?.imageUrl}}
            style={styles.image}
          />
          <Text style={[styles.title, {marginLeft: 16}]}>
            {upcomingHoliday?.Purpose}
          </Text>
          <Text style={{marginLeft: 16}}>
            Date: {formatDate(upcomingHoliday.Date)}
          </Text>
          <Text style={{marginLeft: 16}}>Day: {upcomingHoliday?.Day}</Text>
        </View>
      );
    }
    return null;
  };

  return (
    <View style={{flex: 1, height: theme.buttonHeight}}>
      <Loader isLoading={isLoading} />
      <ScreenHeader navigation={navigation} text={HolidaysListHead} />
      <ScrollView style={[styles.container, {paddingBottom: 50}]}>
        {renderUpcomingHoliday()}
        <Text style={styles.heading}>
          Holidays List for the year ${currentYear}
        </Text>
        <FlatList
          data={holidays}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      </ScrollView>
    </View>
  );
};

export default HolidaysList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 32,
    backgroundColor: '#ffffff',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    // padding: 10,
    margin: 8,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  upcomingCard: {
    // borderColor: 'gray',
    backgroundColor: theme.colors.surface,
    // borderWidth: 2,
    marginTop: 16,
    paddingVertical: 8,
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 10,
  },
  imageHoliday: {
    width: 120,
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000',
    opacity: 0.75,
  },
  upcomingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    opacity: 0.75,
    marginBottom: 5,
    marginLeft: 16,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    opacity: 0.75,
    marginHorizontal: 16,
    marginVertical: 8,
  },
});

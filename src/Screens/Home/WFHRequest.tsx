import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {WFHHead, CompOffHead} from '../../util/strings';
import useOnlyKeycloak from '../../Hooks/useOnlyKeycloak';
import Loader from '../../Components/Loader';
import ScreenHeader from '../../Components/ScreenHeader';
import useTheme from '../../Hooks/useTheme';
import DateTimePicker from '@react-native-community/datetimepicker';
import Header from '../../Components/Header';

interface Props {
  navigation: any;
}

const WFHRequest: React.FC<Props> = ({navigation}) => {
  const theme = useTheme();
  const {keycloak, profile}: any = useOnlyKeycloak();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [fromOpen, setFromOpen] = useState<boolean>(false);
  const [toOpen, setToOpen] = useState<boolean>(false);
  const [fromDate, setFromDate] = useState<Date>(new Date());
  const [toDate, setToDate] = useState<Date>(new Date());
  const [toDateFormatted, setToDateFormatted] = useState<string>('');
  const [fromDateFormatted, setFromDateFormatted] = useState<string>('');

  const handleFromDate = (event: any, selectedDate: any) => {
    setFromDate(selectedDate);
    setFromOpen(false);
    let date = handleFormatDate(selectedDate);
    setFromDateFormatted(date);
  };

  const handleToDate = (event: any, selectedDate: any) => {
    setToDate(selectedDate);
    setToOpen(false);
    let date = handleFormatDate(selectedDate);
    setToDateFormatted(date);
  };

  const handleFormatDate = (selectedDate: Date): string => {
    let date = new Date(selectedDate);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let formattedDay = day < 10 ? '0' + day : day;
    let formattedMonth = month < 10 ? '0' + month : month;

    let formattedDate = year + '-' + formattedMonth + '-' + formattedDay;

    return formattedDate;
  };

  const onBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={[styles.container, {height: theme.buttonHeight}]}>
      <StatusBar backgroundColor={'#162952'} barStyle={'light-content'} />
      <Loader isLoading={isLoading} />
      {/* <RBSheet
        ref={refRBSheet}
        useNativeDriver={true}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
          container: {
            height: dip(300),
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
          },
        }}
        customModalProps={{
          animationType: 'slide',
          statusBarTranslucent: true,
        }}
        customAvoidingViewProps={{
          enabled: false,
        }}>
        <View
          style={{
            flex: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 20,
              alignItems: 'center',
            }}>
            <Image
              source={isLeaveApplied ? SuccessImage : FailImage}
              style={{
                width: wp(50) - theme.paddingHorizontal * 2,
                height: wp(50) - theme.paddingHorizontal * 2,
              }}
            />
            <Text
              style={{
                fontSize: dip(17),
                color: '#000000',
                paddingHorizontal: dip(10),
              }}>
              {apiMessage}
            </Text>
          </View>
        </View>
      </RBSheet> */}
      {fromOpen && (
        <DateTimePicker
          testID="dateTimePicker"
          value={fromDate}
          mode={'date'}
          is24Hour={true}
          onChange={handleFromDate}
        />
      )}

      {toOpen && (
        <DateTimePicker
          testID="dateTimePicker"
          value={toDate}
          mode={'date'}
          is24Hour={true}
          onChange={handleToDate}
        />
      )}
      {/* <ScreenHeader navigation={navigation} text={WFHHead} /> */}
      <View style={{height: theme.buttonHeight + 4}}>
        <Header name={WFHHead} back={false} onBackPress={onBackPress} />
      </View>

      <Text>WFH Request</Text>
    </View>
  );
};

export default WFHRequest;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

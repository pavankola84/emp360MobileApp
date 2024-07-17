import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import {WFHHead, CompOffHead} from '../../util/strings';
import useOnlyKeycloak from '../../Hooks/useOnlyKeycloak';
import Loader from '../../Components/Loader';
import ScreenHeader from '../../Components/ScreenHeader';
import useTheme from '../../Hooks/useTheme';
import DateTimePicker from '@react-native-community/datetimepicker';
import Header from '../../Components/Header';
import {dip} from '../../util/function';
import ApplyTextComponent from '../../Components/ApplyTextComponent';
import {
  ApiResponse,
  applyLeaveCompOffEMP,
  applyLeaveEMP,
  fetchLeavesData,
  fetchRuntimeFormData,
  fetchUsers,
} from '../../util/api/employee';
import {useFocusEffect} from '@react-navigation/native';
import ApplyLeaveTextComponent from '../../Components/ApplyLeaveTextComponent';
import ApplyLeaveDropdown from '../../Components/ApplyLeaveDropdown';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {MultiSelect} from 'react-native-element-dropdown';
import {ChevronDown} from '../../util/icons';
import TextInput from '../../Components/TextInput';
import PrimaryButton from '../../Components/PrimaryButton';
import SuccessImage from '../../../assets/img/Success.png';
import FailImage from '../../../assets/img/Fail.png';
import RBSheet from 'react-native-raw-bottom-sheet';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Toast} from 'toastify-react-native';
import {HOLIDAYS_FORMID} from '../../util/endpoints';

interface Props {
  navigation: any;
}

const CompOffRequest: React.FC<Props> = ({navigation}) => {
  const theme = useTheme();
  const {keycloak, profile}: any = useOnlyKeycloak();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [fromOpen, setFromOpen] = useState<boolean>(false);
  const [toOpen, setToOpen] = useState<boolean>(false);
  const [fromDate, setFromDate] = useState<Date>(new Date());
  const [toDate, setToDate] = useState<Date>(new Date());
  const [toDateFormatted, setToDateFormatted] = useState<string>('');
  const [fromDateFormatted, setFromDateFormatted] = useState<string>('');
  const [leaveDetails, setLeaveDetails] = useState<any>({});
  const [selectedLeaveCategory, setSelectedLeaveCategory] =
    useState<string>('');
  const [partialLeaveType, setPartialLeaveType] = useState<string>('');
  const [selectedleaveType, setSelectedLeaveType] = useState<string>('compOff');
  const [emails, setEmails] = useState<Array<any>>([]);
  const [selectedEmail, setSelectedEmail] = useState<Array<any>>([]);
  const [reason, setReason] = useState<string>('');
  const [isLeaveApplied, setIsLeaveApplied] = useState<boolean>(false);
  const [apiMessage, setApiMessage] = useState<any>('');
  const [holidays, setHolidays] = useState<any>({});
  const [allHolidays, setAllHolidays] = useState<any>([]);
  const today = new Date();

  const refRBSheet = useRef<any>();

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

  const getLeaveCounts = async () => {
    try {
      const response: ApiResponse<any> = await fetchLeavesData(
        profile.email,
        keycloak?.token,
      );
      if (response.success) {
        const data = response.data;
        setLeaveDetails(data?.content[0]?.formData);

        setIsLoading(false);
      } else {
        setIsLoading(false);
        console.error('Failed to fetch leave counts:', response.message);
      }
    } catch (error: any) {
      setIsLoading(false);
      console.error('Error fetching leave counts:', error.message);
    }
  };

  const getUsers = async () => {
    try {
      const response: ApiResponse<any> = await fetchUsers(keycloak?.token);
      if (response.success) {
        const formattedEmails = response?.data?.map((item: any) => {
          return {
            label: item?.userData?.emailId,
            value: item?.userData?.emailId,
          };
        });
        setIsLoading(false);
        setEmails(formattedEmails);
      } else {
        setIsLoading(false);
        console.error('Failed to fetch Users:', response.message);
      }
    } catch (error: any) {
      setIsLoading(false);
      console.error('Error fetching Users:', error.message);
    }
  };

  const handleGetHolidaysList = async () => {
    const currentYear = new Date().getFullYear();

    try {
      const response = await fetchRuntimeFormData(
        HOLIDAYS_FORMID,
        keycloak?.token,
      );

      if (response?.success) {
        let mapData =
          response?.data?.content[0]?.formData?.holidayList[currentYear];

        if (mapData) {
          const promises = mapData.map(async (item: any) => {
            const date = item?.Date;
            const holidayName = item?.Purpose;

            return {date: date, holidayName: holidayName};
          });

          const holidayListArray = await Promise.all(promises);
          const holidaysArray = holidayListArray.map((item: any) => item.date);

          setHolidays(holidaysArray);
          setAllHolidays(holidayListArray);
          setIsLoading(false);
        }
      }
    } catch (error) {
      console.error('Error fetching holiday data:', error);
      setIsLoading(false);
    }
  };
  const getBusinessDaysCount = (
    startDate: Date,
    endDate: Date,
    holidays: Array<string>,
  ): number => {
    var startMs = startDate.getTime();
    var endMs = endDate.getTime();

    var msInDay = 1000 * 60 * 60 * 24;

    var businessDays = 0;

    for (var i = startMs; i <= endMs; i += msInDay) {
      var currentDate = new Date(i);

      if (
        currentDate.getDay() !== 0 &&
        currentDate.getDay() !== 6 &&
        !isHoliday(currentDate, holidays)
      ) {
        businessDays++;
      }
    }

    return businessDays;
  };

  const isHoliday = (date: Date, holidays: Array<string>): boolean => {
    if (!holidays || !Array.isArray(holidays)) {
      return false;
    }

    const dateStr = date.toISOString().split('T')[0];
    return holidays.includes(dateStr);
  };

  const decideLop = (leaveType: string, totalLeaveDays: number): boolean => {
    return leaveDetails?.leaveDetails?.workFromHome < totalLeaveDays
      ? true
      : false;
  };

  const getLopDays = (leaveType: string, totalLeaveDays: number): number => {
    if (leaveType === 'compOff') {
      return leaveDetails?.leaveDetails?.general < totalLeaveDays
        ? totalLeaveDays - leaveDetails?.leaveDetails?.general
        : 0;
    } else {
      return leaveDetails?.leaveDetails?.privilege < totalLeaveDays
        ? totalLeaveDays - leaveDetails?.leaveDetails?.privilege
        : 0;
    }
  };

  const handleApplyLeave = async () => {
    setIsLoading(true);
    const payload = {
      fromDate: fromDateFormatted,
      toDate: toDateFormatted,
      leaveType: selectedleaveType,
      // informTo: selectedEmail,
      // requestTo: [leaveDetails?.reportingTo],
      // leaveCategory:
      //   selectedLeaveCategory === 'Full Day' ? 'fullDay' : 'partialDay',
      // lop: decideLop(
      //   selectedleaveType,
      //   getBusinessDaysCount(
      //     new Date(fromDateFormatted),
      //     new Date(toDateFormatted),
      //     holidays,
      //   ),
      // ),
      // lopDays: getLopDays(
      //   selectedleaveType,
      //   getBusinessDaysCount(
      //     new Date(fromDateFormatted),
      //     new Date(toDateFormatted),
      //     holidays,
      //   ),
      // ),
      employeeId: [leaveDetails?.employeeId],
      reason: reason,
      // leaveDays:
      leaveCount:
        selectedLeaveCategory === 'Partial Day'
          ? 0.5
          : getBusinessDaysCount(
              new Date(fromDateFormatted),
              new Date(toDateFormatted),
              holidays,
            ),
      // timeRange:
      //   partialLeaveType === 'First Half(10AM - 2PM )'
      //     ? 'firstHalf'
      //     : partialLeaveType === 'Second Half(2PM - 6PM)'
      //     ? 'secondHalf'
      //     : '',
    };
    console.log(payload);
    const response: ApiResponse<any> = await applyLeaveCompOffEMP(
      payload,
      keycloak?.token,
    );

    if (response.success) {
      setIsLeaveApplied(response.success);
      setApiMessage(response?.message);
      Toast.success(response?.message ?? '');

      refRBSheet.current.open();
      setIsLoading(false);
      setFromDateFormatted('');
      setToDateFormatted('');
      setSelectedLeaveType('');
      setSelectedLeaveCategory('');
      setSelectedEmail([]);
    } else {
      setIsLeaveApplied(response.success);
      setApiMessage(response?.message);
      refRBSheet.current.open();
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      getLeaveCounts();
      getUsers();
      handleGetHolidaysList();
      return () => {};
    }, []),
  );

  const renderItem = (item: any) => {
    return (
      <View style={styles.item}>
        <Text style={styles.selectedTextStyle}>{item.label}</Text>
      </View>
    );
  };

  return (
    <View style={[styles.container, {height: theme.buttonHeight}]}>
      <StatusBar backgroundColor={'#162952'} barStyle={'light-content'} />
      <Loader isLoading={isLoading} />
      <RBSheet
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
      </RBSheet>
      {fromOpen && (
        <DateTimePicker
          testID="dateTimePicker"
          value={fromDate}
          mode={'date'}
          is24Hour={true}
          maximumDate={today}
          onChange={handleFromDate}
        />
      )}

      {toOpen && (
        <DateTimePicker
          testID="dateTimePicker"
          value={toDate}
          mode={'date'}
          is24Hour={true}
          maximumDate={today}
          onChange={handleToDate}
        />
      )}
      <View style={{height: theme.buttonHeight + 4}}>
        <ScreenHeader navigation={navigation} text={CompOffHead} />
      </View>

      <View style={{flex: 11}}>
        <ScrollView
          style={{paddingHorizontal: 20}}
          contentContainerStyle={{paddingVertical: 10}}
          showsVerticalScrollIndicator={false}>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{flex: 1, marginRight: dip(10), marginVertical: dip(10)}}>
              <ApplyTextComponent
                name={`Available Comp Off Leaves`}
                //   value={leaveDetails?.leaveDetails?.general}
                value="1"
              />
            </View>
            <View
              style={{flex: 1, marginLeft: dip(10), marginVertical: dip(10)}}>
              <ApplyTextComponent
                name={'Emp ID'}
                value={leaveDetails?.employeeId}
              />
            </View>
          </View>
          {/* <ApplyLeaveTextComponent
            name={'Reporting Manager'}
            value={leaveDetails?.reportingTo}
          /> */}
          {/* <ApplyLeaveDropdown
            data={['Full Day', 'Partial Day']}
            onSelect={(item: any, index: any) => setSelectedLeaveCategory(item)}
            name={'Leave Category'}
            placeholder={'Please select Leave Category'}
          /> */}

          {selectedLeaveCategory === 'Partial Day' && (
            <ApplyLeaveDropdown
              data={['First Half(10AM - 2PM )', 'Second Half(2PM - 6PM)']}
              onSelect={(selectedItem: any, index: any) => {
                setPartialLeaveType(selectedItem);
              }}
              name={'Leave Category'}
              placeholder={'Please Select Time Range'}
            />
          )}

          <GestureHandlerRootView style={{flex: 1}}>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  flex: 1,
                  // height: dip(60),
                  justifyContent: 'space-evenly',
                  borderWidth: 1,
                  borderRadius: 10,
                  marginTop: dip(10),
                  marginRight: dip(10),
                  paddingHorizontal: dip(10),
                  borderColor: '#a4cbfc',
                  backgroundColor: '#f5f9ff',
                }}>
                <View style={{flex: 2}}>
                  <TouchableOpacity
                    onPress={() => setFromOpen(true)}
                    style={{
                      flex: 2,
                      width: '100%',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        padding: 10,
                        borderRadius: 10,
                        fontSize: dip(20),
                        color: '#000000',
                      }}>
                      {fromDateFormatted ? fromDateFormatted : 'From date'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  // height: dip(60),
                  justifyContent: 'space-evenly',
                  borderWidth: 1,
                  borderRadius: 10,
                  marginTop: dip(10),
                  paddingHorizontal: dip(10),
                  borderColor: '#a4cbfc',
                  backgroundColor: '#f5f9ff',
                }}>
                <View style={{flex: 2}}>
                  <TouchableOpacity
                    onPress={() => setToOpen(true)}
                    style={{
                      flex: 2,
                      width: '100%',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        padding: 8,
                        borderRadius: 10,
                        fontSize: dip(20),
                        color: '#000000',
                      }}>
                      {toDateFormatted ? toDateFormatted : 'To date'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            {/* <View
              style={{
                flex: 1,
                justifyContent: 'space-evenly',
                borderWidth: 1,
                borderRadius: 10,
                marginVertical: dip(10),
                padding: dip(10),
                borderColor: '#a4cbfc',
                backgroundColor: '#f5f9ff',
              }}>
              <View style={{flex: 2}}>
                <MultiSelect
                  selectedStyle={{
                    backgroundColor: 'green',
                  }}
                  renderRightIcon={() => (
                    <ChevronDown
                      height={dip(15)}
                      width={dip(20)}
                      color={'#000000'}
                    />
                  )}
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={emails}
                  dropdownPosition={'top'}
                  labelField="label"
                  valueField="value"
                  placeholder="Please select carbon copy "
                  value={selectedEmail}
                  search
                  searchPlaceholder="Search..."
                  onChange={item => {
                    setSelectedEmail(item);
                  }}
                  renderItem={renderItem}
                  renderSelectedItem={(item, unSelect) => (
                    <TouchableOpacity
                      onPress={() => unSelect && unSelect(item)}>
                      <View style={styles.selectedStyle}>
                        <Text style={styles.textSelectedStyle}>
                          {item.label}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </View> */}
          </GestureHandlerRootView>

          <View
            style={{
              flex: 1,
              height: dip(140),
              justifyContent: 'space-evenly',
              borderWidth: 1,
              borderRadius: 10,
              marginVertical: dip(20),
              padding: dip(10),
              paddingHorizontal: dip(10),
              borderColor: '#a4cbfc',
              backgroundColor: '#f5f9ff',
            }}>
            <View style={{flex: 3}}>
              <TextInput
                multiline={true}
                placeholderTextColor={'#666666'}
                placeholder="Please enter Reason for Leave"
                style={{
                  flex: 1,
                  color: '#000000',
                  textAlignVertical: 'top',
                  borderRadius: dip(10),
                  borderWidth: 0,
                  margin: -8,
                  fontSize: dip(16),
                }}
                onChangeText={text => setReason(text)}
              />
            </View>
          </View>
          <View
            style={{
              flex: 1,
              height: dip(70),
              alignItems: 'center',
            }}>
            <PrimaryButton onPress={() => handleApplyLeave()} text={'Submit'} />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default CompOffRequest;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  selectedEmailContainer: {
    marginTop: 20,
  },
  selectedEmailText: {
    fontSize: 18,
  },
  dropdown: {
    height: 50,
    backgroundColor: '#E9ECEF',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  placeholderStyle: {
    fontSize: dip(18),
    color: '#000000',
  },
  selectedTextStyle: {
    fontSize: 14,
    color: '#000000',
  },
  iconStyle: {
    width: dip(15),
    height: dip(15),
  },
  inputSearchStyle: {
    height: 40,
    fontSize: dip(18),
    color: '#000000',
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedStyle: {
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    backgroundColor: '#162952',
    shadowColor: '#000',
    marginTop: 8,
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  textSelectedStyle: {
    marginRight: 5,
    fontSize: dip(14),
    color: '#fff',
  },
});

import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  FlatList,
  Pressable,
  Alert,
} from 'react-native';
import Header from '../../Components/Header';
import {theme} from '../../util/theme';
import DateTimePicker from '@react-native-community/datetimepicker';
import SelectDropdown from 'react-native-select-dropdown';
import PrimaryButton from '../../Components/PrimaryButton';
import {dip} from '../../util/function';
import Fonts from '../../util/Fonts';
import ApplyLeaveTextComponent from '../../Components/ApplyLeaveTextComponent';
import ApplyLeaveDropdown from '../../Components/ApplyLeaveDropdown';
import ApplyTextComponent from '../../Components/ApplyTextComponent';
import {MultiSelect, Dropdown} from 'react-native-element-dropdown';
import {ChevronDown, Cross} from '../../util/icons';
import useOnlyKeycloak from '../../Hooks/useOnlyKeycloak';
import RBSheet from 'react-native-raw-bottom-sheet';
import {
  ApiResponse,
  applyLeaveEMP,
  fetchLeavesData,
  fetchRuntimeFormData,
  fetchUsers,
} from '../../util/api/employee';
import {HOLIDAYS_FORMID} from '../../util/endpoints';
import {useFocusEffect} from '@react-navigation/native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import SuccessImage from '../../../assets/img/Success.png';
import FailImage from '../../../assets/img/Fail.png';
import ToastManager, {Toast} from 'toastify-react-native';
import Loader from '../../Components/Loader';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const wd: number = Dimensions.get('window').width;

interface ApplyVisitorProps {
  navigation: any;
  route: any;
}

interface Errors {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  host?: string;
  photoUri?: string;
}

const ApplyVisitor: FC<ApplyVisitorProps> = ({navigation, route}) => {
  const {keycloak, profile}: any = useOnlyKeycloak();
  const [fromDate, setFromDate] = useState<Date>(new Date());
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const refRBSheet = useRef<any>();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [host, setHost] = useState('');
  const [hostName, setHostName] = useState('');
  const [hostEmail, setHostEmail] = useState('');
  const [reason, setReason] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [showPicker, setShowPicker] = useState(false);
  const [search, setSearch] = useState('');
  const [photoUri, setPhotoUri] = useState('');
  const [emails, setEmails] = useState<Array<any>>([]);
  const [selectedEmail, setSelectedEmail] = useState<Array<any>>([]);

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

  const handleSubmit = async () => {
    const newErrors: Errors = {};
    if (!firstName) {
      newErrors.firstName = 'First Name is required.';
    }
    if (/[^a-zA-Z]/.test(firstName)) {
      newErrors.firstName = 'First Name must not contain special characters';
    }
    if (!lastName) {
      newErrors.lastName = 'Last Name is required.';
    }
    if (/[^a-zA-Z]/.test(lastName)) {
      newErrors.lastName = 'Last Name must not contain special characters';
    }
    if (
      !phoneNumber ||
      phoneNumber.length !== 10 ||
      !/^\d{10}$/.test(phoneNumber)
    ) {
      newErrors.phoneNumber = 'Phone Number is required and must be 10 digits';
    }
    if (!host) {
      newErrors.host = 'Host is required';
    }
    if (!photoUri) {
      newErrors.photoUri = 'Visitor Image is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log('Visitor Pass Submitted:', {
      firstName,
      lastName,
      phoneNumber,
      email,
      host,
      reason,
      photoUri,
    });

    setFirstName('');
    setLastName('');
    setPhoneNumber('');
    setEmail('');
    setHost('');
    setHostName('');
    setReason('');
    setPhotoUri('');
  };

  const openCamera = () => {
    const options: any = {
      mediaType: 'photo',
      quality: 1,
    };

    launchCamera(options, response => {
      if (response.assets && response.assets[0]) {
        setPhotoUri(response.assets[0].uri);
      } else {
        Alert.alert('Error', 'Failed to capture photo.');
      }
    });
  };

  const onBackPress = () => {
    navigation.goBack();
  };

  const renderItem = (item: any) => {
    return (
      <View style={styles.item}>
        <Text style={styles.selectedTextStyle}>{item.label}</Text>
      </View>
    );
  };

  const clearHost = () => {
    setHost('');
    setHostName('');
  };

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      getUsers();
      return () => {};
    }, []),
  );

  useEffect(() => {
    if (typeof host.label === 'string') {
      let username = host.label.split('@')[0];

      let name = username
        .split('.')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      setHostName(name);
    } else {
      console.log('Invalid host format or host is undefined.');
    }
  }, [host]);

  return (
    <View style={styles.container}>
      <Loader isLoading={isLoading} />
      <View style={{flex: 1}}>
        <Header name={'Visitor Pass'} back={false} onBackPress={onBackPress} />
      </View>
      <View style={{flex: 11, paddingHorizontal: theme.paddingHorizontal / 2}}>
        <ScrollView
          contentContainerStyle={{paddingVertical: 10}}
          showsVerticalScrollIndicator={false}>
          <Text style={styles.heading}>Visitor Details</Text>
          {errors.firstName && (
            <Text style={styles.error}>{errors.firstName}</Text>
          )}
          <View style={[styles.fieldContainer]}>
            <TextInput
              placeholderTextColor={'#666666'}
              placeholder=" Visitor's First Name"
              value={firstName}
              onChangeText={setFirstName}
              style={styles.inputField}
            />
          </View>
          {errors.lastName && (
            <Text style={styles.error}>{errors.lastName}</Text>
          )}
          <View style={[styles.fieldContainer]}>
            <TextInput
              placeholderTextColor={'#666666'}
              placeholder="Visitor's Last Name"
              value={lastName}
              onChangeText={setLastName}
              style={styles.inputField}
            />
          </View>

          {errors.phoneNumber && (
            <Text style={styles.error}>{errors.phoneNumber}</Text>
          )}
          <View style={[styles.fieldContainer]}>
            <TextInput
              placeholderTextColor={'#666666'}
              placeholder="Visitor's Phone Number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
              style={styles.inputField}
            />
          </View>
          <View style={[styles.fieldContainer]}>
            <TextInput
              placeholderTextColor={'#666666'}
              placeholder="Visitor's Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              style={styles.inputField}
            />
          </View>
          <Text style={styles.heading}>Host Details</Text>
          {errors.host && <Text style={styles.error}>{errors.host}</Text>}
          <View
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
              <Dropdown
                selectedStyle={{
                  backgroundColor: 'green',
                }}
                renderRightIcon={() =>
                  host ? (
                    <Cross
                      height={dip(15)}
                      width={dip(20)}
                      color={'#000000'}
                      onPress={clearHost}
                    />
                  ) : (
                    <ChevronDown
                      height={dip(15)}
                      width={dip(20)}
                      color={'#000000'}
                    />
                  )
                }
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={emails}
                dropdownPosition={'top'}
                labelField="label"
                valueField="value"
                placeholder="Please select Host "
                value={host}
                search
                searchPlaceholder="Search..."
                onChange={item => {
                  setHost(item);
                }}
                renderItem={renderItem}
                // renderSelectedItem={item => (
                //   <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
                //     <View style={styles.selectedStyle}>
                //       <Text style={styles.textSelectedStyle}>{item.label}</Text>
                //     </View>
                //   </TouchableOpacity>
                // )}
              />
            </View>
          </View>

          <View style={[styles.fieldContainer]}>
            <TextInput
              placeholderTextColor={'#666666'}
              placeholder="Host Name"
              value={hostName}
              editable={false}
              style={styles.inputField}
            />
          </View>

          <View style={[styles.fieldContainer]}>
            <TextInput
              placeholderTextColor={'#666666'}
              placeholder="Host Email"
              value={host.label}
              editable={false}
              keyboardType="email-address"
              style={styles.inputField}
            />
          </View>
          <View
            style={[
              styles.fieldContainer,
              {
                flex: 1,
                height: dip(140),
              },
            ]}>
            <View style={{flex: 3}}>
              <TextInput
                multiline={true}
                placeholderTextColor={'#666666'}
                placeholder="Please enter Reason for Leave"
                style={[
                  styles.inputField,
                  {
                    textAlignVertical: 'top',
                  },
                ]}
                value={reason}
                onChangeText={text => setReason(text)}
              />
            </View>
          </View>
          {errors.photoUri && (
            <Text style={styles.error}>{errors.photoUri}</Text>
          )}
          {photoUri ? (
            <View style={styles.photoPreviewContainer}>
              <Image source={{uri: photoUri}} style={styles.photoPreview} />
            </View>
          ) : null}
          <View
            style={{
              flex: 1,
              height: dip(70),
              alignItems: 'center',
            }}>
            <PrimaryButton
              onPress={() => openCamera()}
              text={"Add Visitor's Photo"}
              style={{marginVertical: 10, backgroundColor: 'rgb(241, 88, 48)'}}
            />
          </View>

          <View
            style={{
              flex: 1,
              height: dip(70),
              alignItems: 'center',
            }}>
            <PrimaryButton
              onPress={() => handleSubmit()}
              text={'Submit'}
              style={{marginVertical: 4}}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default ApplyVisitor;

const styles = StyleSheet.create({
  //   container: {
  //     flex: 1,
  //     backgroundColor: '#ffffff',
  //   },
  fieldContainer: {
    justifyContent: 'space-evenly',
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: dip(10),
    padding: dip(4),
    paddingHorizontal: dip(10),
    borderColor: '#a4cbfc',
    backgroundColor: '#f5f9ff',
  },
  inputField: {
    flex: 1,
    color: '#000000',
    borderRadius: dip(10),
    fontSize: dip(16),
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
    backgroundColor: 'white',
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
    color: '#000000',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    // padding: 16,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    // alignItems: 'center',
  },
  heading: {
    fontSize: 16,
    fontWeight: '500',
    color: '#162952',
    // marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 12,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  pickerText: {
    color: '#333',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: 'rgb(241, 88, 48)',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
  },
  photoButton: {
    backgroundColor: '#162952',
  },
  photoPreviewContainer: {
    width: 130,
    height: 130,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ddd',
    alignSelf: 'center',
  },
  photoPreview: {
    width: 120,
    height: 120,
    borderRadius: 4,
    backgroundColor: '#ddd',
  },
  modalItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  closeButton: {
    marginTop: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'rgb(241, 88, 48)',
  },
  error: {
    color: 'red',
    marginBottom: 4,
  },
});

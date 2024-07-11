import React, {useCallback, useEffect, useState} from 'react';
import useTheme from '../../Hooks/useTheme';
import useOnlyKeycloak from '../../Hooks/useOnlyKeycloak';
import ScreenHeader from '../../Components/ScreenHeader';
import {ProfileSettingsHead, SaveButton} from '../../util/strings';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  Button,
  ScrollView,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ProfilePic from '../../../assets/img/Vignesh.jpeg';
import BlankProfilePic from '../../../assets/img/blank-profile.png';
import PenPNG from '../../../assets/img/pen.png';
import {EditIcon} from '../../util/icons';
import LinkedinLogo from '../../../assets/img/linkedin.png';
import PrimaryButton from '../../Components/PrimaryButton';
import {useFocusEffect} from '@react-navigation/native';
import {
  ApiResponse,
  fetchDataUsingFormId,
  fetchProfilePicture,
  postSummaryHobbiesData,
} from '../../util/api/employee';
import {
  EMP_PROFILE_FORM_ID,
  EMP_SUMMARY_FORM_ID,
  EMP_PERSONAL_PROFILE_FORM_ID,
} from '../../util/constants';

const formatDate = inputDate => {
  const date = new Date(inputDate);

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;

  return formattedDate;
};

const PersonalDetails = ({navigation}) => {
  const theme = useTheme();
  const {keycloak, profile} = useOnlyKeycloak();

  const [profilePic, setProfilePic] = useState(ProfilePic);
  const [linkedin, setLinkedin] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [summary, setSummary] = useState('');
  const [summaryId, setSummaryId] = useState('');
  const [details, setDetails] = useState([]);
  const [personalDetails, setPersonalDetails] = useState([]);
  const formattedDOJ = formatDate(details.dateOfJoining);
  const formattedDOB = formatDate(details.dob);
  const phoneNo = `${details.phone?.substring(0, 2)}-${details.phone?.substring(
    2,
  )}`;
  const emergencyPhoneNo = `${personalDetails.emergencyDetails?.emergencyDetails1?.phone?.substring(
    0,
    2,
  )}-${personalDetails.emergencyDetails?.emergencyDetails1?.phone?.substring(
    2,
  )}`;

  const getProfileDetails = async () => {
    try {
      const response: ApiResponse<any> = await fetchDataUsingFormId(
        profile.email,
        keycloak?.token,
        EMP_PROFILE_FORM_ID,
      );
      if (response.success) {
        const data = response.data;
        setIsLoading(false);
        setDetails(data?.content[0]?.formData);
      } else {
        setIsLoading(false);
        console.error('Failed to fetch Profile Details:', response.message);
      }
    } catch (error: any) {
      setIsLoading(false);
      console.error('Error fetching Profile Details:', error.message);
    }
  };

  const getPersonalProfileDetails = async () => {
    try {
      const response: ApiResponse<any> = await fetchDataUsingFormId(
        profile.email,
        keycloak?.token,
        EMP_PERSONAL_PROFILE_FORM_ID,
      );
      if (response.success) {
        const data = response.data;
        setIsLoading(false);
        setPersonalDetails(data?.content[0]?.formData);
      } else {
        setIsLoading(false);
        console.error('Failed to fetch Profile Details:', response.message);
      }
    } catch (error: any) {
      setIsLoading(false);
      console.error('Error fetching Profile Details:', error.message);
    }
  };

  const getLinkedin = async () => {
    try {
      const response: ApiResponse<any> = await fetchDataUsingFormId(
        profile.email,
        keycloak?.token,
        EMP_SUMMARY_FORM_ID,
      );
      if (response.success) {
        const data = response.data;
        setIsLoading(false);
        setLinkedin(data?.content[0]?.formData?.linkedinUrl);
        setSummary(data?.content[0]?.formData?.summary);
        setSummaryId(data?.content[0]?.id);
      } else {
        setIsLoading(false);
        console.error('Failed to fetch Linkedin URL:', response.message);
      }
    } catch (error: any) {
      setIsLoading(false);
      console.error('Error fetching Linkedin URL:', error.message);
    }
  };

  const getProfilePicture = async () => {
    try {
      const response: ApiResponse<any> = await fetchProfilePicture(
        keycloak?.token,
      );
      if (response.success) {
        const data = response.data;
        setIsLoading(false);
        setProfilePic(data.profilePicture);
      } else {
        setIsLoading(false);
        console.error('Failed to fetch Linkedin URL:', response.message);
      }
    } catch (error: any) {
      setIsLoading(false);
      console.error('Error fetching Linkedin URL:', error.message);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      getLinkedin();
      getProfileDetails();
      getPersonalProfileDetails();
      getProfilePicture();
      return () => {};
    }, []),
  );

  // useEffect(() => {
  //   console.log('hello', profilePic);
  // }, [profilePic]);

  const uploadProfilePic = async (uri: any) => {
    console.log('fileUri', uri);
  };

  const handleProfilePicClick = () => {
    const options = {
      quality: 1,
    };

    Alert.alert(
      'Profile Picture',
      'Choose an option',
      [
        {
          text: 'Choose from Gallery',
          onPress: () => {
            launchImageLibrary(options, response => {
              if (response.didCancel) {
                console.log('User cancelled image picker');
              } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
              } else {
                const source = {uri: response.assets?.[0]?.uri};
                if (source) {
                  try {
                    setProfilePic(source);
                    uploadProfilePic(source);
                  } catch (error) {
                    console.error('Error converting image to Base64:', error);
                  }
                }
              }
            });
          },
        },
        {
          text: 'Capture Photo',
          onPress: () => {
            launchCamera({cameraType: 'back'}, response => {
              if (response.didCancel) {
                console.log('User cancelled image picker');
              } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
              } else {
                const source = {uri: response.assets?.[0]?.uri};
                if (source) {
                  try {
                    setProfilePic(source);
                    uploadProfilePic(source);
                  } catch (error) {
                    console.error('Error converting image to Base64:', error);
                  }
                }
              }
            });
          },
        },
        {text: 'Cancel', style: 'cancel'},
      ],
      {cancelable: true},
    );
  };

  const postLinkedin = async () => {
    setIsLoading(true);

    if (summaryId) {
      let payload = {
        formId: EMP_SUMMARY_FORM_ID,
        id: summaryId,
        formData: {
          summary: summary,
          officialEmail: profile.email,
          linkedinUrl: linkedin,
        },
      };
      try {
        const response: ApiResponse<any> = await postSummaryHobbiesData(
          payload,
          keycloak?.token,
        );

        if (response.success) {
          setIsLoading(false);
          console.log('Post Successful!', response);
        } else {
          setIsLoading(false);
          console.log('Post Unsuccessful!', response);
        }
      } catch (error) {
        setIsLoading(false);
        console.error('Error posting Summary:', error.message);
      }
    } else {
      let payload = {
        formId: EMP_SUMMARY_FORM_ID,
        formData: {
          summary: summary,
          officialEmail: profile.email,
          linkedinUrl: linkedin,
        },
      };
      try {
        const response: ApiResponse<any> = await postSummaryHobbiesData(
          payload,
          keycloak?.token,
        );
        if (response.success) {
          setIsLoading(false);
          console.log('Post Successful!', response);
        } else {
          setIsLoading(false);
          console.log('Post Unsuccessful!', response);
        }
      } catch (error) {
        setIsLoading(false);
        console.error('Error Posting Summary:', error.message);
      }
    }
  };

  const handleSave = () => {
    postLinkedin();

    // console.log(details);
  };

  return (
    <View
      style={[{flex: 1, height: theme.buttonHeight, backgroundColor: '#fff'}]}>
      <ScreenHeader navigation={navigation} text={ProfileSettingsHead} />
      <ScrollView style={{marginTop: 16}}>
        <TouchableOpacity
          onPress={handleProfilePicClick}
          style={styles.profilePicContainer}>
          {profilePic ? (
            <Image
              source={{uri: `data:image/jpeg;base64,${profilePic}`}}
              style={styles.profilePic}
            />
          ) : (
            <Image source={BlankProfilePic} style={styles.profilePic} />
          )}
          <View style={styles.editIconContainer}>
            <Image source={PenPNG} style={styles.editIcon} />
          </View>
        </TouchableOpacity>
        <Text style={[styles.centerText, styles.nameHeader]}>
          {details.firstName} {details.lastName}
        </Text>
        <Text style={[styles.designationHeader, styles.centerText]}>
          {details.designation}
        </Text>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.fieldTitleText}>Emp ID:</Text>
            <Text style={styles.fieldText}>{details.empId}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.fieldTitleText}>Email:</Text>
            <Text style={styles.fieldText}>{details.officialEmail}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.fieldTitleText}>Phone:</Text>
            <Text style={styles.fieldText}>+ {phoneNo}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.fieldTitleText}>Location:</Text>
            <Text style={styles.fieldText}>
              {personalDetails.currentAddress}
            </Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.fieldTitleText}>Date of Birth:</Text>
            <Text style={styles.fieldText}>{formattedDOB}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.fieldTitleText}>Marital Status:</Text>
            <Text style={styles.fieldText}>
              {personalDetails.family?.marriedStatus}
            </Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.fieldTitleText}>Blood Group:</Text>
            <Text style={styles.fieldText}>{details.bloodGroup}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.fieldTitleText}>Emergency No:</Text>
            <Text style={styles.fieldText}>+ {emergencyPhoneNo}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.fieldTitleText}>Reporting To:</Text>
            <Text style={styles.fieldText}>{details.reportingTo}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.fieldTitleText}>Department:</Text>
            <Text style={styles.fieldText}>{details.department}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.fieldTitleText}>Date of Joining:</Text>
            <Text style={styles.fieldText}>{formattedDOJ}</Text>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Image source={LinkedinLogo} style={styles.logo} />
          <TextInput
            style={styles.linkedinInput}
            value={linkedin}
            onChangeText={setLinkedin}
          />
          <Image source={PenPNG} style={[styles.icon, styles.editIcon]} />
        </View>
        <PrimaryButton
          onPress={() => handleSave()}
          text={'Save'}
          style={styles.saveButton}
        />
        {/* <Button title="Save" onPress={handleSave} /> */}
      </ScrollView>
    </View>
  );
};

export default PersonalDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },

  profilePicContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    resizeMode: 'cover',
  },
  editIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
    backgroundColor: '#ededed',
    position: 'absolute',
    top: 0,
    right: '36%',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#162952',
  },
  editIcon: {
    width: 18,
    height: 18,
    opacity: 0.5,
  },
  profilePicText: {
    fontSize: 18,
    color: '#aaa',
  },
  nameHeader: {
    color: '#f15830',
    fontSize: 22,
    marginBottom: 4,
  },
  designationHeader: {
    color: '#162952',
    textTransform: 'uppercase',
    fontSize: 16,
    marginBottom: 16,
  },
  centerText: {
    textAlign: 'center',
  },
  fieldTitleText: {
    color: '#9d9d9d',
    fontSize: 18,
  },
  fieldText: {
    color: '#162952',
    fontSize: 18,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  column: {
    flex: 1,
    paddingHorizontal: 8,
  },
  inputContainer: {
    width: '60%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginVertical: 16,
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  icon: {
    width: 30,
    height: 30,
    marginLeft: 10,
  },
  linkedinInput: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 8,
  },
  saveButton: {
    width: '50%',
    alignSelf: 'center',
    // backgroundColor: '#f15830',
  },
});

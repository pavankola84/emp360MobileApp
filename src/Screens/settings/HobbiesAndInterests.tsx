import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import useTheme from '../../Hooks/useTheme';
import useOnlyKeycloak from '../../Hooks/useOnlyKeycloak';
import ScreenHeader from '../../Components/ScreenHeader';
import {
  InterestsAndHobbiesHeader,
  ProfileSettingsHead,
} from '../../util/strings';
import PrimaryButton from '../../Components/PrimaryButton';
import {useFocusEffect} from '@react-navigation/native';
import {
  ApiResponse,
  fetchDataUsingFormId,
  postSummaryData,
  postSummaryHobbiesData,
} from '../../util/api/employee';
import {EMP_HOBBIES_FORM_ID} from '../../util/constants';
import {Toast} from 'toastify-react-native';

const InterestsAndHobbies = ({navigation}) => {
  const theme = useTheme();
  const {keycloak, profile} = useOnlyKeycloak();

  const [isEditable, setIsEditable] = useState(false);
  const [hobbies, setHobbies] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hobbiesId, setHobbiesId] = useState('');

  const handleEdit = () => {
    setIsEditable(true);
  };

  const getHobbies = async () => {
    try {
      const response: ApiResponse<any> = await fetchDataUsingFormId(
        profile.email,
        keycloak?.token,
        EMP_HOBBIES_FORM_ID,
      );
      if (response.success) {
        const data = response.data;
        setIsLoading(false);
        setHobbies(data?.content[0]?.formData?.interestNHobbies);
        setHobbiesId(data?.content[0]?.id);
      } else {
        setIsLoading(false);
        console.error('Failed to fetch Hobbies:', response.message);
      }
    } catch (error: any) {
      setIsLoading(false);
      console.error('Error fetching Hobbies:', error.message);
    }
  };

  const postHobbies = async () => {
    setIsLoading(true);

    if (hobbiesId) {
      let payload = {
        formId: EMP_HOBBIES_FORM_ID,
        id: hobbiesId,
        formData: {
          interestNHobbies: hobbies,
          officialEmail: profile.email,
        },
      };
      try {
        const response: ApiResponse<any> = await postSummaryHobbiesData(
          payload,
          keycloak?.token,
        );

        if (response.success) {
          setIsLoading(false);
          Toast.success('Interests & Hobbies updated successfully', 'top');
          console.log('Post Successful!', response);
        } else {
          setIsLoading(false);
          Toast.error('Interests & Hobbies update failed', 'top');
          console.log('Post Unsuccessful!', response);
        }
      } catch (error) {
        setIsLoading(false);
        console.error('Error posting Interests and Hobbies:', error.message);
      }
    } else {
      let payload = {
        formId: EMP_HOBBIES_FORM_ID,
        formData: {
          interestNHobbies: hobbies,
          officialEmail: profile.email,
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
        console.error('Error Posting Interests and Hobbies:', error.message);
      }
    }
  };

  const handleSave = () => {
    setIsEditable(false);
    postHobbies();
    console.log('Hobbies saved:', hobbies);
  };

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      getHobbies();
      return () => {};
    }, []),
  );
  return (
    <View style={{flex: 1, height: theme.buttonHeight}}>
      <ScreenHeader navigation={navigation} text={InterestsAndHobbiesHeader} />
      <ScrollView style={styles.container}>
        <Text style={styles.heading}>Interests and Hobbies</Text>
        <View style={styles.listContainer}>
          {isEditable ? (
            <TextInput
              style={styles.textInput}
              value={hobbies}
              onChangeText={setHobbies}
              multiline={true}
            />
          ) : (
            <Text style={styles.hobbiesText}>{hobbies}</Text>
          )}
        </View>
      </ScrollView>
      <View style={styles.saveButtonContainer}>
        <PrimaryButton
          onPress={isEditable ? handleSave : handleEdit}
          text={isEditable ? 'Save' : 'Edit'}
          style={isEditable ? styles.saveButton : styles.editButton}
        />
      </View>
    </View>
  );
};

export default InterestsAndHobbies;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  hobbiesText: {
    fontSize: 18,
    marginVertical: 4,
    alignSelf: 'center',
  },
  textInput: {
    fontSize: 18,
    marginVertical: 4,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
  },
  saveButton: {
    width: '50%',
    alignSelf: 'center',
    marginTop: 16,
    backgroundColor: '#f15830',
  },
  editButton: {
    width: '50%',
    alignSelf: 'center',
    marginTop: 16,
    // backgroundColor: '#f15830',
  },
  saveButtonContainer: {
    width: '100%',
    paddingHorizontal: 16,
    paddingBottom: 16,
    position: 'absolute',
    bottom: 0,
  },
});

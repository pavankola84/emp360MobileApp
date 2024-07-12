import {StyleSheet, Text, View, TextInput, ScrollView} from 'react-native';
import React, {useCallback, useState} from 'react';
import useTheme from '../../Hooks/useTheme';
import useOnlyKeycloak from '../../Hooks/useOnlyKeycloak';
import ScreenHeader from '../../Components/ScreenHeader';
import {ProfileSettingsHead, SummaryHead} from '../../util/strings';
import PrimaryButton from '../../Components/PrimaryButton';
import {useFocusEffect} from '@react-navigation/native';
import {EMP_SUMMARY_FORM_ID} from '../../util/constants';
import ToastManager, {Toast} from 'toastify-react-native';

import Loader from '../../Components/Loader';
import {
  ApiResponse,
  fetchDataUsingFormId,
  postSummaryHobbiesData,
} from '../../util/api/employee';

const Summary = ({navigation}) => {
  const theme = useTheme();
  const {keycloak, profile} = useOnlyKeycloak();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [isEditable, setIsEditable] = useState(false);
  const [summary, setSummary] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [summaryId, setSummaryId] = useState('');

  const handleEdit = () => {
    setIsEditable(true);
  };

  const handleSave = () => {
    setIsEditable(false);
    postSummary();
  };

  const postSummary = async () => {
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
          Toast.success('Summary updated successfully', 'top');
          console.log('Post Successful!', response);
        } else {
          setIsLoading(false);
          console.log('Post Unsuccessful!', response);
        }
      } catch (error) {
        setIsLoading(false);
        Toast.error('Summary update failed', 'top');
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

  const getSummary = async () => {
    try {
      const response: ApiResponse<any> = await fetchDataUsingFormId(
        profile.email,
        keycloak?.token,
        EMP_SUMMARY_FORM_ID,
      );
      if (response.success) {
        const data = response.data;
        setIsLoading(false);
        setSummary(data?.content[0]?.formData?.summary);
        setLinkedin(data?.content[0]?.formData?.linkedinUrl);
        setSummaryId(data?.content[0]?.id);
      } else {
        setIsLoading(false);
        console.error('Failed to fetch Summary:', response.message);
      }
    } catch (error: any) {
      setIsLoading(false);
      console.error('Error fetching Summary:', error.message);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      getSummary();
      return () => {};
    }, []),
  );

  return (
    <View style={{flex: 1, height: theme.buttonHeight}}>
      <Loader isLoading={isLoading} />

      <ScreenHeader navigation={navigation} text={SummaryHead} />
      <ScrollView style={styles.container}>
        <Text style={styles.heading}>Summary</Text>
        <View style={styles.listContainer}>
          {isEditable ? (
            <TextInput
              style={styles.textInput}
              value={summary}
              onChangeText={setSummary}
              numberOfLines={5}
              multiline={true}
            />
          ) : (
            <Text style={styles.hobbiesText}>{summary}</Text>
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

export default Summary;

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

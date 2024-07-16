import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import useTheme from '../../Hooks/useTheme';
import useOnlyKeycloak from '../../Hooks/useOnlyKeycloak';
import {useFocusEffect} from '@react-navigation/native';
import Loader from '../../Components/Loader';
import ScreenHeader from '../../Components/ScreenHeader';
import {
  CompOffRequestsHead,
  HolidaysListHead,
  SummaryHead,
  VisitorsListHead,
} from '../../util/strings';
import {
  EMP_COMP_OFF_REQUESTS_FORM_ID,
  EMP_PROFILE_FORM_ID,
} from '../../util/constants';
import {
  ApiResponse,
  fetchDataUsingEmployeeId,
  fetchDataUsingFormId,
} from '../../util/api/employee';

const CompOffRequests = ({navigation}) => {
  const theme = useTheme();
  const {keycloak, profile} = useOnlyKeycloak();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [details, setDetails] = useState([]);
  const [empId, setEmpId] = useState('');
  const [compOffRequests, setCompOffRequests] = useState([]);

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
        await setDetails(data?.content[0]?.formData);
        await setEmpId(data?.content[0]?.formData?.empId);
      } else {
        setIsLoading(false);
        console.error('Failed to fetch Profile Details:', response.message);
      }
    } catch (error: any) {
      setIsLoading(false);
      console.error('Error fetching Profile Details:', error.message);
    }
  };

  const getCompOffRequests = async () => {
    try {
      const response: ApiResponse<any> = await fetchDataUsingEmployeeId(
        empId,
        keycloak?.token,
        EMP_COMP_OFF_REQUESTS_FORM_ID,
      );
      if (response.success) {
        const data = response.data;
        setIsLoading(false);
        setCompOffRequests(data?.content);
      } else {
        setIsLoading(false);
        console.error('Failed to fetch Comp Off Requests:', response.message);
      }
    } catch (error: any) {
      setIsLoading(false);
      console.error('Error fetching Comp Off Requests:', error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getProfileDetails();
      await getCompOffRequests();
    };

    fetchData();
  }, [empId]);

  useEffect(() => {
    console.log('sss', compOffRequests);
  }, [compOffRequests]);

  return (
    <View style={{flex: 1, height: theme.buttonHeight}}>
      <Loader isLoading={isLoading} />
      <ScreenHeader navigation={navigation} text={CompOffRequestsHead} />
      <ScrollView style={styles.container}>
        <Text>Comp-Off Requests List</Text>
      </ScrollView>
    </View>
  );
};

export default CompOffRequests;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
});

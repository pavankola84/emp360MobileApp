import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import useTheme from '../../Hooks/useTheme';
import useOnlyKeycloak from '../../Hooks/useOnlyKeycloak';
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
  cancelLeaveEMP,
  fetchDataUsingEmployeeId,
  fetchDataUsingFormId,
} from '../../util/api/employee';
import Upcoming from '../../Components/Upcoming';
import Prompt from '../../Components/Prompt';
import {Toast} from 'toastify-react-native';

interface MyLeave {
  id: string;
  [key: string]: any;
}

const CompOffRequests = ({navigation}) => {
  const theme = useTheme();
  const {keycloak, profile} = useOnlyKeycloak();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [details, setDetails] = useState([]);
  const [empId, setEmpId] = useState('');
  const [compOffRequests, setCompOffRequests] = useState<MyLeave[]>([]);
  const [id, setId] = useState('');
  const [status, setStatus] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const getProfileDetails = async () => {
    setIsLoading(true);
    try {
      const response: ApiResponse<any> = await fetchDataUsingFormId(
        profile.email,
        keycloak?.token,
        EMP_PROFILE_FORM_ID,
      );
      if (response.success) {
        const data = response.data;
        setDetails(data?.content[0]?.formData);
        setEmpId(data?.content[0]?.formData?.empId);
      } else {
        console.error('Failed to fetch Profile Details:', response.message);
      }
    } catch (error: any) {
      console.error('Error fetching Profile Details:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getCompOffRequests = async (empId: string) => {
    setIsLoading(true);
    try {
      const response: ApiResponse<any> = await fetchDataUsingEmployeeId(
        empId,
        keycloak?.token,
        EMP_COMP_OFF_REQUESTS_FORM_ID,
      );
      if (response.success) {
        const data = response.data.content;
        const formattedData: MyLeave[] = data?.map((item: any) => ({
          id: item?.id,
          ...item?.formData,
        }));
        setIsLoading(false);
        setCompOffRequests(formattedData);
      } else {
        setIsLoading(false);
        setCompOffRequests([]);
        console.error('Failed to fetch Comp Off Requests:', response.message);
      }
    } catch (error: any) {
      setIsLoading(false);
      console.error('Error fetching Comp Off Requests:', error.message);
    }
  };

  const handleCancelLeave = async () => {
    setIsLoading(true);
    const response: any = await cancelLeaveEMP(keycloak?.token, id?.id);
    if (response?.success) {
      setRefresh(prevState => !prevState);
      getCompOffRequests(empId);
      setShowDialog(false);
      setStatus('');
      setIsLoading(false);
    } else {
      console.log('something went wrong');
      Toast.error('something went wrong,Please try again!', 'top');
      setShowDialog(false);
      setStatus('');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProfileDetails();
  }, []);

  useEffect(() => {
    if (empId) {
      getCompOffRequests(empId);
    }
  }, [empId]);

  return (
    <View style={{flex: 1, height: theme.buttonHeight}}>
      <Loader isLoading={isLoading} />
      <ScreenHeader navigation={navigation} text={CompOffRequestsHead} />
      <ScrollView style={styles.container}>
        <View style={{width: '100%'}}>
          <Upcoming
            id={id?.id}
            status={status}
            rejectLoading={status == 'reject' ? true : false}
            onPress={id => {
              setIsLoading(true);
              setStatus('reject');
              setShowDialog(true);
              setId(id);
            }}
            data={compOffRequests}
          />
        </View>
      </ScrollView>
      <Prompt
        title={'Are you sure you want to cancel your Leave Request?'}
        onPressNegative={() => {
          setShowDialog(false);
          setStatus('');
        }}
        onPressPositive={async () => {
          if (keycloak === undefined) {
            return;
          }
          setShowDialog(false);
          handleCancelLeave();
        }}
        negativetitle="No"
        positiveTitle={status == 'approve' ? 'Approve' : 'Yes'}
        visible={showDialog}
        setVisible={visible => {
          setShowDialog(visible);
        }}
      />
    </View>
  );
};

export default CompOffRequests;

const styles = StyleSheet.create({
  requestItem: {
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginVertical: 8,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 32,
    backgroundColor: '#fff',
  },
});

import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Header from '../../Components/Header';
import {theme} from '../../util/theme';
import {
  ApiResponse,
  fetchTeamComboffData,
  fetchTeamLeavesData,
  submitCombOffDecisionReject,
  submitDecisionReject,
} from '../../util/api/employee';
import useOnlyKeycloak from '../../Hooks/useOnlyKeycloak';
import TabButton from '../../Components/TabButton';
import {dip} from '../../util/function';
import Upcoming from '../../Components/Upcoming';
import Prompt from '../../Components/Prompt';
import Alert from '../../Components/Alert';
import ToastManager, {Toast} from 'toastify-react-native';
import Loader from '../../Components/Loader';

interface LeaveDetails {
  formData: any;
}

interface TeamLeavesProps {
  navigation: any;
}

const TeamLeaves: React.FC<TeamLeavesProps> = ({navigation}) => {
  const {keycloak, profile}: any = useOnlyKeycloak();
  const [leaveDetails, setLeaveDetails] = useState<LeaveDetails[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [WFH, setWFH] = useState<LeaveDetails[]>([]);
  const [leaves, setLeaves] = useState<LeaveDetails[]>([]);
  const [combOff, setCombOff] = useState<LeaveDetails[]>([]);
  const [title, setTitle] = useState<string>('');
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [id, setId] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onBackPress = () => {
    navigation.goBack();
  };

  useEffect(() => {
    getTeamLeaves();
    getTeamCombOffLeaves();
  }, []);

  const getTeamLeaves = async () => {
    setIsLoading(true);
    try {
      const response: ApiResponse<any> = await fetchTeamLeavesData(
        profile.email,
        keycloak?.token,
      );
      if (response.success) {
        const data = response.data;
        handleLeavesData(response.data);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        console.error('Failed to fetch leave counts:', response.message);
      }
    } catch (error) {
      setIsLoading(false);
      console.error('Error fetching leave counts:', error.message);
    }
  };

  const getTeamCombOffLeaves = async () => {
    try {
      const response: ApiResponse<any> = await fetchTeamComboffData(
        profile.email,
        keycloak?.token,
      );
      if (response.success) {
        const data = response.data;
        setCombOff(response.data);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        console.error('Failed to fetch leave counts:', response.message);
      }
    } catch (error) {
      setIsLoading(false);
      console.error('Error fetching leave counts:', error.message);
    }
  };

  const handleCancelLeave = async () => {
    setIsLoading(true);
    setShowDialog(false);
    const response: any = await submitDecisionReject(
      status,
      id?.id,
      keycloak?.token,
    );
    if (response?.success) {
      let message =
        status == 'approve'
          ? 'Leave request Approved'
          : 'Leave Request Rejected';
      setError(message);
      getTeamLeaves();
      setIsLoading(false);
      setStatus('');
    } else {
      setError('something went wrong');
      setIsLoading(false);
      console.log('something went wrong');
      setStatus('');
    }
  };

  const handleCombOffLeave = async () => {
    setIsLoading(true);
    setShowDialog(false);
    const response: any = await submitCombOffDecisionReject(
      status,
      id?.id,
      keycloak?.token,
    );
    if (response?.success) {
      let message =
        status == 'approve'
          ? 'Comb off Leave request Approved'
          : 'Comboff Leave Request Rejected';
      setError(message);
      getTeamCombOffLeaves();
      setIsLoading(false);
      setStatus('');
    } else {
      setError('something went wrong');
      setIsLoading(false);
      console.log('something went wrong');
      setStatus('');
    }
  };

  const handleLeavesData = async (leavesData: any) => {
    const {WFH, general} = leavesData.reduce(
      (acc: any, item: any) => {
        switch (item.formData.leaveType) {
          case 'WFH':
            acc.WFH.push(item);
            break;
          case 'privilege':
            acc.general.push(item);
            break;
          case 'general':
            acc.general.push(item);
            break;
          default:
            break;
        }
        return acc;
      },
      {WFH: [], general: []},
    );

    setWFH(WFH);
    setLeaves(general);
    setIsLoading(false);
  };

  return (
    <View style={{flex: 1, backgroundColor: '#ffffff'}}>
      {/* <Loader isLoading={isLoading} /> */}
      <View style={{flex: 1}}>
        <Header name={'Team Leaves'} back={false} onBackPress={onBackPress} />
      </View>

      <View
        style={{
          flex: 1.2,
          justifyContent: 'center',
          paddingHorizontal: theme.paddingHorizontal / 2,
        }}>
        <View
          style={{
            height: theme.buttonHeight,
            width: '100%',
            backgroundColor: '#eeeeee',
            borderRadius: dip(10),
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <View style={{flex: 1}}>
            <TabButton
              color={selectedIndex == 0 ? '#ffffff' : '#000000'}
              backgroundColor={selectedIndex == 0 ? '#f15832' : '#eeeeee'}
              onPress={() => setSelectedIndex(0)}
              text={'Leaves'}
            />
          </View>
          <View style={{flex: 1}}>
            <TabButton
              color={selectedIndex == 1 ? '#ffffff' : '#000000'}
              backgroundColor={selectedIndex == 1 ? '#f15832' : '#eeeeee'}
              onPress={() => setSelectedIndex(1)}
              text={'WFH'}
            />
          </View>

          <View style={{flex: 1}}>
            <TabButton
              color={selectedIndex == 2 ? '#ffffff' : '#000000'}
              backgroundColor={selectedIndex == 2 ? '#f15832' : '#eeeeee'}
              onPress={() => setSelectedIndex(2)}
              text={'Comboff'}
            />
          </View>
        </View>
      </View>
      <View style={{flex: 9.8, paddingHorizontal: theme.paddingHorizontal / 2}}>
        <View style={{width: '100%'}}>
          {selectedIndex == 0 ? (
            <>
              {leaves?.length > 0 ? (
                <Upcoming
                  id={id?.id}
                  approveLoading={status == 'approve' ? true : false}
                  rejectLoading={status == 'reject' ? true : false}
                  isLead={true}
                  onPress={id => {
                    setShowDialog(true);
                    setTitle('Are you sure you want to Reject Leave');
                    setId(id);
                    setStatus('reject');
                    setIsLoading(true);
                  }}
                  onPressApprove={id => {
                    setShowDialog(true);
                    setTitle('Are you sure you want to Approve Leave');
                    setId(id);
                    setStatus('approve');
                    setIsLoading(true);
                  }}
                  data={leaves}
                />
              ) : (
                <View
                  style={{
                    height: dip(100),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 20,
                      color: '#000000',
                      fontWeight: 'bold',
                    }}>
                    No Leave requests
                  </Text>
                </View>
              )}
            </>
          ) : selectedIndex == 1 ? (
            <>
              {WFH?.length > 0 ? (
                <Upcoming
                  id={id?.id}
                  approveLoading={status == 'approve' ? true : false}
                  rejectLoading={status == 'reject' ? true : false}
                  isLead={true}
                  onPress={id => {
                    setShowDialog(true);
                    setTitle('Are you sure you want to Reject Leave');
                    setId(id);
                    setStatus('reject');
                    setIsLoading(true);
                  }}
                  onPressApprove={id => {
                    setShowDialog(true);
                    setTitle('Are you sure you want to Approve Leave');
                    setId(id);
                    setStatus('approve');
                    setIsLoading(true);
                  }}
                  data={WFH}
                />
              ) : (
                <View
                  style={{
                    height: dip(100),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 20,
                      color: '#000000',
                      fontWeight: 'bold',
                    }}>
                    No WFH requests
                  </Text>
                </View>
              )}
            </>
          ) : (
            <>
              {combOff.length > 0 ? (
                <Upcoming
                  id={id?.id}
                  approveLoading={status == 'approve' ? true : false}
                  rejectLoading={status == 'reject' ? true : false}
                  isLead={true}
                  onPress={id => {
                    setShowDialog(true);
                    setTitle('Are you sure you want to Reject Leave');
                    setId(id);
                    setStatus('reject');
                    setIsLoading(true);
                  }}
                  onPressApprove={id => {
                    setShowDialog(true);
                    setTitle('Are you sure you want to Approve Leave');
                    setId(id);
                    setStatus('approve');
                    setIsLoading(true);
                  }}
                  data={combOff}
                />
              ) : (
                <View
                  style={{
                    height: dip(100),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 20,
                      color: '#000000',
                      fontWeight: 'bold',
                    }}>
                    No Comb-off requests
                  </Text>
                </View>
              )}
            </>
          )}
        </View>

        <Prompt
          title={title}
          onPressNegative={() => {
            setShowDialog(false);
            setStatus('');
          }}
          onPressPositive={async () => {
            if (keycloak === undefined) {
              return;
            }
            let leaveType = id?.formData?.leaveType;

            if (
              leaveType === 'WFH' ||
              leaveType === 'privilege' ||
              leaveType === 'general'
            ) {
              handleCancelLeave();
            } else {
              handleCombOffLeave();
            }
          }}
          positiveTitle={status == 'approve' ? 'Approve' : 'Reject'}
          visible={showDialog}
          setVisible={visible => {
            setShowDialog(visible);
          }}
        />
        <Alert
          title={error}
          onPressButton={() => {
            setError('');
          }}
          setVisible={() => {
            setError('');
          }}
          visible={error.length > 0}
        />
      </View>
    </View>
  );
};

export default TeamLeaves;

const styles = StyleSheet.create({});

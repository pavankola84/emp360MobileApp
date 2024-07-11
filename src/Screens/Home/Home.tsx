import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import HomeHeader from '../../Components/HomeHeader';
import {theme} from '../../util/theme';
import HorizontalListItem from '../../Components/HorizontalListItem';
import {dip} from '../../util/function';
import CardView from 'react-native-cardview';
import AvailableCard from '../../Components/AvailableCard';
import BlankButton from '../../Components/BlankButton';
import LeaveDataCard from '../../Components/LeaveDataCard';
import TabButton from '../../Components/TabButton';
import Upcoming from '../../Components/Upcoming';
import Past from '../../Components/Past';
import LeadComponent from '../../Components/LeadComponent';
import useOnlyKeycloak from '../../Hooks/useOnlyKeycloak';
import {useFocusEffect} from '@react-navigation/native';
import {
  ApiResponse,
  cancelLeaveEMP,
  fetchLeavesData,
  fetchMyLeaves,
} from '../../util/api/employee';
import ToastManager, {Toast} from 'toastify-react-native';
import {ActivityIndicator} from 'react-native-paper';
import Loader from '../../Components/Loader';
import Prompt from '../../Components/Prompt';

interface Props {
  navigation: any;
}

interface LeaveDetails {
  general: {
    accruedLeaveDetails: number;
    consumedLeaveDetails: number;
    leaveDetails: number;
  };
  privilege: {
    accruedLeaveDetails: number;
    consumedLeaveDetails: number;
    leaveDetails: number;
  };
  editedOn: {
    accruedLeaveDetails: string;
    consumedLeaveDetails: string;
    leaveDetails: string;
  };
  leaveTypesEdited: {
    accruedLeaveDetails: {type: string; count: number}[];
    consumedLeaveDetails: {type: string; count: number}[];
    leaveDetails: {type: string; count: number}[];
  };
  WFH: {
    consumedLeaveDetails: number;
    accruedLeaveDetails: number;
    leaveDetails: number;
  };
  compOff: {
    consumedLeaveDetails: number;
    accruedLeaveDetails: number;
    leaveDetails: number;
    expired: number;
  };
}

interface MyLeave {
  id: string;
  [key: string]: any;
}

const Home: React.FC<Props> = ({navigation}) => {
  const {keycloak, profile}: any = useOnlyKeycloak();
  const [openModal, setOpenModal] = useState(false);
  const [leaveType, setLeaveType] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLead, setIsLead] = useState(false);
  const [leaveDetails, setLeaveDetails] = useState<LeaveDetails | {}>({});
  const [refresh, setRefresh] = useState(false);

  const [myLeaves, setMyLeaves] = useState<MyLeave[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [upcommingLeaves, setupcommingLeaves] = useState<MyLeave[]>([]);
  const [pastLeaves, setpastLeaves] = useState<MyLeave[]>([]);
  const [id, setId] = useState('');
  const [status, setStatus] = useState('');
  const [showDialog, setShowDialog] = useState(false);

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
        Toast.error('Failed to fetch leave counts:' + response.message, 'top');
        console.error('Failed to fetch leave counts:', response.message);
        setIsLoading(false);
      }
    } catch (error: any) {
      Toast.error('Failed to fetch leave counts:' + error.message, 'top');
      console.error('Error fetching leave counts:', error.message);
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      getLeaveCounts();
      getMyLeaves();
      return () => {};
    }, []),
  );

  const getMyLeaves = async () => {
    try {
      const response: ApiResponse<any> = await fetchMyLeaves(
        profile.email,
        keycloak?.token,
      );
      if (response.success) {
        const data = response.data;
        const formattedData: MyLeave[] = data?.map(
          (item: any, index: number) => {
            return {
              id: item?.id,
              ...item?.formData,
            };
          },
        );
        handleLeavesData(formattedData);

        setMyLeaves(formattedData);
      } else {
        setMyLeaves([]);
        setIsLoading(false);
        Toast.error('Failed to fetch leave counts:' + response.message, 'top');

        console.error('Failed to fetch leave details:', response.message);
      }
    } catch (error) {
      setIsLoading(false);
      Toast.error('Failed to fetch leave counts:' + error?.message, 'top');
      console.error('Error fetching leave details:', error?.message);
    }
  };

  const handleLeavesData = async (leavesData: MyLeave[]) => {
    const currentDate = new Date();

    const {upcomingLeaves, pastLeaves} = leavesData.reduce(
      (acc, leave) => {
        const [month, day, year] = leave.fromDate.split('/');
        const dateObject = new Date(`${year}-${month}-${day}`);
        const leaveDate = new Date(dateObject);
        if (leaveDate >= currentDate) {
          acc.upcomingLeaves.push(leave);
        } else {
          acc.pastLeaves.push(leave);
        }
        return acc;
      },
      {upcomingLeaves: [], pastLeaves: []},
    );
    setupcommingLeaves(upcomingLeaves);
    setpastLeaves(pastLeaves);
    setIsLoading(false);
  };

  const handleCancelLeave = async () => {
    setIsLoading(true);
    const response: any = await cancelLeaveEMP(keycloak?.token, id?.id);
    if (response?.success) {
      setRefresh(prevState => !prevState);
      getMyLeaves();
      setShowDialog(false);
      setStatus('');
    } else {
      console.log('something went wronga');
      Toast.error('something went wrong,Please try again!', 'top');
      setShowDialog(false);
      setStatus('');
    }
  };

  const wd = Dimensions.get('window').width;

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#162952'} barStyle={'light-content'} />
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
        }}>
        <HomeHeader
          onProfileClick={() => navigation.navigate('MyProfile')}
          text={'Messaging'}
          navigation={undefined}
        />
      </View>
      <View
        style={{
          flex: 11,
          backgroundColor: '#ffffff',
          padding: theme.paddingHorizontal / 3,
        }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}>
            <View>
              <LeaveDataCard
                avaliable={leaveDetails?.leaveDetails?.general ?? 0}
                consumed={leaveDetails?.consumedLeaveDetails?.general ?? 0}
                name={'General Leaves'}
              />
            </View>
            <View>
              <LeaveDataCard
                avaliable={leaveDetails?.leaveDetails?.privilege ?? 0}
                consumed={leaveDetails?.consumedLeaveDetails?.privilege ?? 0}
                name={'Previlage Leaves'}
              />
            </View>
            <View
              style={{
                height: dip(100),
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: 40,
              }}>
              <View style={{height: dip(60)}}>
                <BlankButton
                  color={'#000000'}
                  onPress={() =>
                    navigation.navigate('ApplyLeave', {
                      leaveType: 1,
                    })
                  }
                  text={'Apply Leave'}
                />
              </View>
            </View>
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
                  color={selectedIndex === 0 ? '#ffffff' : '#000000'}
                  backgroundColor={selectedIndex === 0 ? '#f15832' : '#eeeeee'}
                  onPress={() => setSelectedIndex(0)}
                  text={'Upcoming'}
                />
              </View>
              <View style={{flex: 1}}>
                <TabButton
                  color={selectedIndex === 1 ? '#ffffff' : '#000000'}
                  backgroundColor={selectedIndex === 1 ? '#f15832' : '#eeeeee'}
                  onPress={() => setSelectedIndex(1)}
                  text={'Past'}
                />
              </View>
              {isLead ? (
                <View style={{flex: 1}}>
                  <TabButton
                    color={selectedIndex === 2 ? '#ffffff' : '#000000'}
                    backgroundColor={
                      selectedIndex === 2 ? '#f15832' : '#eeeeee'
                    }
                    onPress={() => setSelectedIndex(2)}
                    text={'Lead'}
                  />
                </View>
              ) : null}
            </View>
            <View style={{width: '100%'}}>
              {selectedIndex === 0 ? (
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
                    data={upcommingLeaves}
                  />
                </View>
              ) : selectedIndex === 1 ? (
                <Upcoming
                  id={id?.id}
                  rejectLoading={status == 'reject' ? true : false}
                  onPress={id => {
                    setStatus('reject');
                    setIsLoading(true);
                    setShowDialog(true);
                    setId(id);
                  }}
                  data={pastLeaves}
                />
              ) : (
                <LeadComponent />
              )}
            </View>
          </View>
        </ScrollView>
      </View>
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

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

import {ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
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

interface Props {
  navigation: any;
}

const Home: React.FC<Props> = ({navigation}) => {
  const {keycloak, profile}: any = useOnlyKeycloak();
  const [openModal, setOpenModal] = useState(false);
  const [leaveType, setLeaveType] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLead, setIsLead] = useState(false);
  const [leaveDetails, setLeaveDetails] = useState<any>({});
  const [refresh, setRefresh] = useState(false);

  const [myLeaves, setMyLeaves] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [upcommingLeaves, setupcommingLeaves] = useState([]);
  const [pastLeaves, setpastLeaves] = useState([]);

  const data = {
    general: {
      accruedLeaveDetails: 1,
      consumedLeaveDetails: 1,
      leaveDetails: 0,
    },
    privilege: {
      accruedLeaveDetails: 0,
      consumedLeaveDetails: 0,
      leaveDetails: 0,
    },
    editedOn: {
      accruedLeaveDetails: '4/1/2024',
      consumedLeaveDetails: '04/04/2024',
      leaveDetails: '04/04/2024',
    },
    leaveTypesEdited: {
      accruedLeaveDetails: [
        {
          type: 'general',
          count: 1,
        },
      ],
      consumedLeaveDetails: [
        {
          count: 1,
          type: 'general',
        },
      ],
      leaveDetails: [
        {
          count: 1,
          type: 'general',
        },
      ],
    },
    WFH: {
      consumedLeaveDetails: 0,
      accruedLeaveDetails: 0,
      leaveDetails: 0,
    },
    compOff: {
      consumedLeaveDetails: 0,
      accruedLeaveDetails: 0,
      leaveDetails: 0,
      expired: 0,
    },
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
      } else {
        console.error('Failed to fetch leave counts:', response.message);
      }
    } catch (error) {
      console.error('Error fetching leave counts:', error.message);
    }
  };

  useFocusEffect(
    useCallback(() => {
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
        const formattedData = data?.map((item: any, index) => {
          return {
            id: item?.id,
            ...item?.formData,
          };
        });
        handleLeavesData(formattedData);

        setMyLeaves(formattedData);
      } else {
        setMyLeaves([]);
        console.error('Failed to fetch leave details:', response.message);
      }
    } catch (error) {
      console.error('Error fetching leave details:', error.message);
    }
  };

  const handleLeavesData = async (leavesData: any) => {
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
  };

  const handleCancelLeave = async (id: string) => {
    setIsLoading(true);
    const response: any = await cancelLeaveEMP(keycloak?.token, id);
    if (response?.success) {
      setIsLoading(false);
      setRefresh(prevState => !prevState);
      getMyLeaves();
    } else {
      console.log('something went wrong');
    }
  };

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
                data={data?.general}
              />
            </View>
            <View>
              <LeaveDataCard
                avaliable={leaveDetails?.leaveDetails?.privilege ?? 0}
                consumed={leaveDetails?.consumedLeaveDetails?.privilege ?? 0}
                name={'Previlage Leaves'}
                data={data?.privilege}
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
                  color={selectedIndex == 0 ? '#ffffff' : '#000000'}
                  backgroundColor={selectedIndex == 0 ? '#3184fb' : '#eeeeee'}
                  onPress={() => setSelectedIndex(0)}
                  text={'Upcoming'}
                />
              </View>
              <View style={{flex: 1}}>
                <TabButton
                  color={selectedIndex == 1 ? '#ffffff' : '#000000'}
                  backgroundColor={selectedIndex == 1 ? '#3184fb' : '#eeeeee'}
                  onPress={() => setSelectedIndex(1)}
                  text={'Past'}
                />
              </View>
              {isLead ? (
                <View style={{flex: 1}}>
                  <TabButton
                    color={selectedIndex == 2 ? '#ffffff' : '#000000'}
                    backgroundColor={selectedIndex == 2 ? '#3184fb' : '#eeeeee'}
                    onPress={() => setSelectedIndex(2)}
                    text={'Lead'}
                  />
                </View>
              ) : null}
            </View>
            <View style={{width: '100%'}}>
              {selectedIndex == 0 ? (
                <View style={{width: '100%'}}>
                  <Upcoming
                    onPress={handleCancelLeave}
                    data={upcommingLeaves}
                  />
                </View>
              ) : selectedIndex == 1 ? (
                <Upcoming onPress={handleCancelLeave} data={pastLeaves} />
              ) : (
                <LeadComponent />
              )}
            </View>
            {/* <View>
              <LeaveDataCard name={'WFH'} data={data?.WFH} />
            </View>
            <View>
              <LeaveDataCard name={'Comb-off'} data={data?.compOff} />
            </View> */}
          </View>
        </ScrollView>
      </View>
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

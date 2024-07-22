import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  Platform,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import useTheme from '../../Hooks/useTheme';
import useOnlyKeycloak from '../../Hooks/useOnlyKeycloak';
import {useFocusEffect} from '@react-navigation/native';
import Loader from '../../Components/Loader';
import ScreenHeader from '../../Components/ScreenHeader';
import {
  HolidaysListHead,
  SummaryHead,
  VisitorsListHead,
} from '../../util/strings';
import BlankProfilePic from '../../../assets/img/blank-profile.png';
import TestImage from '../../../assets/img/Vignesh.jpeg';
import {Toast} from 'toastify-react-native';
import {theme} from '../../util/theme';

enum StatusConstants {
  Pending = 'Pending',
  Approved = 'Approved',
  CheckedIn = 'Checked In',
  CheckedOut = 'Checked Out',
}

const visitors = [
  {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice@example.com',
    visitorMobile: '6655334455',
    photoUrl:
      'https://plus.unsplash.com/premium_photo-1664203067979-47448934fd97?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    scheduleVisitTime: '2024-07-19T10:00:00Z',
    purpose: 'Meeting',
    status: StatusConstants.Pending,
    host: 'John Doe',
    checkin: '',
    checkout: '',
  },
  {
    id: 2,
    name: 'Bob Smith',
    email: 'bob@example.com',
    visitorMobile: '9988778899',
    photoUrl: '',
    scheduleVisitTime: '2024-07-19T11:30:00Z',
    purpose: 'Delivery',
    status: StatusConstants.Approved,
    host: 'Jane Brown',
    checkin: '',
    checkout: '',
  },
  {
    id: 3,
    name: 'Eve Taylor',
    email: 'eve@example.com',
    visitorMobile: '7766776677',
    photoUrl:
      'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    scheduleVisitTime: '2024-07-19T14:00:00Z',
    purpose: 'Interview',
    status: StatusConstants.CheckedOut,
    host: 'Michael Green',
    checkin: '',
    checkout: '',
  },
  {
    id: 4,
    name: 'Anil',
    email: 'anil@example.com',
    visitorMobile: '7766887766',
    photoUrl:
      'https://plus.unsplash.com/premium_photo-1661297414288-8ed17eb1b3f1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    scheduleVisitTime: '2024-07-19T14:00:00Z',
    purpose: 'Interview',
    status: StatusConstants.CheckedIn,
    host: 'Rachael Green',
    checkin: '',
    checkout: '',
  },
];

const VisitorCard = ({visitor, updateVisitorStatus}) => {
  const [checkInTime, setCheckInTime] = useState(visitor.checkin);
  const [checkOutTime, setCheckOutTime] = useState(visitor.checkout);
  const [status, setStatus] = useState(visitor.status);

  const handleCheckIn = () => {
    const currentTime = new Date().toISOString();
    Toast.success('Check In successful.');
    setCheckInTime(currentTime);
    setStatus(StatusConstants.CheckedIn);
    updateVisitorStatus(visitor.id, StatusConstants.CheckedIn, currentTime, '');
  };

  const handleCheckOut = () => {
    const currentTime = new Date().toISOString();
    Toast.success('Check Out successful.');
    setCheckOutTime(currentTime);
    setStatus(StatusConstants.CheckedOut);
    updateVisitorStatus(
      visitor.id,
      StatusConstants.CheckedOut,
      checkInTime,
      currentTime,
    );
  };

  const backgroundColor = {
    backgroundColor:
      visitor.status === StatusConstants.Approved
        ? 'green'
        : visitor.status === StatusConstants.Pending
        ? '#ebad02'
        : visitor.status === StatusConstants.CheckedIn
        ? '#0074b3'
        : 'gray',
  };

  const formatScheduleVisitTime = timeString => {
    const date = new Date(timeString);
    const formattedDate = date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
    const formattedTime = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
    return `${formattedDate} ${formattedTime}`;
  };

  return (
    <View style={styles.card}>
      <View style={styles.infoContainer}>
        <View>
          <Text style={[styles.name, styles.title]}>{visitor.name}</Text>
          <Text style={styles.details}>+91-{visitor.visitorMobile}</Text>
        </View>
        <Text style={styles.details}>Purpose: {visitor.purpose}</Text>
        <Text style={styles.details}>
          Scheduled At: {formatScheduleVisitTime(visitor.scheduleVisitTime)}
        </Text>
        <View style={{alignItems: 'center', flexDirection: 'row', gap: 4}}>
          <Text style={styles.details}>Status:</Text>
          <View
            style={[
              styles.button,
              {backgroundColor: backgroundColor.backgroundColor},
            ]}>
            <Text style={[styles.details, {color: '#fff'}]}>{status}</Text>
          </View>
        </View>
      </View>
      <View style={{alignItems: 'center'}}>
        <Image
          source={visitor.photoUrl ? {uri: visitor.photoUrl} : TestImage}
          style={styles.image}
        />
        {status !== StatusConstants.Pending && (
          <View
            style={[
              styles.buttonContainer,
              {
                marginLeft: 10,
              },
            ]}>
            {/* {status === StatusConstants.Approved && ( */}
            <TouchableOpacity
              style={[styles.button, checkInTime && styles.disabledButton]}
              onPress={handleCheckIn}
              disabled={!!checkInTime}>
              <Text style={styles.buttonText}>
                {checkInTime
                  ? new Date(checkInTime).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })
                  : 'Check In'}
              </Text>
            </TouchableOpacity>
            {/* )} */}
            {/* {status === StatusConstants.CheckedIn && ( */}
            {checkInTime ? (
              <TouchableOpacity
                style={[styles.button, checkOutTime && styles.disabledButton]}
                onPress={handleCheckOut}
                disabled={!!checkOutTime}>
                <Text style={styles.buttonText}>
                  {checkOutTime
                    ? new Date(checkOutTime).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                    : 'Check Out'}
                </Text>
              </TouchableOpacity>
            ) : null}
            {/* )} */}
          </View>
        )}
      </View>
    </View>
  );
};

const VisitorsList = ({navigation}) => {
  const theme = useTheme();
  const {keycloak, profile} = useOnlyKeycloak();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredVisitors, setFilteredVisitors] = useState(visitors);

  useFocusEffect(
    useCallback(() => {
      return () => {};
    }, []),
  );

  const handleSearch = query => {
    setSearchQuery(query);
    const filteredData = visitors.filter(
      visitor =>
        visitor.name.toLowerCase().includes(query.toLowerCase()) ||
        visitor.host.toLowerCase().includes(query.toLowerCase()) ||
        visitor.visitorMobile.includes(query) ||
        visitor.status.toLowerCase().includes(query.toLowerCase()) ||
        visitor.email.toLowerCase().includes(query.toLowerCase()),
    );
    setFilteredVisitors(filteredData);
  };

  const updateVisitorStatus = (id, status, checkin, checkout) => {
    const updatedVisitors = filteredVisitors.map(visitor =>
      visitor.id === id ? {...visitor, status, checkin, checkout} : visitor,
    );
    setFilteredVisitors(updatedVisitors);
  };

  return (
    <View style={{flex: 1, height: theme.buttonHeight}}>
      <Loader isLoading={isLoading} />
      <ScreenHeader navigation={navigation} text={VisitorsListHead} />
      <ScrollView style={styles.container}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name"
          placeholderTextColor={theme.colors.text}
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <FlatList
          data={filteredVisitors}
          renderItem={({item}) => (
            <VisitorCard
              visitor={item}
              updateVisitorStatus={updateVisitorStatus}
            />
          )}
          keyExtractor={item => item.id.toString()}
        />
      </ScrollView>
    </View>
  );
};

export default VisitorsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 32,
    backgroundColor: theme.colors.surface,
  },
  card: {
    flexDirection: 'row',
    padding: 10,
    overflow: Platform.OS === 'ios' ? 'visible' : 'hidden',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    margin: 8,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: -2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: 6,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 14,
    fontWeight: '600',
  },
  buttonContainer: {
    marginTop: 5,
    gap: 5,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#999',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  disabledButton: {
    backgroundColor: 'gray',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
    // opacity: 0.75,
  },
  image: {
    width: 84,
    height: 84,
    borderRadius: 6,
    marginLeft: 10,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 10,
    margin: 8,
  },
});

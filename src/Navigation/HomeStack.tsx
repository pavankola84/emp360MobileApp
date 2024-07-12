import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../Screens/Home/Home';
import ApplyLeave from '../Screens/Home/ApplyLeave';
import AppliedLeaves from '../Screens/Home/AppliedLeaves';
import Profile from '../Screens/Home/Profile';
import WFHRequest from '../Screens/Home/WFHRequest';
import CompOffRequest from '../Screens/Home/CompOffRequest';

const HomeNav = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <HomeNav.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={'HomeScreen'}>
      <HomeNav.Screen name="HomeScreen" component={Home} />
      <HomeNav.Screen name="WFHRequest" component={WFHRequest} />
      <HomeNav.Screen name="CompOffRequest" component={CompOffRequest} />
      {/* <HomeNav.Screen name="ApplyLeave" component={ApplyLeave} />
      <HomeNav.Screen name="AppliedLeaves" component={AppliedLeaves} /> */}
      {/* <HomeNav.Screen name="Profile" component={Profile} /> */}
      {/* <HomeNav.Screen name="VoiceRecorder" component={VoiceRecorder} /> */}
    </HomeNav.Navigator>
  );
};

export default HomeStack;

const styles = StyleSheet.create({});

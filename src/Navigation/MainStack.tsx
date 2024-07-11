import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthStack from './AuthStack';
import HomeStack from './HomeStack';
import TabNavigation from './TabNavigation';

const MainStackNav = createNativeStackNavigator();

const MainStack = () => {
  return (
    <MainStackNav.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={'AuthStack'}>
      {/* <MainStackNav.Screen name="Home" component={HomeStack} /> */}
      <MainStackNav.Screen name="MyTabs" component={TabNavigation} />
      <MainStackNav.Screen name="AuthStack" component={AuthStack} />
    </MainStackNav.Navigator>
  );
};

export default MainStack;

const styles = StyleSheet.create({});

import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../Screens/Authentication/Login';

const AuthNav = createNativeStackNavigator();

const AUthStack = () => {
  return (
    <AuthNav.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={'Login'}>
      <AuthNav.Screen name="Login" component={Login} />
    </AuthNav.Navigator>
  );
};

export default AUthStack;

const styles = StyleSheet.create({});

import {CompositeScreenProps} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React from 'react';
import ProfileSettings from '../Screens/settings/ProfileSettings';
import AppSettings from '../Screens/settings/AppSettings';
import Profile from '../Screens/Home/Profile';
import Terms from '../Screens/settings/Terms';
import FAQ from '../Screens/settings/FAQ';
import Contact from '../Screens/settings/Contact';
import About from '../Screens/settings/About';
import PersonalDetails from '../Screens/settings/PersonalDetails';
import Assets from '../Screens/settings/Assets';
import HobbiesAndInterests from '../Screens/settings/HobbiesAndInterests';
import Summary from '../Screens/settings/Summary';
import HolidaysList from '../Screens/QuckAccess/HolidaysList';
import VisitorsList from '../Screens/QuckAccess/VisitorsList';
import CompOffRequests from '../Screens/QuckAccess/CompOffRequests';

const AuthStackNav = createNativeStackNavigator();

const ProfileStack = () => {
  return (
    <AuthStackNav.Navigator screenOptions={{headerShown: false}}>
      <AuthStackNav.Screen name="Profile" component={Profile} />
      <AuthStackNav.Screen name="ProfileSettings" component={ProfileSettings} />
      {/* <AuthStackNav.Screen name="AppSettings" component={AppSettings} /> */}
      {/* <AuthStackNav.Screen name="Terms" component={Terms} /> */}
      {/* <AuthStackNav.Screen name="About" component={About} /> */}
      <AuthStackNav.Screen name="PersonalDetails" component={PersonalDetails} />
      <AuthStackNav.Screen name="HolidaysList" component={HolidaysList} />
      <AuthStackNav.Screen name="VisitorsList" component={VisitorsList} />
      <AuthStackNav.Screen name="CompOffRequests" component={CompOffRequests} />
      {/* <AuthStackNav.Screen name="Assets" component={Assets} /> */}
      <AuthStackNav.Screen
        name="HobbiesAndInterests"
        component={HobbiesAndInterests}
      />
      <AuthStackNav.Screen name="Summary" component={Summary} />
      {/* <AuthStackNav.Screen name="Contact" component={Contact} /> */}
      {/* <AuthStackNav.Screen name="FAQ" component={FAQ} /> */}
    </AuthStackNav.Navigator>
  );
};

export default ProfileStack;

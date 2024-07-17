import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Home from '../Screens/Home/Home';
import Profile from '../Screens/Home/Profile';
import HomeStack from './HomeStack';
import ApplyLeave from '../Screens/Home/ApplyLeave';
import AppliedLeaves from '../Screens/Home/AppliedLeaves';
import {dip} from '../util/function';
import {
  AppliedLeavesIcon,
  ApplyLeaveIcon,
  BookmarkIcon,
  Calendar,
  Content,
  HomeIcon,
  ProfileIcon,
  Receipts,
  SendMessage,
  VisitorBlackIcon,
} from '../util/icons';

import {BottomFabBar} from 'rn-wave-bottom-bar';
import ProfileStack from './ProfileStack';
import TeamLeaves from '../Screens/Home/TeamLeaves';
import useOnlyKeycloak from '../Hooks/useOnlyKeycloak';
import ApplyVisitor from '../Screens/Home/ApplyVisitor';

const Tab = createBottomTabNavigator();

const tabBarIcon =
  (name, Icon) =>
  ({focused, color, size}: {focused: boolean; color: string; size: number}) =>
    (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: focused ? '#e6eeff' : 'transparent',
          // borderWidth: 3,
          borderRadius: 12,
          width: '90%',
          height: '140%',
        }}>
        <Icon
          height={dip(20)}
          width={dip(20)}
          color={focused ? '#162952' : '#000'}
          strokeWidth={focused ? 2 : 1}
        />
        {focused ? (
          <Text
            style={{
              color: '#162952',
              fontSize: 10,
              marginVertical: 5,
              textTransform: 'uppercase',
              fontWeight: 'bold',
            }}>
            {name}
          </Text>
        ) : (
          <Text
            style={{
              color: '#000',
              fontSize: 10,
              marginVertical: 5,
              textTransform: 'uppercase',
            }}>
            {name}
          </Text>
        )}
      </View>
    );

function TabNavigation() {
  const {keycloak, profile}: any = useOnlyKeycloak();
  const [showLead, setShowLead] = useState(false);
  // let showLead;
  useEffect(() => {
    const roles = profile?.resource_access['camunda-identity-service'].roles;

    const hasEmpLeadRole = roles?.includes('emp-lead');
    setShowLead(hasEmpLeadRole);
  }, []);

  return (
    // <Tab.Navigator
    //   screenOptions={{
    //     headerShown: false,
    //     tabBarActiveTintColor: '#162952',
    //     tabBarActiveBackgroundColor: '#162952',

    //     // tabBarInactiveBackgroundColor: 'red',
    //   }}
    //   tabBar={props => (
    //     <View style={{height: dip(70)}}>
    //       <BottomFabBar
    //         mode={'default'}
    //         isRtl={false}
    //         // style={{height: dip(50)}}
    //         // Add Shadow for active tab bar button
    //         focusedButtonStyle={{
    //           shadowColor: '#000',
    //           shadowOffset: {
    //             width: 0,
    //             height: 7,
    //           },
    //           shadowOpacity: 0.41,
    //           shadowRadius: 9.11,
    //           elevation: 14,
    //         }}
    //         // - You can add the style below to show screen content under the tab-bar
    //         // - It will makes the "transparent tab bar" effect.
    //         bottomBarContainerStyle={{
    //           height: dip(70),
    //           position: 'absolute',
    //           bottom: -3,
    //           left: 0,
    //           right: 0,
    //         }}
    //         {...props}
    //       />
    //     </View>
    //   )}>
    //   <Tab.Screen
    //     options={{
    //       tabBarIcon: tabBarIcon('Home', HomeIcon),
    //     }}
    //     name="Home"
    //     component={HomeStack}
    //   />
    //   <Tab.Screen
    //     options={{
    //       tabBarIcon: tabBarIcon('Apply Leave', Content),
    //     }}
    //     name="ApplyLeave"
    //     component={ApplyLeave}
    //   />

    //   <Tab.Screen
    //     options={{
    //       tabBarIcon: tabBarIcon('Visitors', VisitorBlackIcon),
    //     }}
    //     name="Visitors"
    //     component={ApplyVisitor}
    //   />

    //   {showLead && (
    //     <Tab.Screen
    //       options={{
    //         tabBarIcon: tabBarIcon('Team Leaves', Receipts),
    //       }}
    //       name="TeamLeaves"
    //       component={TeamLeaves}
    //     />
    //   )}

    //   <Tab.Screen
    //     options={{
    //       tabBarIcon: tabBarIcon('My Profile', ProfileIcon),
    //     }}
    //     name="MyProfile"
    //     component={ProfileStack}
    //   />
    // </Tab.Navigator>
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#162952',
        tabBarInactiveBackgroundColor: '#fff',
        tabBarLabelStyle: {
          fontSize: 12,
          marginVertical: 5,
          textTransform: 'uppercase',
          display: 'none',
        },
        tabBarStyle: {
          // borderTopWidth: 1,
          // borderColor: '#ccc',
          height: 60,
          padding: 12,
        },
      }}>
      <Tab.Screen
        options={{
          tabBarIcon: tabBarIcon('Home', HomeIcon),
        }}
        name="Home"
        component={HomeStack}
      />
      <Tab.Screen
        options={{
          tabBarIcon: tabBarIcon('Apply Leave', Content),
        }}
        name="ApplyLeave"
        component={ApplyLeave}
      />
      <Tab.Screen
        options={{
          tabBarIcon: tabBarIcon('Visitors', VisitorBlackIcon),
        }}
        name="Visitors"
        component={ApplyVisitor}
      />
      {showLead && (
        <Tab.Screen
          options={{
            tabBarIcon: tabBarIcon('Team Leaves', Receipts),
          }}
          name="TeamLeaves"
          component={TeamLeaves}
        />
      )}
      <Tab.Screen
        options={{
          tabBarIcon: tabBarIcon('My Profile', ProfileIcon),
        }}
        name="MyProfile"
        component={ProfileStack}
      />
    </Tab.Navigator>
  );
}
export default TabNavigation;

const wd = Dimensions.get('window').width;

const CustomTabBar = ({state, descriptors, navigation}) => {
  return (
    <View style={styles.tabContainer}>
      <View
        style={{
          width: '100%',
          height: dip(60),
          // borderRadius: dip(40),
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          backgroundColor: '#162952',
        }}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={styles.tabItem}>
              {/* <Text style={{color: isFocused ? '#007AFF' : '#222'}}>
                {label}
              </Text> */}
              {route.name == 'Home' ? (
                <View
                  style={{
                    height: dip(60),
                    width: wd / 4 - 20,
                    //  backgroundColor: '#007AFF',
                    // transform: [{scaleX: 0.5}], // Adjust the scale factor to control the slanting angle

                    backgroundColor: isFocused ? '#ffffff' : 'transparent',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderBottomLeftRadius: dip(900),
                    borderBottomRightRadius: dip(900),
                  }}>
                  <HomeIcon
                    color={isFocused ? '#162952' : '#fff'}
                    height={dip(30)}
                    width={dip(30)}
                  />
                </View>
              ) : route.name == 'ApplyLeave' ? (
                <View
                  style={{
                    height: dip(45),
                    width: wd / 4,
                    backgroundColor: isFocused ? '#ffffff' : 'transparent',
                    justifyContent: 'center',
                    alignItems: 'center',
                    // borderRadius: dip(30),
                    borderBottomLeftRadius: dip(30),
                    borderBottomRightRadius: dip(30),
                  }}>
                  <Calendar
                    color={isFocused ? '#162952' : '#fff'}
                    height={dip(30)}
                    width={dip(30)}
                  />
                </View>
              ) : route.name == 'AppliedLeaves' ? (
                <View
                  style={{
                    height: dip(45),
                    width: wd / 4,
                    backgroundColor: isFocused ? '#ffffff' : 'transparent',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: dip(30),
                  }}>
                  <BookmarkIcon
                    color={isFocused ? '#162952' : '#fff'}
                    height={dip(30)}
                    width={dip(30)}
                  />
                </View>
              ) : (
                <View
                  style={{
                    height: dip(45),
                    width: wd / 4,
                    backgroundColor: isFocused ? '#ffffff' : 'transparent',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: dip(30),
                  }}>
                  <ProfileIcon
                    color={isFocused ? '#162952' : '#fff'}
                    height={dip(30)}
                    width={dip(30)}
                  />
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: dip(60),
    // borderTopWidth: 1,
    // borderTopColor: '#ccc',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

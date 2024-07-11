import React from 'react';
import {StatusBar, TouchableOpacity, View, Text} from 'react-native';
import {withTheme} from 'react-native-paper';
import {dip} from '../util/function';
import {ThemeOverride} from '../util/theme';
import {HomeProfile, Emp360Logo} from '../util/icons';
import Fonts from '../util/Fonts';
import useOnlyKeycloak from '../Hooks/useOnlyKeycloak';

const HomeHeader = (props: {
  theme: ThemeOverride;
  navigation: any;
  text: string;
  onProfileClick: () => void;
}) => {
  const {theme, navigation, text, onProfileClick} = props;
  const {keycloak, profile}: any = useOnlyKeycloak();
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#162952',
        paddingHorizontal: theme.paddingHorizontal / 2,
      }}>
      <Emp360Logo onPress={onProfileClick} height={dip(50)} width={dip(50)} />
      <View>
        <Text
          style={{
            fontFamily: Fonts.RobotoBold,
            fontSize: dip(20),
            fontWeight: '900',
            color: '#ffffff',
            paddingLeft: dip(20),
          }}>
          Hello welcome {keycloak?.tokenParsed?.family_name}
        </Text>
      </View>
    </View>
  );
};

export default withTheme(HomeHeader);

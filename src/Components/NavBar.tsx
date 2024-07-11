import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import React from 'react';
import {
  GestureResponderEvent,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import {withTheme} from 'react-native-paper';
import {SvgProps} from 'react-native-svg';
import {dip} from '../util/function';
import {Content, HomeIcon, ProfileIcon, ShareIcon} from '../util/icons';
import {TabLabel} from '../util/strings';
import {ThemeOverride} from '../util/theme';

const iconSize = dip(26);

const TabItem = ({
  Icon,
  text,
  selected,
  theme,
  onPress,
}: {
  Icon: React.FC<SvgProps>;
  text: string;
  selected: boolean;
  theme: ThemeOverride;
  onPress: (event: GestureResponderEvent) => void;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        alignItems: 'center',
        flex: 1,
      }}>
      <Icon
        width={iconSize}
        height={iconSize}
        color={selected ? theme.colors.primary : theme.colors.disabled}
      />
      <Text style={{fontSize: dip(11), color: theme.colors.disabled}}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const NavBar = (props: BottomTabBarProps & {theme: ThemeOverride}) => {
  const {theme} = props;
  return (
    <View
      style={{
        flexDirection: 'row',
        height: dip(70),
        width: '100%',
        elevation: 8,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: theme.colors.surface,
      }}>
      <TabItem
        Icon={HomeIcon}
        text={TabLabel[1]}
        selected={props.state.index === 0}
        theme={theme}
        onPress={() => {
          props.navigation.navigate('Home');
        }}
      />
      <TabItem
        Icon={Content}
        text={TabLabel[2]}
        selected={props.state.index === 1}
        theme={theme}
        onPress={() => {
          props.navigation.navigate('Main');
        }}
      />
      <TabItem
        Icon={ShareIcon}
        text={TabLabel[3]}
        selected={props.state.index === 2}
        theme={theme}
        onPress={() => {
          props.navigation.navigate('Messaging');
        }}
      />
      <TabItem
        Icon={ProfileIcon}
        text={TabLabel[4]}
        selected={props.state.index === 3}
        theme={theme}
        onPress={() => {
          props.navigation.navigate('ProfileTab');
        }}
      />
    </View>
  );
};

export default withTheme(NavBar);

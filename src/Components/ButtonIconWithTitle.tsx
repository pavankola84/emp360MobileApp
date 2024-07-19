import React, {ReactNode} from 'react';
import {
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
  View,
  Image,
} from 'react-native';
import {withTheme, Theme, ActivityIndicator} from 'react-native-paper';
import {dip} from '../util/function';
import {ThemeOverride, theme} from '../util/theme';
import CardView from 'react-native-cardview';
import Fonts from '../util/Fonts';

interface ButtonIconWithTitleProps {
  icon: ReactNode;
  text: string;
  onPress: () => void;
  backgroundColor?: string;
  color?: string;
  loading?: boolean;
  approveLoading?: boolean;
  rejectLoading?: boolean;
}

const ButtonIconWithTitle: React.FC<ButtonIconWithTitleProps> = ({
  icon,
  text,
  onPress,
  backgroundColor,
  color,
  loading,
  approveLoading,
  rejectLoading,
}) => {
  return (
    <TouchableOpacity
      disabled={approveLoading || rejectLoading}
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        {
          borderRadius: theme.roundness,
          // backgroundColor: '#ffffff',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          // height: theme.buttonHeight,
          width: '14%',
          gap: 6,
          // borderWidth: 0.3,
        },
      ]}>
      <CardView
        cardElevation={3}
        style={{
          height: theme.buttonHeight - 6,
          width: '90%',
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 1,
          backgroundColor: backgroundColor ?? '#fff',
        }}
        cardMaxElevation={2}
        cornerRadius={10}>
        <View
          style={{
            flexDirection: 'column',
            flex: 1,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          {/* {loading ? <ActivityIndicator color="black" /> : null} */}
          <View
            style={{
              width: dip(40),
              height: dip(40),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {icon}
          </View>
        </View>
      </CardView>
      <Text
        style={[
          {
            // width: '80%',
            fontFamily: Fonts.RobotoBold,
            fontWeight: '400',
            fontSize: dip(11.5),
            textAlign: 'center',
            color: color ? color : theme.colors.disabled,
          },
        ]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default withTheme(ButtonIconWithTitle);

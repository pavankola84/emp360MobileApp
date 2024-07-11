import React from 'react';
import {
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
  View,
} from 'react-native';
import {withTheme} from 'react-native-paper';
import {dip} from '../util/function';
import {ThemeOverride, theme} from '../util/theme';
import CardView from 'react-native-cardview';
import Fonts from '../util/Fonts';

const TabButton = ({text, onPress, backgroundColor, color}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[
        {
          height: theme.buttonHeight,
        },
      ]}>
      <View
        style={[
          {
            height: theme.buttonHeight,
            borderRadius: theme.roundness,
            backgroundColor: backgroundColor,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          },
        ]}>
        <Text
          style={[
            {
              fontFamily: Fonts.RobotoBold,
              fontWeight: '800',
              fontSize: dip(18),
              color: color ? color : theme.colors.disabled,
            },
          ]}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default withTheme(TabButton);

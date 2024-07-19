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

const TabButton = ({text, onPress, backgroundColor, color, fontWeight}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[
        {
          height: theme.buttonHeight,
          // borderWidth: 2,
          alignItems: 'center',
          justifyContent: 'center',
        },
      ]}>
      <View
        style={[
          {
            height: theme.buttonHeight - 10,
            width: '95%',
            borderRadius: theme.roundness,
            backgroundColor: backgroundColor,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            elevation: backgroundColor === '#162952' ? 2 : 0,
          },
        ]}>
        <Text
          style={[
            {
              fontFamily: Fonts.RobotoBold,
              fontWeight: fontWeight,
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

import React from 'react';
import {TouchableOpacity, TouchableOpacityProps, Text} from 'react-native';
import {withTheme} from 'react-native-paper';
import {dip} from '../util/function';
import {ThemeOverride} from '../util/theme';
import Fonts from '../util/Fonts';

export type ButtonProps = {
  text: string;
  onPress: () => void;
};

const Button = (
  buttonProps: {theme: ThemeOverride} & TouchableOpacityProps & ButtonProps
) => {
  const {style, onPress, theme, text, ...props} = buttonProps;

  return (
    <TouchableOpacity
      onPress={onPress}
      {...props}
      style={[
        {
          borderRadius: dip(10),
          backgroundColor: '#134984',
          height: dip(50),
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        },
        style,
      ]}>
      <Text
        style={{
          fontWeight: '400',
          fontSize: dip(20),
          color: theme.colors.lightText,
          fontFamily: Fonts.RobotoMedium,
        }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default withTheme(Button);

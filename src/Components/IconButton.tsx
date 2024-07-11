import React from 'react';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';
import {withTheme} from 'react-native-paper';
import {SvgProps} from 'react-native-svg';
import {dip} from '../util/function';
import {ThemeOverride} from '../util/theme';
import Text from './Text';

export type ButtonProps = {
  text: string;
  icon: React.FC<SvgProps>;
};

const Button = (
  buttonProps: {theme: ThemeOverride} & TouchableOpacityProps & ButtonProps
) => {
  const {style, theme, text, ...props} = buttonProps;

  const Icon = buttonProps.icon;
  return (
    <TouchableOpacity
      {...props}
      style={[
        {
          borderRadius: theme.roundness,
          backgroundColor: theme.colors.surface,
          height: theme.buttonHeight,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          elevation: 5,
        },
        style,
      ]}>
      {<Icon width={dip(25)} height={dip(25)} />}
      <Text
        style={{
          fontWeight: '400',
          fontSize: dip(18),
          color: theme.colors.text,
          marginLeft: theme.spacing,
        }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default withTheme(Button);

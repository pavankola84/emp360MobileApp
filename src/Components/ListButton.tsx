import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  Text,
} from 'react-native';
import {withTheme} from 'react-native-paper';
import {SvgProps} from 'react-native-svg';
import {dip} from '../util/function';
import {ChevronRight} from '../util/icons';
import {ThemeOverride} from '../util/theme';

export type ButtonProps = {
  text: string;
  icon: React.FC<SvgProps>;
  position?: 'top' | 'bottom' | 'middle' | 'single';
};

const Button = (
  buttonProps: {theme: ThemeOverride} & TouchableOpacityProps & ButtonProps,
) => {
  const {style, theme, text, position, ...props} = buttonProps;
  let pos = position;
  if (position === undefined) {
    pos = 'middle';
  }

  const Icon = buttonProps.icon;
  return (
    <TouchableOpacity
      {...props}
      style={[
        {
          backgroundColor: theme.colors.surface,
          height: theme.buttonHeight,
          flexDirection: 'row',
          padding: theme.spacing,
        },
        style,
        pos === 'bottom'
          ? {
              borderBottomLeftRadius: theme.roundness * 2,
              borderBottomRightRadius: theme.roundness * 2,
            }
          : undefined,
        pos === 'single'
          ? {
              borderTopLeftRadius: theme.roundness * 2,
              borderTopRightRadius: theme.roundness * 2,
              borderBottomLeftRadius: theme.roundness * 2,
              borderBottomRightRadius: theme.roundness * 2,
            }
          : undefined,
        pos === 'top'
          ? {
              borderTopLeftRadius: theme.roundness * 2,
              borderTopRightRadius: theme.roundness * 2,
            }
          : undefined,
      ]}>
      {<Icon width={dip(25)} height={dip(25)} color={theme.colors.text} />}
      <Text
        style={{
          fontWeight: '400',
          fontSize: dip(18),
          color: theme.colors.text,
          marginLeft: theme.spacing,
        }}>
        {text}
      </Text>
      <View style={{flex: 1, alignItems: 'flex-end'}}>
        <ChevronRight
          width={dip(18)}
          height={dip(18)}
          color={theme.colors.divider}
        />
      </View>
    </TouchableOpacity>
  );
};

export default withTheme(Button);

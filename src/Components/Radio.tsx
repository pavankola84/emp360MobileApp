import React from 'react';
import {ThemeOverride} from '../util/theme';
import {withTheme} from 'react-native-paper';

import {dip} from '../util/function';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  Text,
} from 'react-native';

const Radio = (
  props: {
    checked: boolean;
    theme: ThemeOverride;
    text?: string;
  } & TouchableOpacityProps
) => {
  const {checked, theme, text, ...viewProps} = props;
  return (
    <TouchableOpacity
      {...viewProps}
      style={[
        {
          alignItems: 'center',
          flexDirection: 'row',
        },
        viewProps.style,
      ]}>
      <View
        style={[
          {
            width: dip(20),
            height: dip(20),
            backgroundColor: 'transparent',
            borderRadius: 100,
            borderWidth: 1,
            borderColor: theme.colors.disabled,
            alignItems: 'center',
            justifyContent: 'center',
          },
        ]}>
        {checked && (
          <View
            style={{
              borderRadius: 100,
              width: dip(12),
              height: dip(12),
              backgroundColor: theme.colors.primary,
            }}
          />
        )}
      </View>
      {text && <Text style={{marginLeft: theme.spacing}}>{text}</Text>}
    </TouchableOpacity>
  );
};

export default withTheme(Radio);

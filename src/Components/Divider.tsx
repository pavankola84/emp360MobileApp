import React from 'react';
import {StyleSheet, View} from 'react-native';
import {withTheme} from 'react-native-paper';
import {ThemeOverride} from '../util/theme';

const Divider = ({theme}: {theme: ThemeOverride}) => {
  return (
    <View
      style={{
        width: '100%',
        height: StyleSheet.hairlineWidth,
        backgroundColor: theme.colors.divider + '44',
      }}
    />
  );
};

export default withTheme(Divider);

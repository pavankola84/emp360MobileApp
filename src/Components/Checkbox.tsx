import React from 'react';
import {ViewProps, View} from 'react-native';
import {withTheme} from 'react-native-paper';
import {dip} from '../util/function';
import {Tick} from '../util/icons';
import {ThemeOverride} from '../util/theme';

const Checkbox = (
  props: {checked: boolean; theme: ThemeOverride} & ViewProps,
) => {
  const {checked, theme, ...viewProps} = props;
  return (
    <View
      {...viewProps}
      style={[
        {
          width: dip(20),
          height: dip(20),
          backgroundColor: theme.colors.disabled,
          borderRadius: Math.min(theme.roundness, dip(6)),
          alignItems: 'center',
          justifyContent: 'center',
          borderColor: theme.colors.borderColor1,
          borderWidth: 2,
        },
        viewProps.style,
      ]}>
      {checked && (
        <Tick width={dip(12)} height={dip(12)} color={theme.colors.lightText} />
      )}
    </View>
  );
};

export default withTheme(Checkbox);

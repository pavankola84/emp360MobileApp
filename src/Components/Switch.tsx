import React from 'react';
import {ThemeOverride} from '../util/theme';
import {withTheme} from 'react-native-paper';

import {dip} from '../util/function';
import {ViewProps, View} from 'react-native';

const Switch = (
  props: {checked: boolean; theme: ThemeOverride} & ViewProps
) => {
  const {checked, theme, ...viewProps} = props;
  return (
    <View
      {...viewProps}
      style={[
        {
          width: dip(40),
          height: dip(20),
          backgroundColor: checked
            ? theme.colors.primary
            : theme.colors.disabled,
          borderRadius: 100,
          alignItems: 'center',
          justifyContent: checked ? 'flex-end' : 'flex-start',
          flexDirection: 'row',
          paddingHorizontal: dip(3),
        },
        viewProps.style,
      ]}>
      <View
        style={{
          borderRadius: 100,
          width: dip(14),
          height: dip(14),
          backgroundColor: theme.colors.lightText,
        }}
      />
    </View>
  );
};

export default withTheme(Switch);

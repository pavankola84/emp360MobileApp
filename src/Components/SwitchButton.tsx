import React from 'react';
import {TouchableOpacity, ViewProps} from 'react-native';
import {withTheme} from 'react-native-paper';
import {dip} from '../util/function';
import {ThemeOverride} from '../util/theme';
import Switch from './Switch';
import Text from './Text';

const SwitchButton = (
  props: {
    checked: boolean;
    theme: ThemeOverride;
    setChecked: Function;
    label: string;
  } & ViewProps
) => {
  const {label, theme, checked, setChecked, ...viewProps} = props;
  return (
    <TouchableOpacity
      {...viewProps}
      style={[
        {
          height: theme.buttonHeight,
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          backgroundColor: theme.colors.surface,
          borderRadius: theme.roundness,
          paddingHorizontal: theme.spacing,
        },
        viewProps.style,
      ]}
      onPress={() => {
        setChecked(!checked);
      }}>
      <Text style={{fontSize: dip(16)}}>{label}</Text>
      <Switch checked={checked} />
    </TouchableOpacity>
  );
};

export default withTheme(SwitchButton);

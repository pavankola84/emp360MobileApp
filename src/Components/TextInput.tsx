import React from 'react';
import {TextInput as RNTextInput, TextInputProps} from 'react-native';
import {withTheme} from 'react-native-paper';
import {theme, ThemeOverride} from '../util/theme';

const TextInput = (props: TextInputProps & {theme: ThemeOverride}) => {
  return (
    <RNTextInput
      {...props}
      style={[
        {
          borderRadius: theme.roundness,
          height: theme.buttonHeight,
          borderWidth: 1,
          borderColor: theme.colors.disabled,
          color: theme.colors.text,
          paddingHorizontal: theme.spacing,
        },
        props.style,
      ]}
      placeholderTextColor={theme.colors.placeholder}
    />
  );
};

export default withTheme(TextInput);

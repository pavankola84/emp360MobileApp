import React from 'react';
import {TextProps} from 'react-native';
import {Text as PaperText, withTheme} from 'react-native-paper';
import {ThemeOverride} from '../util/theme';

const Text = (props: TextProps & {theme: ThemeOverride}) => (
  <PaperText
    {...props}
    style={[{color: props.theme.colors.text}, props.style]}
  />
);

export default withTheme(Text);

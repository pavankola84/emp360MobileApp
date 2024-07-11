import React from 'react';
import {
  TextInput as RNTextInput,
  TextInputProps,
  ViewProps,
  View,
} from 'react-native';
import {withTheme} from 'react-native-paper';
import {dip} from '../util/function';
import {SearchIcon} from '../util/icons';
import {SearchPlaceholder} from '../util/strings';
import {ThemeOverride} from '../util/theme';

const SearchBox = (
  props: ViewProps & {theme: ThemeOverride; textInputProps: TextInputProps}
) => {
  const {textInputProps, theme, ...viewProps} = props;
  return (
    <View {...viewProps} style={[{height: theme.buttonHeight}, viewProps]}>
      <View
        style={{
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          width: dip(40),
        }}>
        <SearchIcon
          width={dip(25)}
          height={dip(25)}
          color={theme.colors.disabled}
        />
      </View>
      <RNTextInput
        {...textInputProps}
        style={[
          {
            borderRadius: theme.roundness,
            height: theme.buttonHeight,
            borderWidth: 1,
            borderColor: theme.colors.disabled,
            color: theme.colors.text,
            paddingLeft: dip(40),
          },
          props.style,
        ]}
        placeholder={SearchPlaceholder}
        placeholderTextColor={theme.colors.placeholder}
      />
    </View>
  );
};

export default withTheme(SearchBox);

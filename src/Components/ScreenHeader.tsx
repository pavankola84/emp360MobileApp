import React from 'react';
import {StatusBar, TouchableOpacity} from 'react-native';
import {withTheme} from 'react-native-paper';
import {dip} from '../util/function';
import {ChevronLeft} from '../util/icons';
import {ThemeOverride} from '../util/theme';
import Text from './Text';
import View from './View';

const ScreenHeader = (props: {
  theme: ThemeOverride;
  navigation: any;
  text: string;
}) => {
  const {theme, navigation, text} = props;
  return (
    <View
      style={{
        paddingHorizontal: theme.paddingHorizontal / 2,
        flexDirection: 'row',
        alignItems: 'center',
        padding: theme.spacing,
        backgroundColor: '#182c54',
      }}>
      {navigation && (
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{marginRight: theme.spacing}}>
          <ChevronLeft
            width={dip(20)}
            height={dip(20)}
            color={theme.colors.surface}
          />
        </TouchableOpacity>
      )}
      <Text
        style={{
          fontSize: dip(20),
          fontWeight: '700',
          color: theme.colors.surface,
        }}>
        {text}
      </Text>
    </View>
  );
};

export default withTheme(ScreenHeader);

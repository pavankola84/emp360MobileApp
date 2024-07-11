import React from 'react';
import {
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
  View,
} from 'react-native';
import {withTheme, Theme, ActivityIndicator} from 'react-native-paper';
import {dip} from '../util/function';
import {ThemeOverride, theme} from '../util/theme';
import CardView from 'react-native-cardview';
import Fonts from '../util/Fonts';

interface BlankButtonProps {
  text: string;
  onPress: () => void;
  backgroundColor?: string;
  color?: string;
  loading?: boolean;
  approveLoading?: boolean;
  rejectLoading?: boolean;
}

const BlankButton: React.FC<BlankButtonProps> = ({
  text,
  onPress,
  backgroundColor,
  color,
  loading,
  approveLoading,
  rejectLoading,
}) => {
  return (
    <TouchableOpacity
      disabled={approveLoading || rejectLoading}
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        {
          borderRadius: theme.roundness,
          backgroundColor: '#ffffff',
          height: theme.buttonHeight,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          // borderWidth: 0.3,
        },
      ]}>
      <CardView
        cardElevation={3}
        style={{
          height: theme.buttonHeight,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 1,
          backgroundColor: backgroundColor ?? '#ffffff',
        }}
        cardMaxElevation={2}
        cornerRadius={10}>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          {loading ? <ActivityIndicator color="black" /> : null}
          <Text
            style={[
              {
                fontFamily: Fonts.RobotoBold,
                fontWeight: '800',
                fontSize: dip(18),
                color: color ? color : theme.colors.disabled,
              },
            ]}>
            {text}
          </Text>
        </View>
      </CardView>
    </TouchableOpacity>
  );
};

export default withTheme(BlankButton);

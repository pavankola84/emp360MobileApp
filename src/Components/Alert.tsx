import React from 'react';
import {
  GestureResponderEvent,
  Modal,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import {withTheme} from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {dip} from '../util/function';
import {ThemeOverride} from '../util/theme';
import PrimaryButton from './PrimaryButton';

const Alert = ({
  theme,
  title,
  onPressButton,
  setVisible,
  buttonTitle,
  visible,
}: {
  theme: ThemeOverride;
  title: string;
  onPressButton: (event: GestureResponderEvent) => void;
  setVisible: (visible: boolean) => void;
  buttonTitle?: string;
  visible: boolean;
}) => {
  return (
    <Modal visible={visible} transparent={true} animationType={'fade'}>
      <TouchableOpacity
        activeOpacity={1}
        style={{
          position: 'absolute',
          width: wp(100),
          height: hp(100),
          backgroundColor: '#00000077',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => {
          setVisible(false);
        }}>
        <TouchableOpacity
          activeOpacity={1}
          style={{
            width: wp(100) - theme.paddingHorizontal * 2,
            backgroundColor: theme.colors.surface,
            flexDirection: 'column',
            padding: theme.paddingHorizontal,
            justifyContent: 'space-between',
            borderRadius: theme.roundness,
          }}>
          <>
            <Text style={[{color: theme.colors.text, textAlign: 'center'}]}>
              {title}
            </Text>
            <View
              style={{
                marginTop: theme.paddingHorizontal,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: 'transparent',
              }}>
              <PrimaryButton
                style={{flex: 1, height: dip(42)}}
                text={buttonTitle ?? 'Okay'}
                onPress={onPressButton}
              />
            </View>
          </>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default withTheme(Alert);

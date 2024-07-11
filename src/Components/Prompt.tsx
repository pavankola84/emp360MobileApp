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
import BlankButton from './BlankButton';
import PrimaryButton from './PrimaryButton';

const Prompt = ({
  theme,
  title,
  onPressNegative,
  onPressPositive,
  setVisible,
  positiveTitle,
  negativetitle,
  visible,
}: {
  theme: ThemeOverride;
  title: string;
  onPressNegative: (event: GestureResponderEvent) => void;
  onPressPositive: (event: GestureResponderEvent) => void;
  setVisible: (visible: boolean) => void;
  positiveTitle?: string;
  negativetitle?: string;
  visible: boolean;
}) => {
  return (
    <Modal visible={visible} transparent={true} animationType={'fade'}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          setVisible(false);
        }}
        style={{
          position: 'absolute',
          width: wp(100),
          height: hp(100),
          backgroundColor: '#00000077',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {}}
          style={{
            width: wp(100) - theme.paddingHorizontal * 2,
            backgroundColor: theme.colors.surface,
            flexDirection: 'column',
            padding: theme.paddingHorizontal,
            justifyContent: 'space-between',
            borderRadius: theme.roundness,
          }}>
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
            {/* <PrimaryButton
              style={{flex: 1, height: dip(42)}}
              text={negativetitle ?? 'Cancel'}
              onPress={onPressNegative}
            /> */}
            <View style={{flex: 1, marginHorizontal: dip(10)}}>
              <BlankButton
                color={'#000000'}
                backgroundColor={'#ffffff'}
                onPress={onPressNegative}
                text={negativetitle ?? 'Cancel'}
              />
            </View>
            <View style={{flex: 1, marginHorizontal: dip(10)}}>
              <BlankButton
                style={{flex: 1}}
                color={'#ffffff'}
                backgroundColor={'green'}
                onPress={onPressPositive}
                text={positiveTitle ?? 'Accept'}
              />
            </View>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default withTheme(Prompt);

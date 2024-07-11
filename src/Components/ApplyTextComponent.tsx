import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {dip} from '../util/function';
import Fonts from '../util/Fonts';

interface ApplyTextComponentProps {
  name: string;
  value: string;
}

const ApplyTextComponent: FC<ApplyTextComponentProps> = ({name, value}) => {
  return (
    <View
      style={{
        flex: 1,
        height: dip(100),
        borderWidth: 1,
        borderRadius: 10,
        padding: dip(10),
        paddingHorizontal: dip(10),
        borderColor: '#a4cbfc',
        backgroundColor: '#f5f9ff',
      }}>
      <View style={{flex: 3}}>
        <Text
          style={{
            fontFamily: Fonts.RobotoBold,
            fontWeight: '700',
            fontSize: dip(17),
            color: '#4690fb',
          }}>
          {name}
        </Text>
      </View>
      <View style={{flex: 1}}>
        <Text
          style={{
            height: '100%',
            fontSize: dip(18),
            color: '#000000',
          }}>
          {value}
        </Text>
      </View>
    </View>
  );
};

export default ApplyTextComponent;

const styles = StyleSheet.create({});

import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {dip} from '../util/function';
import Fonts from '../util/Fonts';

interface ApplyLeaveTextComponentProps {
  name: string;
  value: string;
}

const ApplyLeaveTextComponent: FC<ApplyLeaveTextComponentProps> = ({
  name,
  value,
}) => {
  return (
    <View
      style={{
        flex: 1,
        height: dip(90),
        justifyContent: 'space-evenly',
        borderWidth: 1,
        borderRadius: 10,
        marginVertical: dip(10),
        padding: dip(10),
        borderColor: '#a4cbfc',
        backgroundColor: '#f5f9ff',
      }}>
      <View style={{flex: 1}}>
        <Text
          style={{
            lineHeight: dip(20),
            fontFamily: Fonts.RobotoBold,
            fontWeight: '700',
            fontSize: dip(18),
            color: '#4690fb',
          }}>
          {name}
        </Text>
      </View>
      <View
        style={{
          flex: 1.5,
          borderRadius: 10,
          justifyContent: 'center',
        }}>
        <Text
          style={{
            lineHeight: dip(30),
            height: '80%',
            fontSize: dip(18),
            color: '#000000',
          }}>
          {value}
        </Text>
      </View>
    </View>
  );
};

export default ApplyLeaveTextComponent;

const styles = StyleSheet.create({});

import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ChevronLeft} from '../util/icons';
import {dip} from '../util/function';
import Fonts from '../util/Fonts';

interface HeaderProps {
  name: string;
  onBackPress: () => void;
  back: boolean;
}

const Header: FC<HeaderProps> = ({name, onBackPress, back}) => {
  return (
    <View style={{flex: 1, flexDirection: 'row', backgroundColor: '#162952'}}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {back ? (
          <TouchableOpacity
            onPress={() => {
              onBackPress();
            }}>
            <ChevronLeft height={dip(25)} width={dip(25)} color={'#ffffff'} />
          </TouchableOpacity>
        ) : null}
      </View>
      <View style={{flex: 6, justifyContent: 'center', alignItems: 'center'}}>
        <Text
          style={{
            fontSize: dip(20),
            fontFamily: Fonts.RobotoBold,
            color: '#ffffff',
            fontWeight: 'bold',
          }}>
          {name}
        </Text>
      </View>
      <View style={{flex: 1}}></View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});

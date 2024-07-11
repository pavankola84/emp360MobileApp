import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {dip} from '../util/function';

const AvailableCardColors = ({name, color}) => {
  return (
    <View style={{flexDirection: 'row', paddingVertical: 5}}>
      <TouchableOpacity
        style={{
          height: dip(20),
          width: dip(20),
          borderWidth: 1,
          backgroundColor: color,
        }}
      />
      <View style={{paddingLeft: 10}}>
        <Text>{name}</Text>
      </View>
    </View>
  );
};

export default AvailableCardColors;

const styles = StyleSheet.create({});

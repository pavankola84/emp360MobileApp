import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';

interface AvailableTextProps {
  name: string;
  value: string;
}

const AvailableText: FC<AvailableTextProps> = ({name, value}) => {
  return (
    <View
      style={{
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <Text>{name}</Text>
      <Text>{value}</Text>
    </View>
  );
};

export default AvailableText;

const styles = StyleSheet.create({});

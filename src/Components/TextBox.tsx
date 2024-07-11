import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {dip} from '../util/function';
import Fonts from '../util/Fonts';

interface TextBoxProps {
  keyboard: boolean;
  name: string;
  onChangeText: (text: string) => void;
  value: string;
}

const TextBox: React.FC<TextBoxProps> = ({
  keyboard,
  name,
  onChangeText,
  value,
}) => {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <TextInput
        secureTextEntry={keyboard}
        value={value}
        style={{
          width: '80%',
          backgroundColor: '#ffffff',
          height: dip(55),
          borderRadius: dip(60),
          borderColor: '#cccccc',
          borderWidth: 1,
          paddingLeft: dip(20),
          fontSize: dip(18),
          fontFamily: Fonts.RobotoRegular,
          color: '#333333',
        }}
        onChangeText={text => onChangeText(text)}
        placeholder={name}
        placeholderTextColor={'#787878'}
      />
    </View>
  );
};

export default TextBox;

const styles = StyleSheet.create({});

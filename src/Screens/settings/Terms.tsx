import React from 'react';
import {ScrollView} from 'react-native';
import ScreenHeader from '../../Components/ScreenHeader';
import Text from '../../Components/Text';
import View from '../../Components/View';
import useTheme from '../../Hooks/useTheme';
import {dip} from '../../util/function';
import {LongLipsum} from '../../util/strings';

const Terms = ({navigation, route}) => {
  const {type} = route.params;
  const theme = useTheme();
  return (
    <View style={{}}>
      <ScreenHeader text={type} navigation={navigation} />
      <ScrollView style={{paddingHorizontal: theme.paddingHorizontal}}>
        <Text
          style={{
            fontSize: dip(25),
            fontWeight: 'bold',
            marginBottom: theme.spacing,
          }}>
          {type}
        </Text>
        <Text
          style={{
            fontSize: dip(16),
            textAlign: 'justify',
            color: theme.colors.disabled,
          }}>
          {LongLipsum}
        </Text>
      </ScrollView>
    </View>
  );
};

export default Terms;

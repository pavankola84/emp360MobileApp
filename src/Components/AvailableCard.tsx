import React, {FC} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CardView from 'react-native-cardview';
import {theme} from '../util/theme';
import {dip} from '../util/function';
import {Bar, Pie} from 'react-native-progress';
import AvailableText from './AvailableText';
import AvailableCardColors from './AvailableCardColors';
import BlankButton from './BlankButton';

interface AvailableCardProps {
  name: string;
  onPress: () => void;
}

const wd: number = Dimensions.get('window').width;

const AvailableCard: FC<AvailableCardProps> = ({name, onPress}) => {
  return (
    <CardView
      cardElevation={2}
      style={{flex: 1, padding: theme.paddingHorizontal / 2}}
      cardMaxElevation={2}
      cornerRadius={10}>
      <View style={{flex: 1}}>
        <Text>{name}</Text>
      </View>
      <View style={{flex: 6}}>
        <View style={{flex: 1}}>
          <View style={{flex: 2, justifyContent: 'center'}}>
            <Bar
              progress={0.5}
              color={'green'}
              unfilledColor={'red'}
              width={wd * 0.8}
            />
          </View>
        </View>
        <View style={{flex: 10}}>
          <View style={{flex: 2}}>
            <AvailableText name={'Available'} value={0} />
            <AvailableText name={'Used'} value={0} />
            <AvailableText name={'Accumulated'} value={0} />
          </View>
        </View>
      </View>
    </CardView>
  );
};

export default AvailableCard;

const styles = StyleSheet.create({});

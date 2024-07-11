import moment from 'moment';
import React, {useMemo, useState} from 'react';
import {
  GestureResponderEvent,
  Image,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import {withTheme} from 'react-native-paper';
import {dip} from '../util/function';
import {ThemeOverride} from '../util/theme';

const HorizontalListItem = ({
  theme,
  name,
  onPress,
}: {
  theme: ThemeOverride;
  name: string;
  onPress?: (event: GestureResponderEvent) => void;
}) => {
  const random = useMemo(() => Math.random(), []);
  const [fav, setFav] = useState(false);
  return (
    <TouchableOpacity
      style={{
        backgroundColor: theme.colors.surface,
        borderRadius: theme.roundness,

        padding: theme.spacing / 2,
        flexDirection: 'column',
        height: dip(210),
        width: dip(180),
      }}
      onPress={onPress}>
      <View style={{overflow: 'hidden', borderRadius: theme.roundness}}>
        <Image
          source={require('../../assets/img/square3.jpg')}
          style={{
            height: dip(130),
            width: dip(180),
            borderRadius: theme.roundness,
          }}
        />
      </View>
      <View style={{marginVertical: theme.spacing}}>
        <Text>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default withTheme(HorizontalListItem);

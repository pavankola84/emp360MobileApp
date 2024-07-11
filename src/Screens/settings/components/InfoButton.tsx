import React from 'react';
import {TouchableOpacity} from 'react-native';
import {withTheme} from 'react-native-paper';
import {SvgProps} from 'react-native-svg';
import Text from '../../../Components/Text';
import View from '../../../Components/View';
import {dip} from '../../../util/function';
import {ThemeOverride} from '../../../util/theme';

const InfoButton = ({
  Icon,
  heading,
  text,
  theme,
  onPress,
}: {
  Icon: React.FC<SvgProps>;
  heading: string;
  text: string;
  theme: ThemeOverride;
  onPress?: () => void;
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        padding: theme.spacing,
        alignItems: 'center',
        borderRadius: theme.roundness,
        backgroundColor: theme.colors.surface,
        marginTop: theme.spacing,
      }}>
      <Icon width={dip(20)} height={dip(20)} color={theme.colors.disabled} />
      <TouchableOpacity
        onPress={onPress}
        style={{flexDirection: 'column', flex: 1, marginLeft: theme.spacing}}>
        <Text style={{fontSize: dip(18), fontWeight: '600'}}>{heading}</Text>
        <Text style={{fontSize: dip(14)}}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default withTheme(InfoButton);

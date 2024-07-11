import React from 'react';
import {Share} from 'react-native';
import Package from '../../../package.json';
import ScreenHeader from '../../Components/ScreenHeader';
import View from '../../Components/View';
import useTheme from '../../Hooks/useTheme';
import {Apple, ShareIcon as ShareIcon, Star} from '../../util/icons';
import {
  AboutHeader,
  RateButton,
  RateDetail,
  ShareButton,
  ShareDetail,
  ShareMessage,
  ShareURL,
} from '../../util/strings';
import InfoButton from './components/InfoButton';

const About = ({navigation}) => {
  const theme = useTheme();
  return (
    <View style={{flex: 1, backgroundColor: theme.colors.background}}>
      <ScreenHeader text={AboutHeader} navigation={navigation} />
      <View style={{paddingHorizontal: theme.paddingHorizontal}}>
        <InfoButton
          theme={theme}
          Icon={Apple}
          heading={AboutHeader}
          text={Package.version}
        />
        <InfoButton
          theme={theme}
          Icon={Star}
          heading={RateButton}
          text={RateDetail}
        />
        <InfoButton
          theme={theme}
          Icon={ShareIcon}
          heading={ShareButton}
          text={ShareDetail}
          onPress={() => {
            Share.share({
              url: ShareURL,
              message: ShareMessage,
            });
          }}
        />
      </View>
    </View>
  );
};

export default About;

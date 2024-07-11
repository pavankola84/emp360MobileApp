import React from 'react';
import ScreenHeader from '../../Components/ScreenHeader';
import View from '../../Components/View';
import useTheme from '../../Hooks/useTheme';
import {Facebook, Logo} from '../../util/icons';
import {
  AppName,
  ContactHeader,
  FacebookButton,
  ShareURL,
} from '../../util/strings';
import InfoButton from './components/InfoButton';

const Contact = ({navigation}) => {
  const theme = useTheme();
  return (
    <View style={{flex: 1, backgroundColor: theme.colors.background}}>
      <ScreenHeader text={ContactHeader} navigation={navigation} />
      <View style={{paddingHorizontal: theme.paddingHorizontal}}>
        <InfoButton
          theme={theme}
          Icon={Facebook}
          heading={FacebookButton}
          text={'/techsophy'}
        />
        <InfoButton
          theme={theme}
          Icon={Logo}
          heading={AppName}
          text={ShareURL}
        />
      </View>
    </View>
  );
};

export default Contact;

import React, {useState} from 'react';
import PrimaryButton from '../../Components/PrimaryButton';
import ScreenHeader from '../../Components/ScreenHeader';
import Spinner from '../../Components/Spinner';
import SwitchButton from '../../Components/SwitchButton';
import View from '../../Components/View';
import {useAppSettingsContext} from '../../context/appSettings';
import useAsyncStorage from '../../Hooks/useAsyncStorage';
import useTheme from '../../Hooks/useTheme';
import {ProfileSettingsHead, SaveButton} from '../../util/strings';

const AppSettings = ({navigation}) => {
  const theme = useTheme();
  const [appLock, setAppLock] = useState(false);

  const [storageItem, updateStorageItem] = useAsyncStorage('theme');

  const context = useAppSettingsContext();

  return (
    <View style={{flex: 1, height: theme.buttonHeight}}>
      <ScreenHeader navigation={navigation} text={ProfileSettingsHead} />
      <View
        style={{
          paddingHorizontal: theme.paddingHorizontal,
        }}>
        <SwitchButton
          style={{marginTop: theme.spacing}}
          label="App Lock"
          checked={appLock}
          setChecked={setAppLock}
        />
        <Spinner
          style={{marginTop: theme.spacing}}
          data={['Green', 'Blue', 'Red']}
          label={storageItem ?? 'Select Theme'}
          onSelect={(text: string) => {
            context.setTheme(text);
            if (typeof updateStorageItem === 'function') {
              updateStorageItem(text);
            }
          }}
        />
        <Spinner
          style={{marginTop: theme.spacing}}
          data={['English']}
          label={'Language'}
          onSelect={(_text: string) => {}}
        />
        <Spinner
          style={{marginTop: theme.spacing}}
          data={['India', 'United States', 'France']}
          label={'Country'}
          onSelect={(_text: string) => {}}
        />
        <PrimaryButton
          text={SaveButton}
          onPress={() => {
            navigation.goBack();
          }}
          style={{marginTop: theme.spacing}}
        />
      </View>
    </View>
  );
};

export default AppSettings;

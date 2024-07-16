import React, {useState} from 'react';
import {Image, ScrollView, StyleSheet} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Alert from '../../Components/Alert';
import Divider from '../../Components/Divider';
import ListButton from '../../Components/ListButton';
import Prompt from '../../Components/Prompt';
import {theme, theme2, theme3} from '../../util/theme';
import useOnlyKeycloak from '../../Hooks/useOnlyKeycloak';
import useTheme from '../../Hooks/useTheme';
import {dip} from '../../util/function';
import {
  DeleteIcon,
  LogoutIcon,
  PrivacyIcon,
  ProfileIcon,
  Receipts,
  TermsIcon,
  Play,
  BookmarkIcon,
  File,
} from '../../util/icons';
import {
  AboutHeader,
  AccountsHeader,
  ContactHeader,
  DeleteAccountButton,
  EULAHeader,
  AssetsHeader,
  InterestsAndHobbiesHeader,
  FAQHeader,
  LegalSettingsHeader,
  LoginButtonProfile,
  LogoutButton,
  LogoutConfirm,
  PrivacyHeader,
  ProfileSettingsHead,
  SettingsHeader,
  TermsHeader,
  QuickAccessHeader,
} from '../../util/strings';
import View from '../../Components/View';
import Text from '../../Components/Text';
import ImageCard from '../../Components/ImageCard';

const Profile = ({navigation}) => {
  const theme = useTheme();
  const [logoutDialog, setLogoutDialog] = useState(false);
  const {keycloak} = useOnlyKeycloak();
  const [error, setError] = useState('');

  return (
    <View
      style={{
        backgroundColor: theme.colors.background,
        flex: 1,
      }}>
      <ScrollView
        style={{
          paddingHorizontal: theme.paddingHorizontal / 2,
          // paddingVertical: theme.paddingHorizontal / 2,
        }}>
        <View style={{height: hp(5), marginTop: theme.paddingVertical / 1.5}}>
          <Text style={{fontSize: dip(24)}}>{QuickAccessHeader}</Text>
        </View>
        <View style={styles.cardsContainer}>
          <ImageCard
            text="Holidays List"
            imageSource={require('../../../assets/img/holiday.jpg')}
            backgroundColor={theme2.colors.surface}
            textColor={theme.colors.text}
            path="HolidaysList"
          />
          <ImageCard
            text="Visitors List"
            imageSource={require('../../../assets/img/visitor.jpg')}
            backgroundColor={theme2.colors.surface}
            textColor={theme.colors.text}
            path="VisitorsList"
          />
          {/* <ImageCard
            text="Comp Off Requests"
            imageSource={require('../../../assets/img/comp-off.jpg')}
            backgroundColor={theme2.colors.surface}
            path="CompOffRequests"
            textColor={theme.colors.text}
          /> */}
          <ImageCard
            text="Sample Text"
            imageSource={require('../../../assets/img/landscape4.jpg')}
            backgroundColor={theme2.colors.surface}
            path="VisitorsList"
            textColor={theme.colors.text}
          />
          <ImageCard
            text="Sample Text"
            imageSource={require('../../../assets/img/landscape4.jpg')}
            backgroundColor={theme2.colors.surface}
            path="VisitorsList"
            textColor={theme.colors.text}
          />
          <ImageCard
            text="Sample Text"
            imageSource={require('../../../assets/img/landscape4.jpg')}
            backgroundColor={theme2.colors.surface}
            path="VisitorsList"
            textColor={theme.colors.text}
          />
          <ImageCard
            text="Sample Text"
            imageSource={require('../../../assets/img/landscape4.jpg')}
            backgroundColor={theme2.colors.surface}
            path="VisitorsList"
            textColor={theme.colors.text}
          />
        </View>
        <View style={{height: hp(5), marginTop: theme.paddingVertical}}>
          <Text style={{fontSize: dip(24)}}>{SettingsHeader}</Text>
        </View>
        <Text style={{fontSize: dip(18)}}>{ProfileSettingsHead}</Text>
        <View
          style={{
            marginTop: theme.spacing,
          }}>
          <ListButton
            text={ProfileSettingsHead}
            icon={ProfileIcon}
            onPress={() => {
              // if (keycloak?.token) {
              //   keycloak?.accountManagement();
              // } else {
              //   setError('Please login to access profile settings');
              // }
              navigation.navigate('PersonalDetails');
              // navigation.navigate('ProfileSettings');
            }}
            position={'top'}
          />
          <Divider />
          {/* <ListButton
            text={AssetsHeader}
            icon={Receipts}
            onPress={() => {
              navigation.navigate('Assets');
            }}
          />
          <Divider /> */}
          <ListButton
            text={InterestsAndHobbiesHeader}
            icon={BookmarkIcon}
            onPress={() => {
              navigation.navigate('HobbiesAndInterests');
            }}
          />
          <Divider />
          <ListButton
            text={'Summary'}
            icon={File}
            onPress={() => {
              navigation.navigate('Summary');
            }}
            position={'bottom'}
          />
        </View>
        {/* <Text style={{fontSize: dip(18), marginTop: theme.spacing}}>
          {LegalSettingsHeader}
        </Text> */}
        {/* <View style={{marginTop: theme.spacing}}>
          <ListButton
            text={TermsHeader}
            icon={TermsIcon}
            onPress={() => {
              navigation.navigate('Terms', {type: 'Terms'});
            }}
            position={'top'}
          />
          <Divider />
          <ListButton
            text={EULAHeader}
            icon={Receipts}
            onPress={() => {
              navigation.navigate('Terms', {type: 'EULA'});
            }}
          />
          <Divider />
          <ListButton
            text={PrivacyHeader}
            icon={PrivacyIcon}
            onPress={() => {
              navigation.navigate('Terms', {type: 'Privacy'});
            }}
          />
          <Divider />
          <ListButton
            text={FAQHeader}
            icon={ProfileIcon}
            onPress={() => {
              navigation.navigate('FAQ');
            }}
          />
          <Divider />
          <ListButton
            text={ContactHeader}
            icon={ProfileIcon}
            onPress={() => {
              navigation.navigate('Contact');
            }}
          />
          <Divider />
          <ListButton
            text={AboutHeader}
            icon={ProfileIcon}
            onPress={() => {
              navigation.navigate('About');
            }}
            position={'bottom'}
          />
        </View> */}
        <Text style={{fontSize: dip(18), marginTop: theme.spacing}}>
          {AccountsHeader}
        </Text>
        <View style={{marginTop: theme.spacing}}>
          <ListButton
            text={keycloak?.token ? LogoutButton : LoginButtonProfile}
            icon={LogoutIcon}
            onPress={() => {
              if (keycloak?.token) {
                setLogoutDialog(true);
              } else {
                navigation.reset({
                  index: 0,
                  routes: [{name: 'AuthStack' as any}],
                });
              }
            }}
            position={'single'}
          />

          <Divider />
          {/* <ListButton
            text={DeleteAccountButton}
            icon={DeleteIcon}
            onPress={() => {}}
            position={'bottom'}
          /> */}
        </View>
        <View style={{height: hp(10)}} />
      </ScrollView>
      <Prompt
        title={LogoutConfirm}
        onPressNegative={() => {
          setLogoutDialog(false);
        }}
        onPressPositive={async () => {
          if (keycloak === undefined) {
            return;
          }
          setLogoutDialog(false);
          await keycloak.logout();
          navigation.reset({
            index: 0,
            routes: [{name: 'AuthStack' as any}],
          });
          setLogoutDialog(false);
        }}
        positiveTitle={LogoutButton}
        visible={logoutDialog}
        setVisible={visible => {
          setLogoutDialog(visible);
        }}
      />
      <Alert
        visible={error.length > 0}
        setVisible={() => {
          setError('');
        }}
        onPressButton={() => {
          setError('');
        }}
        title={error}
      />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
});

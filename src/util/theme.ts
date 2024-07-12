import {PlatformOSType} from 'react-native';
import {configureFonts, DefaultTheme} from 'react-native-paper';
import {Fonts} from 'react-native-paper/lib/typescript/types';
import {dip} from './function';

const MainFamily = 'OpenSans';

const colors = {
  primary: '#134984',
  lightPrimary: '#CFF2E5',
  darkPrimary: '#206F52',
  secondary: '#162952',
  text: '#333333',
  lightText: '#FFFFFF',
  placeholder: '#677294',
  disabled: '#858EA9',
  background: '#F2F2F2',
  surface: '#FFFFFF',
  error: '#c9190b',
  divider: '#858EA9',
  screen: '#0C0B0A77',
  star: '#F6D060',
};

const colors2 = {
  primary: '#3F51B5',
  lightPrimary: '#C5CAE9',
  darkPrimary: '#303F9F',
  text: '#212121',
  lightText: '#FFFFFF',
  placeholder: '#677294',
  disabled: '#858EA9',
  background: '#F2F2F2',
  surface: '#FFFFFF',
  error: '#c9190b',
  divider: '#858EA9',
  screen: '#0C0B0A77',
  star: '#F6D060',
};

const colors3 = {
  primary: '#F44336',
  lightPrimary: '#FFCDD2',
  darkPrimary: '#D32F2F',
  text: '#212121',
  lightText: '#FFFFFF',
  placeholder: '#677294',
  disabled: '#858EA9',
  background: '#F2F2F2',
  surface: '#FFFFFF',
  error: '#c9190b',
  divider: '#858EA9',
  screen: '#0C0B0A77',
  star: '#F6D060',
};

const mainConfig: Fonts = {
  light: {
    fontFamily: MainFamily + '-Light',
    fontWeight: '200',
  },
  medium: {
    fontFamily: MainFamily + '-Medium',
    fontWeight: '600',
  },
  regular: {
    fontFamily: MainFamily + '-Regular',
    fontWeight: '400',
  },
  thin: {
    fontFamily: MainFamily + '-Light',
    fontWeight: '100',
  },
};

const fontConfig: {
  [platform in PlatformOSType | 'default']?: Fonts;
} = {
  android: mainConfig,
  ios: mainConfig,
  web: mainConfig,
  default: mainConfig,
};

export const theme = {
  ...DefaultTheme,
  roundness: dip(10),
  spacing: dip(15),
  buttonHeight: dip(54),
  paddingVertical: dip(30),
  paddingHorizontal: dip(40),
  fonts: configureFonts(fontConfig),
  colors: {
    ...DefaultTheme.colors,
    ...colors,
  },
};

export const theme2 = {
  ...DefaultTheme,
  roundness: dip(10),
  spacing: dip(15),
  buttonHeight: dip(54),
  paddingVertical: dip(30),
  paddingHorizontal: dip(40),
  fonts: configureFonts(fontConfig),
  colors: {
    ...DefaultTheme.colors,
    ...colors2,
  },
};

export const theme3 = {
  ...DefaultTheme,
  roundness: dip(10),
  spacing: dip(15),
  buttonHeight: dip(54),
  paddingVertical: dip(30),
  paddingHorizontal: dip(40),
  fonts: configureFonts(fontConfig),
  colors: {
    ...DefaultTheme.colors,
    ...colors3,
  },
};

export type ThemeOverride = typeof theme;

import { Platform, Dimensions, Text } from 'react-native';

const dimensions = Dimensions.get('window');

const primary = '#ED811D';
const primaryLight = 'rgba(27, 37, 77, 1)';
const primaryDark = 'rgba(14, 20, 43, 1)';
const primaryOpaque = opacity => `rgba(18, 25, 50, ${opacity})`;
const black = '#000000';

const primaryText = 'white';
const gray = '#dadada';
const facebook = '#364EA0';
const google = '#B51313';

const highlight = '#61dafb';

const colors = {
  primary,
  facebook,
  google,
  gray,
  black,
  highlight,
  primaryLight,
  primaryDark,
  primaryOpaque,
  primaryText,
};

const typography = {
  primary: Platform.select({
    ios: 'Avenir',
    android: 'Roboto',
  }),
  secondary: Platform.select({
    ios: 'Gotham Rounded',
    android: 'gothamrounded',
  }),
};

export { colors, typography, dimensions };

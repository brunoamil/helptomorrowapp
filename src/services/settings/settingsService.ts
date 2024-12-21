import {Appearance, ColorSchemeName, Platform, StatusBar} from 'react-native';

import {colors} from '@theme';

import {AppColorScheme, ThemePreference} from './settingsType';
import BootSplash from 'react-native-bootsplash';

function onChangeThemePreference(
  themePreference: ThemePreference,
): AppColorScheme {
  if (themePreference === 'system') {
    const colorScheme = Appearance.getColorScheme();
    return colorScheme ? colorScheme : 'light';
  }

  return themePreference;
}

function onSystemChange(
  color: ColorSchemeName,
  themePreference: ThemePreference,
): AppColorScheme | null {
  if (themePreference === 'system') {
    return color ? color : 'light';
  }

  return null;
}

function handleStatusBar(appColor: AppColorScheme) {
  StatusBar.setBarStyle(appColor === 'dark' ? 'light-content' : 'dark-content');

  if (Platform.OS === 'android') {
    StatusBar.setBackgroundColor(
      appColor === 'dark' ? colors.palette.grayBlack : colors.palette.grayWhite,
    );
  }
}

async function hideSplashScreen() {
  try {
    const isVisible = await BootSplash.isVisible();
    if(isVisible) {
      BootSplash.hide({fade: true});
    }
  }catch(error) {
    BootSplash.hide();
  }
}

export const settingsService = {
  onChangeThemePreference,
  onSystemChange,
  handleStatusBar,
  hideSplashScreen
};

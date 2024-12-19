import React from 'react';

import {useSettingsService, useThemePreference} from '@services';

import {RadioButtomSelector, Screen} from '@components';
import {AppScreenProps} from '@routes';

type ThemePreference = 'light' | 'dark' | 'system';

type Option = {
  label: string;
  description?: string;
  themePreference: ThemePreference;
};
const items: Option[] = [
  {
    label: 'Ativado',
    themePreference: 'dark',
  },
  {
    label: 'Desativado',
    themePreference: 'light',
  },
  {
    label: 'Padrão do Sistema',
    description:
      'A aparencia deve ser a mesma que voce configurou no seu dispositivo',
    themePreference: 'system',
  },
];
export function DarkModeScreen({}: AppScreenProps<'DarkModeScreen'>) {
  // const [selectedItem, setSelectedItem] = useState<Option>();
  const themePreference = useThemePreference();
  const {setThemePreference} = useSettingsService();
  const selectedItem = items.find(
    item => item.themePreference === themePreference,
  );

  function setSelectedItem(item: Option) {
    setThemePreference(item.themePreference);
  }
  return (
    <Screen canGoBack title="Modo Escuro">
      <RadioButtomSelector
        items={items}
        selectedItem={selectedItem}
        onSelect={setSelectedItem}
        valueKey="themePreference"
        descriptionKey="description"
        labelKey="label"
      />
    </Screen>
  );
}

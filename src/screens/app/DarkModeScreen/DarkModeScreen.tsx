import React from 'react';

import {RadioButtomSelector, Screen} from '@components';
import {AppScreenProps} from '@routes';

const items = [
  {
    label: 'Ativado',
    isSelected: false,
    onPress: () => {},
  },
  {
    label: 'Desativado',
    isSelected: true,
    onPress: () => {},
  },
  {
    label: 'Padrão do Sistema',
    isSelected: false,
    description:
      'A aparencia deve ser a mesma que voce configurou no seu dispositivo',
    onPress: () => {},
  },
];
export function DarkModeScreen({}: AppScreenProps<'DarkModeScreen'>) {
  return (
    <Screen canGoBack title="Modo Escuro">
      <RadioButtomSelector items={items} />
    </Screen>
  );
}

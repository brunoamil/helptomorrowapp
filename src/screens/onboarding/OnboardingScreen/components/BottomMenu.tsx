import React from 'react';

import {Box, Icon, PressableBox, Text} from '@components';

import {OnboardingPageProps} from './OnboardingPage';

type BottomMenuProps = Pick<OnboardingPageProps, 'onPressNext' | 'onPressSkip'> & {
  isLast: boolean
};
export function BottomMenu({onPressNext, onPressSkip, isLast}: BottomMenuProps) {
  const nextText = isLast ? 'Começar' : 'Próximo'
  return (
    <Box flexDirection="row" justifyContent="space-between">
      <PressableBox hitSlop={10} onPress={onPressSkip}>
        <Text color='gray2' semiBold>Pular</Text>
      </PressableBox>
      <PressableBox
        flexDirection="row"
        alignItems="center"
        onPress={onPressNext}>
        <Text mr="s4" bold>{nextText}</Text>
        <Icon name="arrowRight" color='carrotSecondary' />
      </PressableBox>
    </Box>
  );
}

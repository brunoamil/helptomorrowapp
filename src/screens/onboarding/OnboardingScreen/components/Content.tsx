import React from 'react';

import {Box, ProgressIndicator, Text} from '@components';

import {OnboardingPageItem} from '../onboardingData';

type ContentProps = Omit<OnboardingPageItem, 'image'>;
export function Content({title, subtitle, total, index}: ContentProps) {
  return (
    <Box>
      <ProgressIndicator total={total} currentIndex={index} mb="s24"/>
        <Text preset="headingLarge">
        {title.map((text, _index) => (
          <Text
            key={_index}
            preset="headingLarge"
            color={text.highlight ? 'carrotSecondary' : 'backgroundContrast'}>
            {text.text}
          </Text>
        ))}
      </Text>
      <Text preset="paragraphLarge" mt="s16">{subtitle}</Text>
    </Box>
  );
}

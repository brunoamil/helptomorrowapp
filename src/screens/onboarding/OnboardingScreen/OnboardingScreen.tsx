import React, {useRef, useState} from 'react';
import {FlatList, ListRenderItemInfo} from 'react-native';

import {Box} from '@components';
import {OnboardingScreenProps} from '@routes';

import {OnboardingPage} from './components/OnboardingPage';
import {OnboardingPageItem, onboardingPages} from './onboardingData';

export function OnboardingScreen({}: OnboardingScreenProps<'OnboardingScreen'>) {
  const [pageIndex, setPageIndex] = useState(0);
  const flatListRef = useRef<FlatList<OnboardingPageItem>>(null);

  function onPressNext() {
    const isLastPage = pageIndex === onboardingPages.length - 1;
    if (isLastPage) {
      onFinishOnboarding();
    } else {
      const nextIndex = pageIndex + 1;
      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
      setPageIndex(nextIndex);
    }
  }

  function onFinishOnboarding() {}
  function renderItem({item}: ListRenderItemInfo<OnboardingPageItem>) {
    return (
      <OnboardingPage
        pageItem={item}
        onPressNext={onPressNext}
        onPressSkip={onFinishOnboarding}
      />
    );
  }

  return (
    <Box flex={1} backgroundColor="background">
      <FlatList
        ref={flatListRef}
        renderItem={renderItem}
        data={onboardingPages}
        horizontal
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
      />
    </Box>
  );
}

import React from 'react';
import {KeyboardAvoidingView, Platform} from 'react-native';

import {useAppSafeArea, useAppTheme} from '@hooks';

import {Box, BoxProps} from '../Box/Box';

import {ScreenHeader, ScrollViewContainer, ViewContainer} from './components';

export interface ScreenProps extends BoxProps {
  children: React.ReactNode;
  HeaderComponent?: React.ReactNode;
  canGoBack?: boolean;
  scrollable?: boolean;
  title?: string;
  noPaddingHorizontal?: boolean;
}
export function Screen({
  children,
  HeaderComponent,
  canGoBack = false,
  scrollable = false,
  noPaddingHorizontal = false,
  title,
  style,
  ...boxProps
}: ScreenProps) {
  const {colors} = useAppTheme();
  const {top, bottom} = useAppSafeArea();

  const Container = scrollable ? ScrollViewContainer : ViewContainer;
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Container backgroundColor={colors.background}>
        <Box
          paddingHorizontal={noPaddingHorizontal ? undefined : 's24'}
          style={[{paddingTop: top, paddingBottom: bottom}, style]}
          {...boxProps}>
          <ScreenHeader
            paddingHorizontal={noPaddingHorizontal ? 's24' : undefined}
            HeaderComponent={HeaderComponent}
            canGoBack={canGoBack}
            title={title}
          />
          {children}
        </Box>
        <Box
          paddingHorizontal={noPaddingHorizontal ? undefined : 's24'}
          style={[{paddingTop: top, paddingBottom: bottom}, style]}
          {...boxProps}>
          <ScreenHeader
            paddingHorizontal={noPaddingHorizontal ? 's24' : undefined}
            HeaderComponent={HeaderComponent}
            canGoBack={canGoBack}
            title={title}
          />
          {children}
        </Box>
      </Container>
    </KeyboardAvoidingView>
  );
}

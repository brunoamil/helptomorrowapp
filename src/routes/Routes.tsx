import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {useAuthCredentials} from '@services';

import {ActivityIndicator, Box} from '@components';

import {AppStack} from './AppStack';
import {AuthStack} from './AuthStack';
import {OnboardingStack} from './OnboardingStack';
import { Stacks, useRouter } from '@hooks';

function LoadingScreen() {
  return (
    <Box
      flex={1}
      backgroundColor="background"
      justifyContent="center"
      alignItems="center">
      <ActivityIndicator size="large" color="primary" />
    </Box>
  );
}

const stacks: Record<Stacks, React.ReactElement> = {
  Loading: <LoadingScreen />,
  Auth: <AuthStack />,
  App: <AppStack />,
  Onboarding: <OnboardingStack />,
};
export function Router() {
  const stack = useRouter()

  const Stack = stacks[stack]
  return (
    <NavigationContainer>
     {Stack}
    </NavigationContainer>
  );
}

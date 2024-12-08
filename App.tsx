import React from 'react';

import {
  AuthCredentialsProvider,
  initializeStorage,
  MMVKStorage,
  ToastProvider,
} from '@services';
import {ThemeProvider} from '@shopify/restyle';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import Config from 'react-native-config';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {Box, Text, Toast} from '@components';

import {Router} from './src/routes/Routes';
import {theme} from './src/theme/theme';
initializeStorage(MMVKStorage);

const queryClient = new QueryClient();
function App(): React.JSX.Element {
  return (
    <AuthCredentialsProvider>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <ThemeProvider theme={theme}>
            <ToastProvider>
              <Box>
                <Text>{Config.API_URL}</Text>
              </Box>
              <Router />
              <Toast />
            </ToastProvider>
          </ThemeProvider>
        </SafeAreaProvider>
      </QueryClientProvider>
    </AuthCredentialsProvider>
  );
}

export default App;

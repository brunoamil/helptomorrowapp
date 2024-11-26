import React from 'react';
import {SafeAreaView} from 'react-native';
import {Text} from './src/components/Text/Text';
import {Button} from './src/components/Button/Button';
import {ThemeProvider} from '@shopify/restyle';
import {theme} from './src/theme/theme';
import {Box} from './src/components/Box/Box';

function App(): React.JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView>
        <Text preset="headingLarge" italic>
          HelpTomorrow
        </Text>
        <Box mb="s24">
          <Button title="Teste" />
        </Box>
        <Button title="Loading" loading />
      </SafeAreaView>
    </ThemeProvider>
  );
}

export default App;

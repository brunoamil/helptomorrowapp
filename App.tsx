import React from 'react';
import {SafeAreaView, View} from 'react-native';
import {Text} from './src/components/Text/Text';
import {Button} from './src/components/Button/Button';
import {ThemeProvider} from '@shopify/restyle';
import {theme} from './src/theme/theme';

function App(): React.JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView>
        <View style={{paddingHorizontal: 24}}>
          <Text preset="headingLarge" italic>
            HelpTomorrow
          </Text>
          <Button preset="primary" title="Primary" marginBottom="s12" />
          <Button
            preset="primary"
            title="Primary"
            marginBottom="s12"
            disabled
          />
          <Button preset="outline" title="Outline" marginBottom="s12" />
          <Button
            preset="outline"
            title="Outline"
            marginBottom="s12"
            disabled
          />

          <Button title="Loading" loading />
        </View>
      </SafeAreaView>
    </ThemeProvider>
  );
}

export default App;

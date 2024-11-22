import React from 'react';
import {SafeAreaView} from 'react-native';
import {Text} from './src/components/Text/Text';

function App(): React.JSX.Element {
  return (
    <SafeAreaView>
      <Text preset="headingLarge" italic>
        HelpTomorrow
      </Text>
      <Text preset="headingLarge" bold>
        HelpTomorrow
      </Text>

      <Text preset="paragraphMedium" semiBold>
        HelpTomorrow
      </Text>
    </SafeAreaView>
  );
}

export default App;

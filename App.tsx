import React from 'react';
import {SafeAreaView, View} from 'react-native';
import {ThemeProvider} from '@shopify/restyle';
import {theme} from './src/theme/theme';
import {Text} from './src/components/Text/Text';
import {Button} from './src/components/Button/Button';
import {TextInput} from './src/components/TextInput/TextInput';
import {Icon} from './src/components/Icon/Icon';

function App(): React.JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView>
        <View style={{paddingHorizontal: 24}}>
          <Text mb="s8" preset="headingLarge">
            Olá!
          </Text>
          <Text preset="paragraphLarge" mb="s40">
            Digite seu e-mail e senha para entrar
          </Text>
          <TextInput
            errorMessage="E-mail inválido"
            label="E-mail"
            placeholder="Digite seu e-mail"
            boxProps={{mb: 's20'}}
          />
          <TextInput
            RightComponent={<Icon name="eyeOn" color="gray2" />}
            label="Senha"
            placeholder="Digite sua senha"
            boxProps={{mb: 's10'}}
          />
          <Text mt="s10" color="primary" preset="paragraphSmall" bold>
            Esqueci minha senha
          </Text>
          <Button title="Entrar" mt="s48" />
          <Button title="Criar uma conta" mt="s10" preset="outline" />
        </View>
      </SafeAreaView>
    </ThemeProvider>
  );
}

export default App;

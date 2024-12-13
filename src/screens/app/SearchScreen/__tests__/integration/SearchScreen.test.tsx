import React from 'react';

import {authCredentialsStorage} from '@services';
import {mockUtils, server} from '@test';
import {fireEvent, renderScreen, screen} from 'test-utils';

import {AppStack} from '@routes';

jest.unmock('@react-navigation/native');
beforeAll(() => {
  jest.useFakeTimers();
  jest
    .spyOn(authCredentialsStorage, 'get')
    .mockResolvedValue(mockUtils.mateusAuthCredentials);
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
  jest.resetAllMocks();
  jest.useRealTimers();
});

describe('integration SearchScreen', () => {
  test('Search Flow', async () => {
    //1: acessando navigation para searchScreen
    renderScreen(<AppStack initialRouteName="SearchScreen" />);

    //2: identificando o campo de busca e digitando algo
    const inputText = screen.getByPlaceholderText(/digite sua busca/i);
    fireEvent.changeText(inputText, 'celotavares');
    // act(() => jest.runAllTimers());

    // //3: identificando os usuarios para MSW para mock
    // const user1 = await screen.getByDisplayValue(userMocked.user1?.username);
    // expect(user1).toBeTruthy();

    // const user2 = await screen.findByText(userMocked.user2.username);
    // expect(user2).toBeTruthy();

    // //4: selecionando o usuario/pressionando e navegando para o profile
    // fireEvent.press(user1);

    // //5: verifica se está na tela do usuario
    // const userFullName = await screen.findByText(userMocked.user1.full_name);
    // expect(userFullName).toBeTruthy();

    // //6: pressionar o botao de voltar  e volta para search screen
    // const backButton = screen.getByTestId('screen-back-button');
    // fireEvent.press(backButton);

    // //7:limpar o campo de busca de input

    // const inputTextAfterBack = screen.getByPlaceholderText(/digite sua busca/i);
    // fireEvent.changeText(inputTextAfterBack, '');
    // act(() => jest.runAllTimers());

    // //8: ter certeza que o hsitory de busca está ok
    // const searchHistoryTitle = screen.getByText(/histórico de busca/i);
    // expect(searchHistoryTitle).toBeTruthy();

    // //9: verificar se o usuario pressionaod esta salvo no history
    // const user1AfterBack = screen.queryByText(userMocked.user1?.username);
    // expect(user1AfterBack).toBeTruthy();

    // //10: o usuario 2 que nao foi pressionaod nao deve aparecer no historico de busca
    // const user2AfterBack = screen.queryByText(userMocked.user2.username);
    // expect(user2AfterBack).not.toBeFalsy();

    // //11: pressionar no icon de excluir e apagar do history
    // const trashIcon = screen.getByTestId('trash');
    // fireEvent.press(trashIcon);
    // //12: verificar se o usuario que foi pressionado no history foi apagado
    // const user1AfterRemove = screen.queryByText(userMocked.user1?.username);
    // expect(user1AfterRemove).toBeFalsy();
  });
});

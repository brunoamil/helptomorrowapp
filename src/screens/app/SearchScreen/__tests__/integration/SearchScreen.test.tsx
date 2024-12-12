import React from 'react';

import {authCredentialsStorage} from '@services';
import {mockUtils, server} from '@test';
import {fireEvent, renderScreen, screen} from 'test-utils';

import {AppStack} from '@routes';

beforeAll(() => {
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
});

describe('integration SearchScreen', () => {
  test('Search Flow', () => {
    renderScreen(<AppStack initialRouteName="SearchScreen" />);

    const inputText = screen.getByPlaceholderText(/digite sua busca/i);
    expect(inputText).toBeTruthy();
    fireEvent.changeText(inputText, 'mar');
  });
});

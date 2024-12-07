import React from 'react';

import {render, fireEvent} from 'test-utils';

import {Button} from '../Button';
describe('<Button />', () => {
  test('calls the onPress function when is pressed', () => {
    const mockedOnPress = jest.fn();
    const {getByText} = render(
      <Button title="Button HelP" onPress={mockedOnPress} />,
    );

    // const titleElement = getByText('Button Help', {exact: false});
    const titleElement = getByText(/Button Help/i);

    fireEvent.press(titleElement);
    expect(mockedOnPress).toHaveBeenCalled();
  });

  // test('shoul show loading indicator', () => {
  //   render(<Button title="Button" />);
  // });
});

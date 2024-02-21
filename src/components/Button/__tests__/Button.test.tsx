import React from 'react';

import {render} from 'test-utils';

import {Button} from '../Button';
describe('<Button />', () => {
  test('the component rendered', () => {
    render(<Button title="button title" />);
  });

  test('should shows loading indicator', () => {
    render(<Button title="button title" />);
  });
});

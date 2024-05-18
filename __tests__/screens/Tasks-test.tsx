import 'react-native';
import React from 'react';
import {describe, it} from '@jest/globals';

import {fireEvent, render} from '../../app/utils/test-utils';

import Tasks from '../../app/screens/Tasks';

describe('Tasks screen', () => {
  it('the screen exists', () => {
    let {getByTestId} = render(<Tasks />, {});
    getByTestId('Screen.Tasks');
  });

  it('screen has a input with placeholder', () => {
    let {getByPlaceholderText} = render(<Tasks />, {});
    // getByPlaceholderText('First Name');
    // getByPlaceholderText('Last Name');
    // getByPlaceholderText('Age');
  });
});

import 'react-native';
import React from 'react';
import {jest, describe, it, expect} from '@jest/globals';

import {render, fireEvent} from '../../app/utils/test-utils';

import ListItem from '../../app/components/ListItem';
import {Contact} from 'app/store/dummyNetwork';

const mockdata: Contact = {
  firstName: 'John',
  lastName: 'Smith',
  age: 30,
  photo: 'https://picsum.photos/200/300',
  id: '1',
};
const onPressMock = jest.fn();

describe('ListItem', () => {
  it('should render', () => {
    render(
      <ListItem isEdit={false} item={mockdata} onPress={onPressMock} />,
      {},
    );
  });
});

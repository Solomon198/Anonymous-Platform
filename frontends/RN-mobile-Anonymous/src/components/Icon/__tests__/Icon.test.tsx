/**
 * @format
 */

import 'react-native';
import React from 'react';
import Icon, {Props} from '..';
import {it, expect} from '@jest/globals';
import {customRender, screen} from '../../../../utils/test';

const defaultProps: Props = {
  name: 'twitter',
  type: 'AntDesign',
  testID: 'IconComponent',
};

const getComponent = (props: Props) => customRender(<Icon {...props} />);

it('renders correctly', () => {
  getComponent(defaultProps);
});

it('should display text content within it', () => {
  getComponent(defaultProps);
  const iconComponent = screen.getByTestId(defaultProps.testID as string);
  expect(iconComponent).toBeOnTheScreen();
});

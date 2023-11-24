/**
 * @format
 */

import 'react-native';
import React from 'react';
import Link, {Props} from '..';
import {it, expect, jest} from '@jest/globals';
import {customRender, fireEvent, screen} from '../../../../utils/test';

const mockOnPress = jest.fn();
const linkValue = 'link here!';
const defaultProps: Props = {
  onPress: mockOnPress,
};

const getComponent = (props: Props) =>
  customRender(<Link {...props}>{linkValue}</Link>);

it('renders correctly', () => {
  getComponent(defaultProps);
});

it('should be able to click on link', () => {
  getComponent(defaultProps);
  const linkComponent = screen.getByRole('link');
  fireEvent.press(linkComponent);

  expect(mockOnPress).toHaveBeenCalledTimes(1);
  expect(linkComponent).toBeOnTheScreen();
});

it('should be able get link value', () => {
  getComponent(defaultProps);
  const linkText = screen.getByRole('link', {name: linkValue});

  expect(linkText).toBeOnTheScreen();
});

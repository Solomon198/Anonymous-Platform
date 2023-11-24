/**
 * @format
 */

import 'react-native';
import React from 'react';
import Button, {Props} from '..';
import {it, jest, expect} from '@jest/globals';
import {customRender, fireEvent, screen} from '../../../../utils/test';

const mockOnPress = jest.fn();
const defaultProps: Props = {
  value: 'Click me!',
  iconName: 'twitter',
  iconTestID: 'icon',
  onPress: mockOnPress,
};

const getComponent = (props: Props) => customRender(<Button {...props} />);

it('renders Button  correctly', () => {
  getComponent(defaultProps);
});

it('Should be clickable', async () => {
  getComponent(defaultProps);
  const button = screen.getByRole('button');
  fireEvent.press(button);
  expect(mockOnPress).toBeCalledTimes(1);
});

it('Should not be clickable after disabled', async () => {
  getComponent({...defaultProps, disabled: true});
  const button = screen.getByRole('button');
  fireEvent.press(button);
  expect(mockOnPress).toBeCalledTimes(0);
});

it('Should be able to get button value', async () => {
  getComponent(defaultProps);
  const buttonValue = screen.getByRole('text', {name: defaultProps.value});
  expect(buttonValue).toBeOnTheScreen();
});

it('Should not be able to get icon when iconName is not set', async () => {
  getComponent({...defaultProps, iconName: ''});
  const buttonValue = screen.queryByTestId(defaultProps.iconTestID as string);
  expect(buttonValue).not.toBeOnTheScreen();
});

it('Should  be able to get icon when iconName is set', async () => {
  getComponent(defaultProps);
  const buttonValue = screen.queryByTestId(defaultProps.iconTestID as string);
  expect(buttonValue).toBeOnTheScreen();
});

it('Should  be able to get ActivityIndicator when isLoading is true', async () => {
  getComponent({...defaultProps, isLoading: true});
  const buttonValue = screen.getByLabelText('progressbar');
  expect(buttonValue).toBeOnTheScreen();
});

it('Should not  be able to get ActivityIndicator when isLoading is false', async () => {
  getComponent({...defaultProps});
  const buttonValue = screen.queryByLabelText('progressbar');
  expect(buttonValue).not.toBeOnTheScreen();
});

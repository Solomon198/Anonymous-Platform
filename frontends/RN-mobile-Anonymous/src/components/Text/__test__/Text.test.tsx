/**
 * @format
 */

import 'react-native';
import React from 'react';
import Text, {Props} from '..';
import {it, expect} from '@jest/globals';
import {customRender, screen} from '../../../../utils/test';

const textValue = 'text value';
const defaultProps: Props = {};

const getComponent = (props: Props) =>
  customRender(<Text {...props}>{textValue}</Text>);

it('renders correctly', () => {
  getComponent(defaultProps);
});

it('should display text content within it', () => {
  getComponent(defaultProps);
  const text = screen.getByRole('text', {name: textValue});
  expect(text).toBeOnTheScreen();
  expect(text).toHaveTextContent(textValue);
});

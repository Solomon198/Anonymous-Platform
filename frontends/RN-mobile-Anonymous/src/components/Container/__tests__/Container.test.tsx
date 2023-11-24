/**
 * @format
 */

import 'react-native';
import React from 'react';
import Container, {Props} from '..';
import {Text} from '../..';
import {it, expect} from '@jest/globals';
import {customRender, screen} from '../../../../utils/test';

const textValue = 'happy day';
const defaultProps: Props = {};

const getComponent = (props: Props) =>
  customRender(
    <Container {...props}>
      <Text>happy day</Text>
    </Container>,
  );

it('renders correctly', () => {
  getComponent(defaultProps);
});

it('should display other content within it', () => {
  getComponent(defaultProps);
  const text = screen.getByRole('text', {name: textValue});
  expect(text).toBeOnTheScreen();
  expect(text).toHaveTextContent(textValue);
});

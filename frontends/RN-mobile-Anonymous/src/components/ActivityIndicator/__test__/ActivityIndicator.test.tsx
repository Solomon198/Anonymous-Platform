/**
 * @format
 */

import 'react-native';
import React from 'react';
import ActivityIndicator, {Props} from '..';
import {it, expect} from '@jest/globals';
import {customRender, screen} from '../../../../utils/test';

const defaultProps: Props = {
  accessibilityLabel: 'progressbar',
};
const getComponent = (props: Props) =>
  customRender(<ActivityIndicator {...props} />);

it('renders Button  correctly', () => {
  getComponent(defaultProps);
});

it('Should be clickable', async () => {
  getComponent(defaultProps);
  const spinner = screen.getByLabelText('progressbar');
  expect(spinner).toBeOnTheScreen();
});

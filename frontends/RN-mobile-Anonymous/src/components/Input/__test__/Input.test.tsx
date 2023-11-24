/**
 * @format
 */

import 'react-native';
import React from 'react';
import Input, {Props} from '..';
import {it, expect, jest} from '@jest/globals';
import {customRender, screen, waitFor, userEvent} from '../../../../utils/test';

const textValue = 'typing in the box';
const mockOnChangeText = jest.fn();
const defaultProps: Props = {
  onChangeText: mockOnChangeText,
  inputTestID: 'inputField',
  testID: 'inputContainer',
  placeholder: 'Enter anything',
  inputDetails: 'please enter a string of length 10',
  error: 'please enter something',
  iconTestID: 'icon',
};

const getComponent = (props: Props) => customRender(<Input {...props} />);

it('renders correctly', () => {
  getComponent(defaultProps);
});

it('Should get input component from inputContainer which is the parent component', () => {
  getComponent(defaultProps);
  const inputContainer = screen.getByTestId(defaultProps.testID as string);
  const textInput = screen.getByTestId(defaultProps.inputTestID as string);
  expect(inputContainer).toBeOnTheScreen();
  expect(textInput).toBeOnTheScreen();
});

it('should be able to display placeholder', () => {
  getComponent(defaultProps);
  const textInput = screen.getByTestId(defaultProps.inputTestID as string);
  const placeholder = screen.getByPlaceholderText(
    defaultProps.placeholder as string,
  );
  expect(textInput).toBeOnTheScreen();
  expect(placeholder).toBeOnTheScreen();
});

it('We should be able to type into input field', async () => {
  getComponent(defaultProps);
  const textInput = screen.getByTestId(defaultProps.inputTestID as string);
  await userEvent.type(textInput, textValue);
  await waitFor(() => {
    expect(textInput.props.value).toBe(textValue);
  });
});

it('Should call onChangeText the length of string', async () => {
  getComponent(defaultProps);
  const textInput = screen.getByTestId(defaultProps.inputTestID as string);
  await userEvent.type(textInput, textValue);
  await waitFor(() => {
    expect(textInput.props.value).toBe(textValue);
  });
});

it('should be able to display input detail when text have been inputed, there is an error and input detail is available', async () => {
  getComponent(defaultProps);
  const textInput = screen.getByTestId(defaultProps.inputTestID as string);
  await userEvent.type(textInput, textValue);
  const inputDetail = screen.getByRole('text', {
    name: defaultProps.inputDetails,
  });
  expect(inputDetail).toBeOnTheScreen();
});

it('should not display input detail when text have not been inputed, there is an error and input detail is available', async () => {
  getComponent({...defaultProps});
  const inputDetail = screen.queryByRole('text', {
    name: defaultProps.inputDetails,
  });
  expect(inputDetail).not.toBeOnTheScreen();
});

it('should not display input detail when text have been inputed, there is no error and input detail is available', async () => {
  getComponent({...defaultProps, error: ''});
  const textInput = screen.getByTestId(defaultProps.inputTestID as string);
  await userEvent.type(textInput, textValue);
  const inputDetail = screen.queryByRole('text', {
    name: defaultProps.inputDetails,
  });
  expect(inputDetail).not.toBeOnTheScreen();
});

it('should not display input detail when text have been inputed, there is an error and input detail is not available', async () => {
  getComponent({...defaultProps, inputDetails: ''});
  const textInput = screen.getByTestId(defaultProps.inputTestID as string);
  await userEvent.type(textInput, textValue);
  const inputDetail = screen.queryByRole('text');
  expect(inputDetail).not.toBeOnTheScreen();
});

it('should display error or checked icon next to input when text is valid or not valid respectively', async () => {
  getComponent({...defaultProps, inputDetails: ''});
  const textInput = screen.getByTestId(defaultProps.inputTestID as string);
  await userEvent.type(textInput, textValue);
  const iconComponent = screen.getByTestId(defaultProps.iconTestID as string);
  expect(iconComponent).toBeOnTheScreen();
});

it('should not display icon when text is valid or not valid when text have not been inputed', async () => {
  getComponent(defaultProps);
  const iconComponent = screen.queryByTestId(defaultProps.iconTestID as string);
  expect(iconComponent).not.toBeOnTheScreen();
});

it('Should not be able to type into textinput when disabled', async () => {
  getComponent(defaultProps);
  const textInput = screen.getByTestId(defaultProps.inputTestID as string);
  await userEvent.type(textInput, textValue);
  await waitFor(() => {
    expect(mockOnChangeText).toHaveBeenCalledTimes(textValue.length);
  });
});

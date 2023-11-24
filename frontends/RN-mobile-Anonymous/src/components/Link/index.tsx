import React from 'react';
import {Text} from '..';
import {
  StyleProp,
  TextStyle,
  TouchableNativeFeedback,
  TouchableNativeFeedbackProps,
} from 'react-native';

export interface Props extends TouchableNativeFeedbackProps {
  style?: StyleProp<TextStyle>;
}

const Link = ({children, style, ...props}: Props) => {
  return (
    <TouchableNativeFeedback accessibilityRole="link" {...props}>
      <Text style={style}>{children}</Text>
    </TouchableNativeFeedback>
  );
};

export default Link;

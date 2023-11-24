import React from 'react';
import {Text as RNText, TextProps} from 'react-native';
import {useTheme} from '../../theme';

export interface Props extends TextProps {}

const Text = ({children, ...props}: Props) => {
  const {text} = useTheme();
  const {style, ..._props} = props;
  return (
    <RNText
      style={[{color: text.primary}, style]}
      accessibilityRole="text"
      {..._props}>
      {children}
    </RNText>
  );
};

export default Text;

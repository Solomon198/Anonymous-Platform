import React from 'react';
import {View as RNView, ViewProps} from 'react-native';
import {useTheme} from '../../theme';

export interface Props extends ViewProps {}

const Text = ({children, ...props}: Props) => {
  const {backgrounds} = useTheme();
  const {style, ..._props} = props;
  return (
    <RNView
      accessibilityRole="none"
      style={[{backgroundColor: backgrounds.appPrimary}, style]}
      {..._props}>
      {children}
    </RNView>
  );
};

export default Text;

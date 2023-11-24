import React from 'react';
import {
  ActivityIndicator as RNActivityIndicator,
  ActivityIndicatorProps,
} from 'react-native';

export interface Props extends ActivityIndicatorProps {}

const ActivityIndicator = (props: Props) => {
  return <RNActivityIndicator {...props} />;
};

export default ActivityIndicator;
